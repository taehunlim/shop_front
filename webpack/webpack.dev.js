require('dotenv').config({ path: './env/dev.env' });

const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const common = require('./webpack.common');

const { BUILD_PATH } = require('./commonPath');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      hot: true,
      open: true,
      compress: true,
      port: 4000,
      historyApiFallback: true,
      liveReload: true,
      proxy: {
         '/api/*': {
            target: 'http://localhost:8080',
            pathRewrite: { '^/api': '' },
            secure: true,
            changeOrigin: true,
            logLevel: 'debug',
         },
      },
   },
   output: {
      filename: 'js/[name].[fullhash].bundle.js',
      chunkFilename: 'js/[name].[fullhash].chunk.js', // dynamic import
      publicPath: '/',
      path: BUILD_PATH,
   },
   module: {
      rules: [
         {
            test: /\.(sa|sc|c)ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
      ],
   },
   plugins: [new ForkTsCheckerWebpackPlugin()],
});
