import Header from '@/components/layout/Header'
import Wrapper from '@/components/layout/Wrapper'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Wrapper>
          <Header />
          <Component {...pageProps} />
          <ToastContainer theme='colored' />
        </Wrapper>
      </Provider>
    </SessionProvider>
  )
}

export default App
