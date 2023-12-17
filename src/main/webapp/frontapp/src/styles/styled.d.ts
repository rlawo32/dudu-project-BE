import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        reverseBgColor: string;
        textColor: string;
        borderColor: string;
        boxBgColor: string;
        inputBgColor: string;
        toggleColor: string;
        headerBgColor: string;
        headerTextColor: string;
    }
}