import Header from '@/components/layout/Header'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
