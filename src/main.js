import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

const BaseDialog = defineAsyncComponent(() => import('./components/BaseDialog.vue'));
const BaseSpinner = defineAsyncComponent(() => import('./components/BaseSpinner.vue'));

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);

app.mount('#app');
