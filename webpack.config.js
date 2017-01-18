module.exports = {
  entry: './public/chatRoom/components/chatRoom.react.js',
  output: {
    filename: 'bundle.js',
    path: './public/script/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
