'use strict';

// import utilities
const { join, resolve } = require('path');
const merge = require('webpack-merge');

// import webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// import sub-configs
const getBuildConfig = require('./webpack-build.config');
const getDevConfig = require('./webpack-dev.config');

// load package data
const PKG = require('../package.json');


const isProd = process.argv.indexOf('-p') !== -1;
const PATHS = {
  root: join(__dirname, '..'),
  app: join(__dirname, '..', 'app'),
  build: join(__dirname, '..', 'build'),
};


module.exports = (env) => {
  const common = {
    entry: PATHS.app,
    output: {
      path: PATHS.build,
      filename: '[name]-[hash].js',
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|ttf|otf|eot|woff|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash].[ext]',
            context: PATHS.app,
          },
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            root: PATHS.root,
            interpolate: true,
            minimize: false,
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    },
    plugins: [
      new FaviconsWebpackPlugin({
        logo: resolve(PATHS.app, 'assets/images/favicon.png'),
        prefix: 'favicons-[hash:hex:5]/',
        title: 'This europe rocks',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: true,
          yandex: false,
          windows: false,
        },
      }),
      new HtmlWebpackPlugin({
        filename: resolve(PATHS.build, 'index.html'),
        template: resolve(PATHS.app, './index.html'),
        inject: true,
        chunksSortMode: 'dependency',
      }),
      new WebpackNotifierPlugin({
        title: PKG.title,
        contentImage: join(__dirname, 'images', 'build-logo.png'),
        excludeWarnings: true,
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],

      alias: {
        Config: resolve(PATHS.app, 'config/'),
        Assets: resolve(PATHS.app, 'assets/'),
        Vendor: resolve(PATHS.app, 'js/vendor/'),
        Utils: resolve(PATHS.app, 'js/utils/'),
        Components: resolve(PATHS.app, 'js/components/'),
        Actions: resolve(PATHS.app, 'js/actions/'),
      },
    },
  };

  let config = common;

  if (isProd) {
    console.log('Environment: production');

    process.env.BABEL_ENV = 'STATIC';

    const buildConfig = getBuildConfig({
      paths: PATHS,
      pkg: PKG,
    });

    config = merge(config, buildConfig);
  } else {
    console.log('Environment: development');

    process.env.BABEL_ENV = 'HOT';

    const devConfig = getDevConfig({
      paths: PATHS,
      pkg: PKG,
    });

    config = merge(config, devConfig);
  }

  return config;
};
