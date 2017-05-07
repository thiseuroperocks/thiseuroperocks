// postcss
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nested = require('postcss-nested');
const postcssimport = require('postcss-easy-import');


module.exports = (options) => {
  const config = {
    devServer: {
      contentBase: options.paths.build,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy to customize
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 9999,

      compress: true,

      // unlike the cli flag, this doesn't set HotModuleReplacementPlugin (setted below)
      historyApiFallback: true,
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?importLoaders=1',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline',
                plugins: () => [postcssimport, nested, autoprefixer, cssnano],
              },
            },
          ],
        },
      ],
    },
  };

  return config;
};
