/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';
import HPSWeather from 'src/pages/HPSWeather/HPSWeatherMain'
import HPSWeather2 from 'src/pages/HPSWeather/HPSWeatherMain2'
import SWeatherCarMain from 'src/pages/SWeatherCar/SWeatherCarMain'

// 不作为main组件子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
}

// 系统选择页面
export const systemSelectRouter = {
  path: '/sysMain',
  name: 'sysMain',
  meta: {
    title: '四维智联创新应用展示中心'
  },
  component: () => import('src/pages/systemSelect/sysMain')
}
// 错误页面
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};

// 作为main组件子页面展示  但不在左侧菜单显示的路由卸载otherRoter里
export const otherRouter = {
  path: '',
  name: 'otherRouter',
  meta: {
    requireAuth: true,
    title: '四维智联创新应用展示中心'
  },
  component: () => import('src/pages/systemSelect/sysMain')
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/claims',
    name: 'claims',
    title: '理赔查勘平台(商业化)',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'claimsUtil',
        name: 'claimsUtil',
        title: '查勘工具',
        component: () => import('src/pages/showSystem/claims/claimsUtil')
      },
      {
        path: 'queryHistory',
        name: 'queryHistory',
        title: '查询历史',
        component: () => import('src/pages/showSystem/claims/queryHistory')
      }
    ]
  },
  {
    path: '/disasters',
    name: 'disasters',
    title: '特定车辆灾害预警',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'distribution',
        name: 'distribution',
        title: '查勘工具',
        component: () => import('src/pages/showSystem/disasters/distribution')
      },
      {
        path: 'list',
        name: 'list',
        title: '查询历史',
        component: () => import('src/pages/showSystem/disasters/list')
      }
    ]
  },
  {
    path: '/weather',
    name: 'weather',
    title: '天气图层',
    meta: {
      requireAuth: true,
      title: '气象数据源基础数据可视化系统'
    },
    component: Layout,
    children: [
      {
        path: 'twoHoursOnline',
        name: 'twoHoursOnline',
        title: '2小时实时天气',
        component: () => import('src/pages/showSystem/weather/twoHoursOnline')
      }
    ]
  },
  {
    path: '/scwRealtimeView',
    name: 'scw',
    title: '强对流',
    meta: {
      requireAuth: false,
      title: '实时强对流数据可视化'
    },
    component: () => import('src/pages/showSystem/scwRealtimeView/index')
  },
  {
    path: '/scwHisView',
    name: 'scw',
    title: '强对流',
    meta: {
      requireAuth: false,
      title: '历史强对流数据可视化'
    },
    component: () => import('src/pages/showSystem/scwHisView/index')
  },
  {
    path: '/n72f',
    name: 'n72f',
    title: '72小时预报',
    meta: {
      requireAuth: false,
      title: '站点72小时数据可视化'
    },
    component: () => import('src/pages/showSystem/n72f/index')
  },
  {
    path: '/tplf',
    name: 'tplf',
    title: '台风路径预测',
    meta: {
      requireAuth: false,
      title: '台风数据可视化'
    },
    component: () => import('src/pages/showSystem/tplf/index')
  },
  {
    path: '/grb2RealtimeView',
    name: 'grb2RealtimeView',
    title: 'GRB2天气数据',
    meta: {
      requireAuth: false,
      title: 'GRB2实时全量数据可视化'
    },
    component: () => import('src/pages/showSystem/grb2RealtimeView/index')
  },
  {
    path: '/grb2HisView',
    name: 'grb2HisView',
    title: 'GRB2天气数据',
    meta: {
      requireAuth: false,
      title: 'GRB2实历史索引数据可视化'
    },
    component: () => import('src/pages/showSystem/grb2HisView/index')
  },
  {
    path: '/ncRealtimeView',
    name: 'ncRealtimeView',
    title: 'NC实时全量数据可视化',
    meta: {
      requireAuth: false,
      title: 'NC实时全量数据可视化'
    },
    component: () => import('src/pages/showSystem/ncRealtimeView/index')
  },
  {
    path: '/ncHisView',
    name: 'ncHisView',
    title: 'NC历史索引数据可视化',
    meta: {
      requireAuth: false,
      title: 'NC历史索引数据可视化'
    },
    component: () => import('src/pages/showSystem/ncHisView/index')
  },
  {
    path: '/showMain',
    name: 'showMain',
    title: 'GRB2天气数据',
    meta: {
      requireAuth: false,
      title: '气象数据源基础数据可视化系统'
    },
    component: () => import('src/pages/showSystem/showMain')
  }
];

export const HPSWeatherAppRouter = [
  {
    path: '/HPSWeatherMain',
    name: 'HPSWeatherMain',
    meta: {
      requireAuth: false,
      title: '高精短时极端天气预警系统'
    },
    component: () => import('src/pages/HPSWeather/HPSWeatherMain')
  },
  {
    path: '/HPSAdverseMain',
    name: 'HPSAdverseMain',
    meta: {
      requireAuth: false,
      title: '高精短时恶劣天气预警系统'
    },
    component: () => import('src/pages/HPSWeather/HPSAdverseMain')
  }
  // {
  //   path: '/HPSWeatherMain2',
  //   name: 'HPSWeatherMain2',
  //   meta: {
  //     requireAuth: false,
  //     title: '台风利奇马极端天气'
  //   },
  //   component: () => import('src/pages/HPSWeather/HPSWeatherMain2')
  // }
];

export const SWeatherAppRouter = [
  {
    path: '/SWeatherCarMain',
    name: 'SWeatherCarMain',
    title: '短时天气影响车辆',
    meta: {
      requireAuth: false,
      title: '极端天气车辆预警系统'
    },
    component: () => import('src/pages/SWeatherCar/SWeatherCarMain')
  }
];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  systemSelectRouter,
  ...HPSWeatherAppRouter,
  ...SWeatherAppRouter,
  ...appRouter
];
