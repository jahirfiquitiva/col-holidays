/* eslint-disable @typescript-eslint/no-var-requires */
// const withPWA = require('next-pwa');
const nextTranslate = require('next-translate');

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(
  nextTranslate({
    reactStrictMode: true,
    images: {
      domains: ['source.unsplash.com', 'images.unsplash.com'],
    },
  }),
);
