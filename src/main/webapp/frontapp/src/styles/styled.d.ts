import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        reverseBgColor: string;
        headerBgColor: string;
        headerTextColor: string;
        textColor: string;
        borderColor: string;
        toggleColor: string;
    }
}