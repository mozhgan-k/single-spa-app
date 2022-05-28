/* eslint-disable prettier/prettier */
/* eslint-env node */
// const ESLintPlugin = require("eslint-webpack-plugin");
const { configure } = require("quasar/wrappers");
const { LocalStorage } = require("quasar");
const path = require("path");
const cors = require("cors");
// const SystemJSPublicPathWebpackPlugin = require('systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin')
// function resolve (...dirs) {
//   return path.join(__dirname, ...dirs)
// }
module.exports = configure(function (ctx) {
  return {
    // https://quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/boot-files
    boot: ["i18n", "axios", "webpack-cfg"],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      "mdi-v5",
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!
      "material-icons",
      "bootstrap-icons",
    ],

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: "hash", // available values: 'hash', 'history'
      // transpile: false,
      // publicPath: '/static/panel-web',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],
      // chainWebpack (chain) {
      //   chain.entry('app').add(resolve('src', 'single-spa-entry.js')) // This is the magic to make quasar work with single-spa
      // },
      extendWebpackWebserver(cfg) {
        // cfg.plugins.push(new SystemJSPublicPathWebpackPlugin({ systemjsModuleName: name }));
        cfg.output = {
          library: `${name}-[name]`,
          libraryTarget: "system",
          jsonpFunction: `webpackJsonp_${name}`,
          filename: "spa/js/app.js",
        };
        cfg.devServer.headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        };
      },
      rtl: true,
      preloadChunks: true,
      // showProgress: false,
      gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      // chainWebpack(chain) {
      //   chain
      //     .plugin("eslint-webpack-plugin")
      //     .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
      // },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: false, // opens browser window automatically
      // disableHostCheck: true,
      // before(app) {
      //   app.use(cors());
      // },
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
    hosting: {
      headers: [
        {
          source: "/service-worker.js",
          headers: [{ key: "Cache-Control", value: "no-cache" }],
        },
      ],
    },
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {
        dark: "auto",
      },
      lang: "fa-IR",
      // iconSet: 'material-icons', // Quasar icon set

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["LocalStorage", "Cookies", "Notify"],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: true,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      extendWebpackWebserver(cfg) {
        cfg.output = {
          library: `${name}-[name]`,
          libraryTarget: "system",
          jsonpFunction: `webpackJsonp_${name}`,
          filename: "js/app.js",
        };
        cfg.devServer.headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        };
      },

      middlewares: [
        ctx.prod ? "compression" : "",
        "render", // keep this as last one
      ],
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      // chainWebpackCustomSW(chain) {
      //   chain
      //     .plugin("eslint-webpack-plugin")
      //     .use(ESLintPlugin, [{ extensions: ["js"] }]);
      // },

      manifest: {
        short_name: "Admin Panel",
        name: "Admin Panel",
        start_url: "/manage",
        gcm_sender_id: "154119484171",
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "new-adminpanel",
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      // chainWebpackMain(chain) {
      //   chain
      //     .plugin("eslint-webpack-plugin")
      //     .use(ESLintPlugin, [{ extensions: ["js"] }]);
      // },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      // chainWebpackPreload(chain) {
      //   chain
      //     .plugin("eslint-webpack-plugin")
      //     .use(ESLintPlugin, [{ extensions: ["js"] }]);
      // },
    },
  };
});