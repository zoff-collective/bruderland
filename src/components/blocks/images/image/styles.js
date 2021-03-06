import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { colors, mq, fonts } from '../../../../tokens';

export default css`
  figure {
    display: table;
    margin: 0 auto;
    max-width: 780px;
    position: relative;
  }

  figure.is-fullscreen {
    max-height: 100vh;
    max-width: none;
    position: relative;
    width: 100%;
  }

  @media ${mq.tablet} {
    .is-fullscreen :global(figcaption) {
      bottom: 2.5rem;
      color: white;
      left: 2.5rem;
      max-width: 20rem;
      position: absolute;
      text-align: left;
      text-shadow: 0 2px 3px rgba(0, 0, 0, 0.75);
    }
  }

  .fullscreen-toggle {
    background: transparent;
    border: none;
    color: white;
    position: absolute;
    right: 1rem;
    top: 1.5rem;
  }

  .fullscreen-toggle:focus,
  .fullscreen-toggle:hover {
    color: ${colors.brand};
  }

  :global(.image-modal) {
    align-items: center;
    background-color: rgb(77, 77, 77);
    color: white;
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 101;
  }
`;

export const expandIcon = css.resolve`
  svg {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6));
    height: 1.5rem;
    width: 1.5rem;
  }

  @media ${mq.tablet} {
    svg {
      height: 1.75rem;
      width: 1.75rem;
    }
  }
`;

export const imageStyle = css.resolve`
  img {
    max-height: 75vh;
    max-width: 100%;
    width: auto;
  }
`;

export const imageFullScreenStyle = css.resolve`
  img {
    height: auto;
    max-height: none;
    width: 100%;
  }
`;

export const imageExpanendStyle = css.resolve`
  img {
    height: auto;
    object-fit: contain;
    padding: 1.5rem;
    max-height: 100vh;
    width: 100%;
  }
`;

export const transcription = css.resolve`
  div {
    display: flex;
    color: ${colors.grey};
    font-family: ${fonts.superla.family};
    font-size: 0.9rem;
    font-weight: ${fonts.superla.weight.regular};
    justify-content: center;
    line-height: 1.33;
    margin-top: 0;
    width: 100%;
  }

  @media ${mq.tablet} {
    div {
      font-size: 1rem;
    }
  }
`;
