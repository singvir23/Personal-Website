import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Viraaj&apos;s Website</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
