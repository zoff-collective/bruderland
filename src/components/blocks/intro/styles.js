import css from 'styled-jsx/css';

import { colors, fonts } from '../../../tokens';

export default css`
  .quote-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-bottom: 8rem;
    min-height: 100vh;
  }

  .logo {
    background-color: ${colors.brand};
  }

  .logo,
  .quote {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    justify-content: center;
    padding: 0 5rem;
    width: 50%;
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
