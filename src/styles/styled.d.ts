import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title : string,

        colors: {
            primary: string,
            secondary: string,

            background: string,
            backgroundSecondary: string,
            answeredColor: string,
            text: string,
            textSecondary: string,
        }
    }
}
