import Head from 'next/head';

import { Component } from '@/components/global/component';
import { Layout } from '@/components/global/layout';
import { Home } from '@/components/home';

const Index: Component = () => {
  return (
    <>
      <Head>
        <title>Colombian Holidays</title>
        <meta name={'description'} content={'App to show upcoming colombian holidays'} />
      </Head>

      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default Index;
