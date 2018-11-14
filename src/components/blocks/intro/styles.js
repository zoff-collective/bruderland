import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import tinycolor from 'tinycolor2';

import { colors, fonts, mq } from '../../../tokens';

export default css`
  .quote-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin-bottom: 8rem;
    overflow: hidden;
    position: relative;
  }

  @media ${mq.tablet} {
    .quote-container {
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }

  .logo {
    background-color: ${colors.brand};
    color: white;
  }

  @media ${mq.tablet} {
    .logo {
      background-color: ${tinycolor(colors.brand).setAlpha(0.85)};
    }
  }

  .image {
    height: 100%;
    left: 50%;
    min-width: 100%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .logo,
  .quote {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    height: 50vh;
    justify-content: center;
    padding: 0 20%;
    width: 100%;
    z-index: 2;
  }

  @media ${mq.tablet} {
    .logo,
    .quote {
      height: 100%;
      padding-left: 5rem;
      padding-right: 5rem;
      width: 50%;
    }
  }

  blockquote {
    color: ${colors.brand};
    font-family: ${fonts.lapture.family};
    font-size: 2.18rem;
    font-style: italic;
    font-weight: ${fonts.lapture.weight.bold};
    line-height: 1.1;
    margin: 0;
    text-align: center;
  }

  @media ${mq.tablet} {
    blockquote {
      font-size: 2.875rem;
    }
  }

  .lower-intro {
    display: flex;
    justify-content: center;
  }

  .title {
    color: ${colors.brand};
    font-family: ${fonts.superla.family};
    font-size: 3.125rem;
    font-weight: ${fonts.superla.weight.extraBold};
    margin-bottom: 0;
    margin-top: 0;
    text-align: center;
  }

  @media ${mq.tablet} {
    .title {
      font-size: 4.75rem;
    }
  }

  .text {
    font-family: ${fonts.superla.family};
    font-size: 1.25rem;
    font-weight: ${fonts.superla.weight.regular};
    margin-bottom: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
    max-width: 520px;
    text-align: center;
  }
`;

export const logoIcon = css.resolve`
  svg {
    width: 28rem;
  }
`;

export const nextLink = css.resolve`
  a {
    color: currentColor;
    text-decoration: none;
  }

  a:hover,
  a:focus {
    text-decoration: underline;
  }
`;
