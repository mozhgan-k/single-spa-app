/* eslint-disable prettier/prettier */

import { h, createApp, App } from 'vue';
import qcreateApp from '../.quasar/app.js'
import singleSpaVue from 'single-spa-vue';
import { Quasar, quasarUserOptions } from 'quasar'

let routerInstance;
// eslint-disable-next-line no-void
void qcreateApp(createApp, quasarUserOptions).then(({ router }) => {
  routerInstance = router;
})

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App);
    },
  },
  handleInstance(app) {
    app.use(Quasar, quasarUserOptions);
    app.use(routerInstance);
  },
  // replaceMode: false
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
