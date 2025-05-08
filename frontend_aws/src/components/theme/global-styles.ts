import { createGlobalStyle, css } from "styled-components";

const cssReset = css`
  body {
    text-rendering: optimizeSpeed;
  }

  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  button {
    font: inherit;
    color: inherit;
  }
`;

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
   padding: 0;
   margin: 0;
   box-sizing: border-box;
  }
  
  ${cssReset};
`;
