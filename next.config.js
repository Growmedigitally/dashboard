/** @type {import('next').NextConfig} */
const path = require('path');
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  scope: '/',
  runtimeCaching,
})
if (process.env.NODE_ENV === 'development') {
  module.exports = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'app/styles')],
    },
    typescript: {
      //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
      ignoreBuildErrors: false,
    },
    images: {
      disableStaticImages: true
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });

      return config;
    },
    reactStrictMode: true
  }
} else {
  module.exports = withPWA({
    // config
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    typescript: {
      //true == Dangerously allow production builds to successfully complete even if  your project has type errors.
      ignoreBuildErrors: false,
    },
    images: {
      disableStaticImages: true
    },
    // experimental: {
    //   appDir: true,
    // },
    // webpack(config) {
    //   config.module.rules.push({
    //     test: /\.svg$/,
    //     use: ["@svgr/webpack"]
    //   });

    //   return config;
    // },
    reactStrictMode: true
  })
}