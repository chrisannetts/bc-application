const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')

const pages = glob.sync('**/*.pug', {
  cwd: path.resolve(__dirname, 'src/pages')
})

const pagePlugins = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${page}`,
    filename: page.replace('.pug', '.html')
  })
})

const filePlugins = new CopyPlugin([
  { from: './src/assets/images/', to: './assets/images/' },
  { from: './src/robots.txt', to: './robots.txt' }
])

const statsConfig = {
  children: false,
  chunks: false,
  assets: false,
  builtAt: false,
  hash: false,
  entrypoints: false,
  modules: false,
  version: false,
  warnings: false,
}

const config = {
  stats: statsConfig,
  entry: {
    app: './src/assets/scripts/main.js',
    css: './src/assets/styles/main.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    historyApiFallback: {
      rewrites: [
        {
          from: /^(?!.*\.(js|css|png|jpg|svg|webp)|$).*$/,
          to: context => {
            let { pathname } = context.parsedUrl
            if (pathname.charAt(pathname.length - 1) === '/') {
              pathname = pathname.substring(0, pathname.length - 1)
            }
            return `${pathname}.html`
          }
        }
      ]
    },
    stats: statsConfig,
  },
  plugins: [].concat(pagePlugins, filePlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['html-loader?attrs=false', 'pug-html-loader']
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/assets/scripts'),
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/assets/styles'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/styles/[name].css',
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader?-url' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
}

module.exports = config
