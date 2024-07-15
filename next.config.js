/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
      ],
      exclude: [/app\/icon\.svg$/],
    });
    return config;
  },
  // images: {
  //   disableStaticImages: true, // importした画像の型定義設定を無効にする
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'images.microcms-assets.io',
  //       pathname: '/**',
  //     },
  //   ],
  // },
};

module.exports = nextConfig;
