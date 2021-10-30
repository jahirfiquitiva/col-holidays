import Head from 'next/head';

import { Component, ComponentProps } from '@/components/global/component';

interface MetaProps extends ComponentProps {
  title?: string;
  description?: string;
}

export const Meta: Component<MetaProps> = (props) => {
  const {
    title = 'Colombian Holidays | Festivos en Colombia | Feriados en Colombia',
    // eslint-disable-next-line max-len
    description = 'Get to know the upcoming colombian holidays. Conoce los próximos festivos o feriados en Colombia',
  } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name={'title'} content={title} />
      <meta name={'description'} content={description} />

      <meta property={'og:type'} content={'website'} />
      <meta property={'og:url'} content={'https://col-holidays.co/'} />
      <meta property={'og:title'} content={title} />
      <meta property={'og:description'} content={description} />
      <meta
        property={'og:image'}
        content={'https://col-holidays.co/static/banner.png'}
      />

      <meta property={'twitter:card'} content={'summary_large_image'} />
      <meta property={'twitter:url'} content={'https://col-holidays.co/'} />
      <meta property={'twitter:title'} content={title} />
      <meta property={'twitter:description'} content={description} />
      <meta
        property={'twitter:image'}
        content={'https://col-holidays.co/static/banner.png'}
      />

      <link
        rel={'apple-touch-icon'}
        sizes={'57x57'}
        href={'/static/favicon/apple-icon-57x57.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'60x60'}
        href={'/static/favicon/apple-icon-60x60.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'72x72'}
        href={'/static/favicon/apple-icon-72x72.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'76x76'}
        href={'/static/favicon/apple-icon-76x76.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'114x114'}
        href={'/static/favicon/apple-icon-114x114.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'120x120'}
        href={'/static/favicon/apple-icon-120x120.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'144x144'}
        href={'/static/favicon/apple-icon-144x144.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'152x152'}
        href={'/static/favicon/apple-icon-152x152.png'}
      />
      <link
        rel={'apple-touch-icon'}
        sizes={'180x180'}
        href={'/static/favicon/apple-icon-180x180.png'}
      />
      <link
        rel={'icon'}
        type={'image/png'}
        sizes={'192x192'}
        href={'/static/favicon/android-icon-192x192.png'}
      />
      <link
        rel={'icon'}
        type={'image/png'}
        sizes={'32x32'}
        href={'/static/favicon/favicon-32x32.png'}
      />
      <link
        rel={'icon'}
        type={'image/png'}
        sizes={'96x96'}
        href={'/static/favicon/favicon-96x96.png'}
      />
      <link
        rel={'icon'}
        type={'image/png'}
        sizes={'16x16'}
        href={'/static/favicon/favicon-16x16.png'}
      />
      <link rel={'manifest'} href={'/manifest.json'} />
      <meta name={'msapplication-TileColor'} content={'#000000'} />
      <meta name={'msapplication-TileImage'} content={'/ms-icon-144x144.png'} />
      <meta name={'theme-color'} content={'#000000'}></meta>
    </Head>
  );
};
