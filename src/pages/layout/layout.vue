
<template>
  <div class="layout">
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}">
      <!--<div class="logo-wrapper">-->
        <!--&lt;!&ndash;<el-image&ndash;&gt;-->
        <!--&lt;!&ndash;style="width: 100%; height: 48px"&ndash;&gt;-->
        <!--&lt;!&ndash;src="../../../static/bg.png"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;</el-image>&ndash;&gt;-->
      <!--</div>-->
      <el-menu
        background-color="#424f63"
        text-color="#fff"
        active-text-color="#65cea7"
        class="menu-wrapper"
        router
        unique-opened
        :collapse="isCollapsed"
        :default-active="$route.path">
        <template v-for="(item, index) in sider_menu_data">
          <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                          :key="sub_index">
              <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="topbar-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="menu-collapse-wrapper float-left" @click="toggleMenu">
        <i class="el-icon-adm-menu" :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
      </div>
      <div class="title float-left">  <el-image
        style="width: 100%; height: 64px"
        src="static/bg.png"
      ></el-image></div>
      <ul class="menu-list float-right">
        <li v-if="user" class="menu-item" style="padding: 0;">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand"
            style="padding: 0 15px;">
            <div class="dropdown-content el-dropdown-link">
              <i class="icon el-icon-adm-usersetup"></i>
              <span class="text">{{user.name}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{user.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!--<li class="menu-item">-->
        <!--<i class="icon el-icon-adm-help"></i>-->
        <!--</li>-->
        <li class="menu-item" @click="exit">
          <i class="icon iconfont el-icon-adm-exit"></i>
        </li>
      </ul>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import {sessionStorage} from 'src/assets/js/storage';
  import ElImage from 'element-ui/packages/image/src/main';

  export default {
    components: {ElImage},
    created() {
      this.checkAuth();
    },
    data() {
      return {
        sider_menu_data: [
          {
            path: '/home',
            title: '首页',
            icon: 'el-icon-adm-home'
          },
          // {
          //   path: '/tables',
          //   title: '表格管理',
          //   icon: 'el-icon-adm-linechart',
          //   children: [
          //     {path: '/tables/basic', title: '基本表格'},
          //     {path: '/tables/sort', title: '排序表格'},
          //     {path: '/tables/filter', title: '筛选表格'}
          //   ]
          // },
          // {
          //   path: '/charts',
          //   title: '图表管理',
          //   icon: 'el-icon-adm-statistics',
          //   children: [
          //     {path: '/charts/bar', title: '柱状图'},
          //     {path: '/charts/line', title: '折线图'},
          //     {path: '/charts/pie', title: '饼图'}
          //   ]
          // },
          // {
          //   path: '/form',
          //   title: '表单管理',
          //   icon: 'el-icon-adm-form',
          //   children: [
          //     {path: '/form/render', title: '渲染表单'}
          //   ]
          // },
          // {
          //   path: '/system/index',
          //   title: '系统管理',
          //   icon: 'el-icon-adm-project'
          // },
          {
            path: '/claims',
            title: '理赔查勘平台(商业化)',
            icon: 'el-icon-adm-linechart',
            children: [
              {path: '/claims/claimsUtil', title: '查勘工具'},
              {path: '/claims/queryHistory', title: '查询历史'}
            ]
          },
          {
            path: '/disasters',
            title: '特定车辆灾害预警',
            icon: 'el-icon-adm-linechart',
            children: [
              {path: '/disasters/distribution', title: '受灾车辆分布'},
              {path: '/disasters/list', title: '受灾车辆列表'}
            ]
          },
          {
            path: '/weather',
            title: '天气图层',
            icon: 'el-icon-adm-linechart',
            children: [
              {path: '/weather/twoHoursOnline', title: '两小时实时天气预测'},
              {path: '/weather/twoHours1', title: '两小时历史天气预测1'}
            ]
          },
          {
            path: '/scw',
            title: '强对流天气',
            icon: 'el-icon-adm-linechart'
          },
          {
            path: '/n72f',
            title: '72小时预报',
            icon: 'el-icon-adm-linechart'
          },
          {
            path: '/tplf',
            title: '台风路径预测',
            icon: 'el-icon-adm-linechart'
          },
          {
            path: '/grb2',
            title: 'GRB2天气数据',
            icon: 'el-icon-adm-linechart'
          }
          // {
          //   path: '/weather',
          //   title: '天气图层1',
          //   icon: 'el-icon-adm-linechart',
          //   children: [
          //     {path: '/weather/twoHours1', title: '两小时历史天气预测1'}
          //   ]
          // }
        ],
        isCollapsed: false,
        adminMenuShow: false
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
      if (this.$store.state.menuCode === -1) {
        this.sider_menu_data = this.nomal_menu_data;
      }
    },
    methods: {
      checkAuth() {
        let token = this.$store.state.token || sessionStorage.getItem('token');
        if (!token) {
          // this.$router.replace('/sysMain');
        }
      },
      handleCommand(command) {
        // console.log(command);
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
             this.axios.get(`/aicLogin/aicLoginExit?userId=${this.$store.state.user.userId}`).then(res=>{
                this.$store.commit('SET_TOKEN', '');
                this.$store.commit('SET_USER', null);
                this.$store.commit('SET_MENUCODE', null);
                this.$router.replace({path: '/login'});
             })
            
          })
          .catch(() => {
            return false;
          })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/variable';

  .siderbar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $siderbarWidth;
    z-index: 11;
    background-color: $siderbarBackgroundColor;
    transition: all 0.3s ease-in-out;

    .logo-wrapper {
      height: 40px;
      line-height: 40px;
      text-align: center;
      /*background-image: url('../../../static/bg.png');*/
    }

    .menu-wrapper {
      position: absolute;
      top: 72px;
      bottom: 0;
      width: 100%;
      border-right: none;
      transition: all 0.3s ease-in-out;

      &:not(.el-menu--collapse) {
        overflow-y: auto;
        overflow-x: hidden;
      }

      i {
        color: #FFFFFF;
      }

      .menu-item {

        &.is-active, &:hover {
          background-color: #353F4F !important;
          color: #65CEA7 !important;

          i {
            color: #65CEA7 !important;
          }
        }

      }

      .el-submenu__title:hover {
        color: #65CEA7 !important;

        i {
          color: #65CEA7 !important;
        }
      }

      .el-submenu, .el-menu-item {
        width: 100%;
      }
    }
  }

  .topbar-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: 0;
    heihgt: $topbarHeight;
    line-height: $topbarHeight;
    padding: 0 24px 0 0;
    background-color: $topbarBackgroundColor;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: all 0.3s ease-in-out;
    z-index: 12;

    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      text-align: center;
      cursor: pointer;

      i {
        transition: all 0.3s ease-in-out;
      }
    }

    .title {
      height: 100%;
      font-weight: bold;
    }

    .menu-list {
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        height: 48px;
        text-align: center;
        font-size: 0px;

        &:hover {
          cursor: pointer;
          background-color: #F5F5F5;
        }

        .icon {
          vertical-align: middle;
          font-size: 24px;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 4px;
          font-size: 16px;
        }
      }
    }
  }

  .content-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: $topbarHeight;
    bottom: 0;
    padding: 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
</style>
