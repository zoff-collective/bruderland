import css from 'styled-jsx/css';

export default css`
  :global(body) {
    margin: 0;
    padding: 0;
  }

  :global(*),
  :global(*::before),
  :global(*::after) {
    box-sizing: border-box;
  }

  @font-face {
    font-display: swap;
    font-family: 'Lapture';
    font-style: italic;
    font-weight: 700;
    src: url('/static/lapture/lapture-bold-italic.woff2') format('woff2'),
      url('/static/lapture/lapture-bold-italic.woff') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Superla';
    font-style: normal;
    font-weight: 400;
    src: url('/static/superla/superla-book.woff2') format('woff2'),
      url('/static/superla/superla-book.woff') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Superla';
    font-style: normal;
    font-weight: 900;
    src: url('/static/superla/superla-extra-bold.woff2') format('woff2'),
      url('/static/superla/superla-extra-bold.woff') format('woff');
  }
`;