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
    margin: 1.5rem 0;
    width: 100%;
  }

  @media ${mq.tablet} {
    figure:not(.is-fullsize) {
      margin-left: auto;
      margin-right: auto;
      width: 750px;
    }
  }

  .container {
    width: 800px;
  }

  footer {
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    width: 100%;
  }

  @media ${mq.tablet} {
    footer {
      margin-top: 1.5rem;
      padding-right: 0.5rem;
    }
  }

  @media ${mq.tablet} {
    .is-fullsize footer {
      padding-right: 2.5rem;
    }
  }

  .control-button-container {
    align-items: center;
    color: black;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    margin-bottom: 1rem;
    margin-left: -1rem;
    margin-right: 0.5rem;
  }

  @media ${mq.tablet} {
    .control-button-container {
      margin-bottom: 0;
      margin-left: auto;
      margin-right: 1.5rem;
      order: 2;
    }
  }

  @media ${mq.tablet} {
    .is-fullsize .control-button-container {
      color: white;
      transform: translateY(-9rem);
    }
  }

  @media ${mq.desktop} {
    .is-fullsize .control-button-container {
      transform: translateY(-11rem);
    }
  }

  @media ${mq.wide} {
    .is-fullsize .control-button-container {
      transform: translateY(-13rem);
    }
  }

  .control-button {
    background: transparent;
    border: none;
    border-radius: 50%;
    color: currentColor;
    display: flex;
    flex: 0 0 auto;
    height: 3.5rem;
    line-height: 1;
    outline: none;
    padding: 0;
    position: relative;
    width: 3.5rem;
  }

  @media ${mq.tablet} {
    .control-button {
      height: 5rem;
      width: 5rem;
    }
  }

  @media ${mq.desktop} {
    .control-button {
      height: 6rem;
      width: 6rem;
    }
  }

  .control-button:hover,
  .control-button:focus {
    color: ${colors.brand};
    cursor: pointer;
  }

  .current-time {
    font-family: ${fonts.superla.family};
    font-size: 0.8rem;
    font-weight: ${fonts.superla.weight.regular};
    margin-bottom: 0;
    margin-left: 0.5rem;
    margin-top: 0;
    min-width: 4.5rem;
    white-space: nowrap;
  }

  @media ${mq.tablet} {
    .current-time {
      font-size: 1rem;
    }
  }

  video {
    width: 100%;
  }

  video::-webkit-media-text-track-display,
  video::cue {
    font-family: ${fonts.superla.family};
    font-size: 1.15rem;
    font-weight: ${fonts.superla.weight.regular};
    line-height: 1.2;
  }

  @media ${mq.tablet} {
    video::-webkit-media-text-track-display,
    video::cue {
      font-size: 1.25rem;
    }
  }

  @media ${mq.desktop} {
    video::-webkit-media-text-track-display,
    video::cue {
      font-size: 1.45rem;
    }
  }

  .is-fullsize video::-webkit-media-text-track-display,
  .is-fullsize video::cue {
    font-size: 1.25rem;
  }

  @media ${mq.tablet} {
    .is-fullsize video::-webkit-media-text-track-display,
    .is-fullsize video::cue {
      font-size: 1.75rem;
    }
  }
`;

export const playPauseIconStyles = css.resolve`
  svg {
    height: 1rem;
    left: 50%;
    margin-left: 0.05rem;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1rem;
  }

  @media ${mq.tablet} {
    svg {
      height: 1.25rem;
      width: 1.25rem;
    }
  }

  @media ${mq.tablet} {
    svg {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
`;

export const playPauseDropShadow = css.resolve`
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6));
`;

export const progressIcon = css.resolve`
  svg {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6));
  }
`;
