const crypto = require('crypto');
const fsExtra = require('fs-extra');
const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

const { fetchVimeoVideo } = require('./src/lib/vimeo');

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type VimeoVideo implements Node @infer {
      sources: [VimeoVideoSource]!
      tracks: [VimeoVideoTrack]!
      pictures: [VimeoVideoPoster]!
    }

    type VimeoVideoSource @infer {
      link: String!
      type: String!
      width: Int
    }

    type VimeoVideoTrack @infer {
      publicPath: String
      name: String
      language: String
      file: File!
    }

    type VimeoVideoPoster @infer {
      width: Int!
      link: String!
    }
  `);
};

exports.onCreateNode = ({ node }) => {
  /* for some reason the repeater field returns false, if there wasn't any footnote.
     To avoid a Schema conflict (array/boolean) always use an empty array */
  if (
    node.internal.type === 'WordPressAcf_text' &&
    node.footnotesRepeat === false
  ) {
    // eslint-disable-next-line no-param-reassign
    node.footnotesRepeat = [];
  }
};

exports.createPages = ({
  actions,
  graphql,
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  const { createPage, createNode } = actions;

  return (
    graphql(`
      {
        episodes: allWordpressWpEpisodes(
          filter: { acf: { published: { ne: false } } }
        ) {
          edges {
            node {
              wordpress_id
              slug
              title
              acf {
                quote
                number
                text
                language
                content_episodes {
                  ... on WordPressAcf_vimeoVideo {
                    __typename
                    wordpress_id
                  }
                }
              }
            }
          }
        }

        protagonists: allWordpressWpProtagonists(
          filter: { status: { eq: "publish" } }
        ) {
          edges {
            node {
              slug
              wordpress_id
              acf {
                language
              }
            }
          }
        }

        background: allWordpressWpBackground(
          filter: { status: { eq: "publish" } }
        ) {
          edges {
            node {
              slug
              wordpress_id
              acf {
                language
              }
            }
          }
        }
      }
    `)
      // filter out published nodes
      .then(
        ({
          errors,
          data: {
            episodes: { edges: episodes },
            protagonists: { edges: protagonists },
            background: { edges: background },
          },
        }) => {
          if (errors) {
            return Promise.reject(errors);
          }

          return {
            episodes,
            protagonists,
            background,
          };
        }
      )
      // fetch vimeo data
      .then(({ episodes, protagonists, background }) => {
        const videos = [];

        episodes.forEach(({ node: { acf } }) => {
          const { content_episodes: contentEpisodes } = acf;

          contentEpisodes
            .filter(
              ({ __typename: typeName }) =>
                typeName === 'WordPressAcf_vimeoVideo'
            )
            .map(({ wordpress_id: videoID }) =>
              videos.push(fetchVimeoVideo(videoID))
            );
        });

        return Promise.all(videos)
          .then((videoData) => {
            const createTrackNodes = (node, video) => {
              const nodes = [];

              if (
                video &&
                video.tracks &&
                video.tracks.data &&
                video.tracks.data.length > 0
              ) {
                video.tracks.data.forEach((track, index) => {
                  const id = `${node.id}-track-${index}`;
                  const { name, language, link } = track;

                  const trackNode = createNode({
                    name,
                    language,

                    id,
                    parent: null,
                    children: [],
                    internal: {
                      type: `VimeoVideoTrack`,
                      contentDigest: crypto
                        .createHash(`md5`)
                        .update(JSON.stringify(video))
                        .digest(`hex`),
                    },
                  });

                  const trackFileNode = createRemoteFileNode({
                    url: link,
                    store,
                    cache,
                    createNode,
                    createNodeId,
                    parentNodeId: node.id,
                    auth: {},
                  });

                  const completeNode = Promise.all([
                    trackNode,
                    trackFileNode,
                  ]).then((resolvedNodes) => {
                    const createdNode = getNode(id);
                    const fileNode = resolvedNodes[1];

                    const { name: trackFileName } = fileNode;

                    createdNode.file = fileNode;
                    createdNode.publicPath = path.join(
                      '/',
                      'static',
                      'subtitles',
                      `${trackFileName}.vtt`
                    );

                    return createdNode;
                  });

                  nodes.push(completeNode);
                });
              }

              return Promise.all(nodes);
            };

            const createVideoNode = (data) => {
              const nodes = [];
              const cached = [];

              data.filter(Boolean).forEach((video) => {
                const { id } = video;

                if (cached.includes(id)) {
                  return;
                }

                const node = createNode({
                  id,
                  sources: video.video.files
                    ? video.video.files.map((file) => {
                        const { link, type, width } = file;

                        return { link, type, width };
                      })
                    : [],
                  pictures: video.video.pictures
                    ? video.video.pictures.sizes.map(({ width, link }) => ({
                        width,
                        link,
                      }))
                    : [],
                  parent: null,
                  children: [],
                  internal: {
                    type: `VimeoVideo`,
                    contentDigest: crypto
                      .createHash(`md5`)
                      .update(JSON.stringify(video))
                      .digest(`hex`),
                  },
                }).then(() => {
                  const createdNode = getNode(id);

                  return createTrackNodes(createdNode, video).then((tracks) => {
                    createdNode.tracks = tracks;

                    tracks.forEach((track) => {
                      const { absolutePath } = track.file;
                      const { publicPath } = track;
                      const fullPublicPath = path.join(
                        process.cwd(),
                        'public',
                        publicPath
                      );

                      if (!fsExtra.existsSync(fullPublicPath)) {
                        fsExtra.copy(absolutePath, fullPublicPath, (err) => {
                          if (err) {
                            // eslint-disable-next-line no-console
                            console.error(
                              `Error copying file from ${absolutePath} to ${fullPublicPath}`,
                              err
                            );
                          }
                        });
                      }
                    });

                    return createdNode;
                  });
                });

                nodes.push(node);
                cached.push(id);
              });

              return nodes;
            };

            return Promise.all([...createVideoNode(videoData)]).then(
              () => videoData
            );
          })
          .then(() => ({
            protagonists,
            episodes,
            background,
          }));
      })
      // create pages
      .then(({ episodes, protagonists, background }) => {
        protagonists.forEach(({ node }) => {
          const { slug, wordpress_id: wordpressId, acf } = node;
          let normalizedSlug = slug;
          const languageSlug =
            !acf?.language || acf.language === 'de' ? '' : `/${acf.language}`;

          if (normalizedSlug.endsWith('-2')) {
            normalizedSlug = normalizedSlug.replace(/-2$/g, '');
          }

          const pagePath = `${languageSlug}/protagonists/${normalizedSlug}/`;

          // eslint-disable-next-line no-console
          console.log('create page', pagePath);

          const context = {
            wordpressId,
            language: acf?.language ?? 'de',
          };

          createPage({
            path: pagePath,
            component: path.resolve('src/templates/protagonist.jsx'),
            context,
          });
        });

        episodes.forEach(({ node }) => {
          const { slug, acf, wordpress_id: wordpressId } = node;
          const number = parseInt(acf.number, 10);
          const languageSlug =
            !acf?.language || acf.language === 'de' ? '' : `/${acf.language}`;
          let pagePath = `${languageSlug}/episodes/${slug}/`;

          if (number === 0 && (acf.language === 'de' || !acf.language)) {
            pagePath = '/';
          } else if (number === 0 && acf.language !== 'de') {
            pagePath = `/${acf.language}/`;
          }

          const context = {
            wordpressId,
            language: acf?.language ?? 'de',
          };

          // eslint-disable-next-line no-console
          console.log('create page', pagePath);

          createPage({
            path: pagePath,
            component: path.resolve('src/templates/episode.jsx'),
            context,
          });
        });

        background.forEach(
          ({ node: { slug, wordpress_id: wordpressId, acf } }) => {
            const languageSlug =
              !acf?.language || acf.language === 'de' ? '' : `/${acf.language}`;
            const pagePath = `${languageSlug}/background/${slug}/`;

            // eslint-disable-next-line no-console
            console.log('create background', pagePath);

            const context = {
              wordpressId,
              language: acf?.language ?? 'de',
            };

            createPage({
              path: pagePath,
              component: path.resolve('src/templates/background.jsx'),
              context,
            });
          }
        );

        ['de', 'en'].forEach((language) => {
          const localeEpisodes = episodes.filter((episode) => {
            if (language === 'de' && !episode?.node?.acf?.language) {
              return true;
            }

            return episode?.node?.acf?.language === language;
          });

          createPage({
            path: `${language === 'de' ? '' : `/${language}`}/navigation/`,
            component: path.resolve('src/templates/navigation.jsx'),
            context: {
              episodes: localeEpisodes,
              language,
            },
          });

          createPage({
            path: `${language === 'de' ? '' : `/${language}`}/background/`,
            component: path.resolve('src/templates/backgroundOverview.jsx'),
            context: {
              language: language ?? 'de',
            },
          });

          createPage({
            path: `${language === 'de' ? '' : `/${language}`}/protagonists/`,
            component: path.resolve('src/templates/protagonistsOverview.jsx'),
            context: {
              language: language ?? 'de',
            },
          });
        });
      })
  );
};
