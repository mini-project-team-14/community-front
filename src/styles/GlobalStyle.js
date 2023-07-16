import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: "NotoSansKR", sans-serif;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }

    /* button, input, select, textarea {
        color: inherit;
        font-family: inherit;
        font-size: 100%;
        font-weight: inherit;
        line-height: inherit;
        margin: 0;
        padding: 0;
    } */

    p {
        padding: 0;
        margin: 0;
    }
`

export default GlobalStyle;