/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const nextTranslate = require('next-translate');

module.exports = withPWA(
  nextTranslate({
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
    },
    images: {
      domains: ['source.unsplash.com','images.unsplash.com'],
    },
  }),
);
