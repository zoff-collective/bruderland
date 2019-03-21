import { Helmet } from 'react-helmet';
import React from 'react';
import { graphql } from 'gatsby';

import Navigation from '../components/navigation';
import withLayout from '../components/with-layout';

const Page = ({
  data: {
    protagonist: { title }
  }
}) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <Navigation items={[]} topic={title} />
  </>
);

export default withLayout(Page);

export const query = graphql`
  query($slug: String) {
    protagonist: wordpressWpProtagonists(slug: { eq: $slug }) {
      slug
      title
    }
  }
`;
