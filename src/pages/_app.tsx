import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'src/theme'
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { GlobalProvider } from 'src/contexts/GlobalContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return <ChakraProvider theme={theme}>
    <GlobalProvider>
      {getLayout(<Component {...pageProps} />)}
    </GlobalProvider>
  </ChakraProvider>
}
