// import webpack plugins
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// postcss
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nested = require('postcss-nested');
const postcssimport = require('postcss-easy-import');


module.exports = (options) => {
  const banner = `${options.pkg.name} - ${options.pkg.version}\nMade with love by ${options.pkg.author}`;

  const config = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?importLoaders=1',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: 'inline',
                  plugins: () => [postcssimport, nested, autoprefixer, cssnano],
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([
        options.paths.build,
      ], {
        root: options.paths.root,
      }),

      // setting NODE_ENV to production reduces React library size
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          // drop `console` statements
          drop_console: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
      new webpack.BannerPlugin({
        banner,
        raw: false,
        entryOnly: true,
      }),

      new ExtractTextPlugin('css/[name]-[chunkhash].css'),
    ],
  };

  return config;
};
