const HtmlWebpackPlugin = require('html-webpack-plugin');
const PwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Specify the template path
        title: 'Just Another Text Editor', // Set title for the HTML
      }),
      new InjectManifest({
        swSrc: './src/src-sw.js', // Path to your custom service worker
        swDest: 'src-sw.js',
      }),
      new PwaManifest({
        fingerprints: false, // Disable fingerprinting
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'An application for taking notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination for icons
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Loaders for styles
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude node_modules
          use: {
            loader: 'babel-loader', // Use Babel for transpilation
            options: {
              presets: ['@babel/preset-env'], // Presets for ES6+
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', // Enable object rest/spread
                '@babel/transform-runtime', // Optimize code
              ],
            },
          },
        },
      ],
    },
  };
};
