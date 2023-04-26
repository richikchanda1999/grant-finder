import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                color: 'white'
            }
        },
        Button: {
            variants: {
                gradient: {
                    bg: 'linear-gradient(93.18deg, #9946FF 1.28%, #C65DC6 100%)',
                    boxShadow: '0px 1px 4px rgba(12, 12, 13, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: '900',
                    height: '60px',
                    px: 6
                }
            },
            defaultProps: {
                variant: 'gradient'
            },
        }
    }
})

export default theme