import { extendTheme } from "@chakra-ui/react";


export const newTheme = extendTheme({
    colors: {
        primary: {
            100: "#edf2f4",
            200: "#8d99ae",
            300: "#2b2d42",
        },
        secondary: {
            100: '#ef233c',
            200: '#d90429'
        },
        action: '#fca311'
    },
});