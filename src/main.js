// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import http from './http';
import store from './store/index';
import router from './router/index';
import Root from './Root.vue';

// 引入公共样式表
import 'normalize.css';
import 'animate.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入echarts主模块（基础模块）
import ECharts from 'vue-echarts/components/ECharts.vue'

// 引入需要的echarts如表
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

// 引入需要的 echarts的交互组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/toolbox';

import 'src/assets/styles/variable.scss';
import 'src/assets/styles/base.scss';
import 'src/assets/styles/common.scss';
import 'src/assets/styles/iconfont.css';

import multiCascader from 'multi-cascader-base-ele'
Vue.use(multiCascader)

Vue.use(ElementUI);

Vue.component('chart', ECharts);

Vue.config.productionTip = false;



/* eslint-disable no-new */

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = http;
// Vue.prototype.SERVER = 'http://localhost:8083';
// Vue.prototype.SERVER = 'http://49.232.61.82/aic/carserver';
Vue.prototype.SERVER = 'http://49.232.61.82/aic/carserver';

new Vue({
  el: '#app',
  store,
  router,
  template: '<Root/>',
  components: { Root }
});


const server = 'http://49.232.61.82/aic/carserver';
const baseUrl = 'http://49.232.61.82/aicmanservice/rest';
// const baseUrl = 'http://192.168.0.162:8081/rest';
export const showserver = 'http://49.232.61.82/aic/carserver';
// export const showserver = 'http://localhost:8083';
export {
  baseUrl
}
export default server
