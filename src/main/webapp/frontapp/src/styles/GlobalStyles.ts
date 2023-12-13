import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.bgColor};
        color: ${({ theme }) => theme.textColor};
        display: block;
        height: 100%;
        width: 100%;
    }
`;