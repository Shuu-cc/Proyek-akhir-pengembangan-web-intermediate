const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Tambahkan ini agar folder dist bersih sebelum build baru
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      // Anda mungkin juga perlu loader untuk CSS di sini jika tidak ada di prod.js
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html', // Tambahkan ini agar nama file outputnya index.html
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/'), // <--- UBAH DI SINI
          to: path.resolve(__dirname, 'dist/'),
          // Anda mungkin ingin menambahkan globOptions.ignore untuk file .gitkeep jika ada
          // globOptions: {
          //   ignore: ['**/node_modules/**', '**/.gitkeep'],
          // },
        },
      ],
    }),
  ],
};