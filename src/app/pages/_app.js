// pages/_app.js
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Viraaj Singh</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
