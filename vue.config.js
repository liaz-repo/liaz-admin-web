const { defineConfig } = require('@vue/cli-service')
var webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '管理后台'
        return args
      })
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }),
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/': {
        ws: false,
        target: process.env.VUE_APP_API_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
  },
})