import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <body className='bg-[#fefefe] dark:bg-[#04202B]'>
        <Main />
        <NextScript />
        <script src='https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js' async></script>
      </body>
    </Html>
  )
}
