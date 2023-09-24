import "styled-components";
import themes from "../assets/styles";

declare module "styled-components" {
    type ThemeType = typeof themes;
    export interface DefaultTheme extends ThemeType { }
}