import css from 'styled-jsx/css';
// eslint-disable-next-line no-unused-vars
import React from 'react';

import { colors, fonts, mq } from '../../../tokens';

export default css`
  figure {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }

  .container {
    width: 800px;
  }

  figcaption {
    font-family: ${fonts.superla.family};
    font-size: 1rem;
  }

  @media ${mq.tablet} {
    figcaption {
      font-size: 1.15rem;
    }
  }

  footer {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    width: 100%;
  }

  .control-button {
    align-self: flex-end;
    background: transparent;
    border: none;
    border-radius: 50%;
    display: flex;
    flex: 0 0 auto;
    height: 6rem;
    line-height: 1;
    margin-left: auto;
    padding: 0;
    position: relative;
    width: 6rem;
  }

  .control-button:hover,
  .control-button:focus {
    color: ${colors.brand};
    cursor: pointer;
  }

  video {
    width: 100%;
  }
`;

export const playPauseIconStyles = css.resolve`
  svg {
    height: 1.5rem;
    left: 50%;
    margin-left: 0.05rem;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.5rem;
  }
`;
