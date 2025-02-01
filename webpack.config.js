const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = __dirname;

module.exports = {
  entry: path.join(appDirectory, 'index.web.js'),
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.join(appDirectory, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules\/(?!(react-native-vector-icons|react-native)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: ['react-native-web'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: ['url-loader'],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.web.js', '.js'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons': 'react-native-vector-icons/dist',
      'react-native-svg': 'react-native-svg-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appDirectory, 'web/index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(appDirectory, 'dist'),
    },
    compress: true,
    port: 3000,
  },
};
