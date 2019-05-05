import classnames from 'classnames';
import { graphql } from 'gatsby';
import React, { Component } from 'react';

import Caption from '../../caption';
import { formatDuration, formatCurrentTime } from '../../../lib/time';
import PauseIcon from '../../../static/pause.svg';
import PlayIcon from '../../../static/play.svg';
import Progress from '../../progress';

import styles, { playPauseIconStyles } from './styles';

let observer;

export default class Video extends Component {
  state = {
    isPlaying: false,
    progressPercentage: 0,
    currentTime: ''
  };

  video = React.createRef();

  playButton = React.createRef();

  componentDidMount = () => {
    const { autoplay } = this.props;
    const { current: video } = this.video;

    if (autoplay) {
      this.observeIfInScreen(video);
    }
  };

  pause = el => {
    this.setState({ isPlaying: false });
    el.pause();
  };

  play = el => {
    el.play();

    // check if really is really playing (in case autoplay was blocked)
    setTimeout(() => {
      if (el.currentTime > 0 && el.paused === false && el.ended === false) {
        this.setState({ isPlaying: true });
      }
    }, 500);
  };

  stop = el => {
    this.setState({ isPlaying: false });

    el.pause();
    // eslint-disable-next-line no-param-reassign
    el.currentTime = 0;
  };

  observeIfInScreen = el => {
    if (!el) {
      return;
    }

    if ('IntersectionObserver' in window) {
      const onChange = entries => {
        entries.forEach(entry => {
          const { target, intersectionRatio } = entry;

          if (intersectionRatio > 0) {
            this.play(target);
          } else {
            this.stop(target);
          }
        });
      };

      observer = new IntersectionObserver(onChange);

      observer.observe(el);
    }
  };

  togglePlayAndPause = () => {
    const { current: video } = this.video;

    if (video.paused || video.ended) {
      this.play(video);
    } else {
      this.pause(video);
    }
  };

  updateProgress = () => {
    const { loop } = this.props;

    if (loop === true) {
      return undefined;
    }

    const { current: video } = this.video;
    const { currentTime, duration } = video;
    const percentage = Math.floor((100 / duration) * currentTime);
    const currentTimeFormatted = formatCurrentTime(duration - currentTime);

    this.setState({
      progressPercentage: percentage,
      currentTime: currentTimeFormatted
    });

    return undefined;
  };

  setVideoLength = () => {
    const { loop } = this.props;

    if (loop === true) {
      return undefined;
    }

    const { current: video } = this.video;
    const { duration } = video;

    this.setState({ currentTime: formatDuration(duration) });

    return undefined;
  };

  render() {
    const {
      vimeo,
      wordpress_id: id,
      caption,
      fullsize,
      loop = false
    } = this.props;
    const { isPlaying, progressPercentage, currentTime } = this.state;
    const vimeoVideo = vimeo && vimeo.find(({ id: vimeoId }) => vimeoId === id);

    if (!vimeoVideo || !vimeoVideo.video.files) {
      return null;
    }

    const { pictures, files: sources } = vimeoVideo.video;
    const { tracks } = vimeoVideo;
    const poster = pictures.sizes.find(image => image.width >= 1280);

    return (
      <figure className={classnames({ 'is-fullsize': fullsize })}>
        <style jsx>{styles}</style>
        {playPauseIconStyles.styles}

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={this.video}
          onEnded={() => this.stop(this.video.current)}
          onLoadedMetadata={() => this.setVideoLength()}
          onTimeUpdate={() => this.updateProgress()}
          onClick={() => this.togglePlayAndPause()}
          loop={loop}
          preload="metadata"
          poster={poster && poster.link}
          playsInline
          crossOrigin="anonymous"
        >
          {/* This happens whenever a video ID of a different user was supplied */}
          {sources &&
            sources.map(({ link, type, width }) => (
              <source
                key={link}
                src={link}
                type={type}
                media={`all and (max-width: ${width}px)`}
              />
            ))}

          {tracks &&
            tracks.data.length > 0 &&
            tracks.data.map(({ name, link, language }, index) => (
              <track
                key={link}
                label={name}
                kind="subtitles"
                srcLang={language}
                src={link}
                default={index === 0}
              />
            ))}
        </video>

        <footer>
          {caption && <Caption caption={caption} />}

          <div className="control-button-container">
            <button
              type="button"
              className="control-button"
              onClick={event => {
                event.preventDefault();
                this.togglePlayAndPause();
              }}
            >
              <Progress
                ref={this.playButton}
                strokeWidth="7"
                percentage={progressPercentage}
                sqSize="100"
              />

              {isPlaying ? (
                <PauseIcon className={playPauseIconStyles.className} />
              ) : (
                <PlayIcon className={playPauseIconStyles.className} />
              )}
            </button>

            {loop === false && <p className="current-time">{currentTime}</p>}
          </div>
        </footer>
      </figure>
    );
  }
}

export const fragment = graphql`
  fragment videoVimeo on WordPressAcf_vimeoVideo {
    wordpress_id
    caption
    fullsize
    loop
    autoplay
  }
`;
