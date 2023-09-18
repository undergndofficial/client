import React from 'react';
import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import theme from './theme';

const baseStyle = css`
  ${emotionNormalize}
  :root {
    --color-background: black;
    --color-font: white;
    --color-textgrey: #a7a7a7;
    --color-startyellow: #bdff00;
  }
  html {
    @media ${theme.device.phone} {
      font-size: 13px;
    }
    @media ${theme.device.tablet} {
      font-size: 14px;
    }
    @media ${theme.device.laptop} {
      font-size: 15px;
    }
    @media ${theme.device.laptopL} {
      font-size: 16px;
    }
    @media ${theme.device.desktop} {
      font-size: 17px;
    }
  }
  body {
    margin: 0;
    height: 100%;
    overflow: auto;
    background-color: var(--color-background);
  }
  textarea,
  input:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
