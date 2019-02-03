const pkg = require('./package')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/ress/dist/ress.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    // Doc: https://bootstrap-vue.js.org/docs/
    //'bootstrap-vue/nuxt'

    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    // your settings here
    sass: '~/assets/scss/variable.scss' // alternative: scss
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/assets/',
    extractCSS: true,

    // https://github.com/nuxt/nuxt.js/issues/2260#issuecomment-367114722
    // https://www.hypertextcandy.com/nuxt-ie11-polyfill
    // vendor: ['babel-polyfill'],
    // babel: {
    //   presets: [
    //       ['@nuxt/app', {
    //           // useBuiltIns: true,
    //           targets: { ie: 11 }
    //           }
    //       ]
    //   ]
    // },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // console.log(process.env.NODE_ENV);　output: development
        config.module.rules.push({
          // enforce: 'pre',
          test: /\.js$/,
          loader: 'babel-loader',
          // include: /src/, ←　src/ 以降全ての .js が解析される
          // exclude: /node_modules/, ← src/node_modules/ が除外される（上の行込みでの挙動）

          //（ buildDir の設定が一つ前のパスからになっているため functions/ も解析される。そのため src/から指定する ）
          include: /src\/node_modules\/normalize-url\//,
          exclude: /node_modules\/@firebase\//,
          options: {
            presets: ['@babel/preset-env'],
          }
        })

      }
    }
  }
}
