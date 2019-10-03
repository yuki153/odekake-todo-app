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
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
      { hid: 'og:image', property: 'og:image', content: '/odekake-ogp.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/ress/dist/ress.min.css' },
      { rel: 'apple-touch-icon', href: '/apple-icon-180x180.png' },
      { rel: "apple-touch-startup-image", href: "iPhoneX.png", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" },
      { rel: "apple-touch-startup-image", href: "/iPhone6s.png", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" },
      { rel: "apple-touch-startup-image", href: "/iPhone6splus.png", media: "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" },
      { rel: "apple-touch-startup-image", href: "/iPhoneSE.png", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" }
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
    ['@nuxtjs/pwa', { icon: false }]
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

  manifest: {
    name: "odekake",
    short_name: "odekake todo",
    title: "odekake todo",
    'og:title': 'odekake todo',
    description: 'お出かけのスケジュールは「odekake todo」で立てよう！TODO 形式で予定を作成する事ができます。',
    'og:description': 'お出かけのスケジュールは「odekake todo」で立てよう！TODO 形式で予定を作成する事ができます。',
    // 'og:image': '/odekake-ogp.png', not work
    lang: 'ja',
    theme_color: "#fc471e",
    background_color: "#fff",
    display: "standalone",
    scope: "/",
    start_url: "/sign-in#pwa",
    // https://nuxtjs.org/guide/assets/#static
    // ~/static/*.png -> /*.png
    icons: [{
      src: "/icon-192x192.png",
      sizes: "192x192",
      type: "image/png"
    }, {
      src: '/icon-512x512.png',
      sizes: "512x512",
      type: "image/png"
    }],
  },

  workbox: {
    // dev: true,
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
