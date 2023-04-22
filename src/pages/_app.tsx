import Header from '@/components/layout/Header'
import Wrapper from '@/components/layout/Wrapper'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}

export default App
