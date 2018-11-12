import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import tinycolor from 'tinycolor2';

import { colors, fonts } from '../../../tokens';

export default css`
  .quote-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-bottom: 8rem;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .logo {
    background-color: ${tinycolor(colors.brand).setAlpha(0.85)};
    color: white;
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
    justify-content: center;
    padding: 0 5rem;
    width: 50%;
    z-index: 2;
  }

  blockquote {
    color: ${colors.brand};
    font-family: ${fonts.lapture.family};
    font-size: 2.875rem;
    font-style: italic;
    font-weight: ${fonts.lapture.weight.bold};
    line-height: 1.1;
    margin: 0;
    text-align: center;
  }

  .title {
    color: ${colors.brand};
    font-family: ${fonts.superla.family};
    font-size: 4.75rem;
    font-weight: ${fonts.superla.weight.extraBold};
    margin-bottom: 0;
    margin-top: 0;
    text-align: center;
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
