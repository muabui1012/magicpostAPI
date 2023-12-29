import { default as React } from 'react';

import Head from 'next/head';

export const MetaTag = () => {

  return (
    <Head>
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta property="og:image:alt" content="Home" />
      <meta property="og:image:type" content="image/png,image/jpeg,image/gif" />
      <link rel="shortcut icon" href="/images/v1/favicon.png" />
    </Head>
  );
};