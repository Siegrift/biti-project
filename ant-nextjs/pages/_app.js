import Head from 'next/head'
import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta httpEquiv='Content-Security-Policy' content="require-trusted-types-for 'script'; trusted-types bless-the-sun default" />
        {/* TODO: FOR PRODUCTION: This should be removed when building prod */}
        <script src="./register-default-policy-for-dev.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
