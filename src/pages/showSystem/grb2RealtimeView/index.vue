<template>
  <!--<div class='index' style="position: absolute;top: 0;bottom: 0;left: 0;right: 0">
    <div style="width: 100%; height: 100%; margin: 0"  ref='basicMapbox'></div>
    <div style="position: absolute; top: 10px; left: 10px">
      <el-radio-group v-model="mqpf" @change="mqpfChange">
        <el-radio label="mqf">降雨量</el-radio>
        <el-radio label="temp">温度</el-radio>
        <el-radio label="uv">风</el-radio>
      </el-radio-group>
    </div>
  </div>-->
  <div style='position: fixed;width: 100%; height: 100%'>
    <div style="height: 100%;width:100%">
       <el-header height="81px" style="background-color: white; padding: 0">
        <div class="top_div">
          <div style="height:81px;width: 100%;z-index: -100;background-image: url('static/icon/img03/title.png');line-height: 82px">
            <el-image
          style="width: 100px; display: inline-block; vertical-align: top;margin: 10px 20px;cursor: pointer;"
          src="static/icon/white_bottom_logo.png"
          @click.native="goIndex"
        ></el-image>
        <span style="position: absolute;top: 8px;left: 119px;color: #F4F4F4;">| 创新应用中心</span>
        <label style="font-size: 31px;color: white;padding-left:150px">气象基础数据可视化平台<i style="font-size:20px;">——GRB2实时全量数据可视化系统</i></label>
        <ul style="display: inline-block;float: right;margin: 0 35px;color:#fff;font-size:26px">
          <li v-if="user" @click="exit" class="user-icon" style="padding: 0;cursor:pointer;">
            <el-dropdown
              :show-timeout="10"
              :hide-timeout="10"
              
              style="padding: 0 15px;color:#fff;">
              <div class="dropdown-content el-dropdown-link">
                <i class="icon el-icon-adm-usersetup" style="font-size:22px"></i>
                <span class="text" style="font-size:22px">{{user.userName}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">{{user.userName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <!-- <li class="exit-icon" @click="exit" style="cursor:pointer;color:#fff; margin-right: 5px; width:20px;height:20px">
            <i class="icon iconfont el-icon-adm-exit"></i>
          </li> -->
        </ul>
          </div>
        </div>
      </el-header>
      <el-main style="padding: 0;position: relative; height:100%;width:100%;top: -6px;">
        <el-container style="height: 100%;width:100%">
          <el-aside width="250px">
            <el-container style="height: 100%;border-right:1px solid #D2D2D2">
              <el-header height="45px" style="padding: 0; margin-top:10px;">
                <!-- <p id="toIndex" style="text-align: center;font-size: larger">气象数据源可视化系统</p> -->
                <div style="background-image:url('static/title1.png');width:100%; height:57px;z-index:1199;line-height:57px;position:relative;text-align:right;">
                  <div style="background-image:url('static/num.png');width:29px; height:25px;position:absolute;top:17px;left:15px"></div><span style="font-size:16px;color:#fff;position:absolute;top:0px;right:15px">气象基础数据可视化平台</span>
                </div>
              </el-header>
              <el-main style="padding: 0; height: 700px">
                <el-container style="height: 80%;margin-top:22px">
                  <el-header style="padding: 0 0; text-align: center;background-color:#DCDCDC; ">
                    <p style="text-align: center;margin: 12px 0;color:#767676;font-size:16px">当前有效强对流天气对象<br/>(1小时内)</p>
                  </el-header>
                  <el-main style="padding: 0 0">
                    <el-tree :data="data2" show-checkbox node-key="id" default-expand-all
                             @check-change="handleClick" ref="treeForm" @node-click="nodeClick"
                             :default-checked-keys="checkedId"
                             @current-change="currentChange" @check="currentChange">
                    </el-tree>
                  </el-main>
                </el-container>
              </el-main>
            </el-container>
          </el-aside>
          <el-container style="height: 100%;margin-left:15px">
            <el-header style="padding: 0 20px 0 0 ; height: 60px;margin-top:10px">
              <el-row style="background:#FFFFFF; height:60px;z-index:100;border:1px solid #D2D2D2;">
                <el-radio-group v-model="mqpf" @change="mqpfChange" style="padding-left:10px">
                  <el-radio label="mqf"><span class="radio_text">降雨量</span></el-radio>
                  <el-radio label="temp"><span class="radio_text">温度</span></el-radio>
                  <el-radio label="uv"><span class="radio_text">风</span></el-radio>
                </el-radio-group>
              </el-row>
            </el-header>
            <el-main style="padding: 0 20px 0 0 ;height:100%;border-left:1px solid #D2D2D2;position: relative">
              <div ref='basicMapbox' style="height: 100%;"></div>
               <city-select style="top: 10px;" @tocity="tocity($event)"></city-select>
            </el-main>
          </el-container>
        </el-container>
      </el-main>
    </div>
  </div>
</template>
<script>
  import {map, init, getDataByBox} from 'src/api/data/showSystem/grb2Realtime/map'
  import {formatDate, toShowSytem} from 'src/api/data/showSystem/main';

  import cities from 'src/data/city_center2.json';
  import CitySelect from '../../home/cityselect';
  export default {
    components: {
      
      CitySelect
         
      },
    data() {
      return {
        bounds: null,
        coor: null,
        mqpf: 'mqf',
        curpage: 1,
        total: 1,
        pagesize: 100000,
        data2: [],
        tname: null,
        checkedId: [1]
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      tocity(e) {
        if (e.length < 3) {
          map.jumpTo({'center': e, 'zoom': 10});
        } else {
          map.jumpTo({'center': e.slice(0, 2), 'zoom': 3});
        }
      },
      fiterType() {
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
             this.axios.get(`/aicLogin/aicLoginExit?userId=${this.$store.state.user.userId}`).then(res =>{
                this.$store.commit('SET_TOKEN', null);
                this.$store.commit('SET_USER', null);
                this.$store.commit('SET_MENUCODE', null);
                this.$router.replace({path: '/login'});
                this.sessionStorage.removeItem('token');
            })
          })
          .catch(() => {
            return false;
          })
      },
      // 初始化
      init() {
        let date = new Date();
        let hour = date.getHours();
        if (hour >= 8 && hour < 20) {
          hour = hour - 8;
        } else {
          hour = hour > 20 ? hour - 20 : hour + 24 - 20;
        }
        let time = date.getTime() - date.getMinutes() * 1000 * 60 - hour * 60 * 60 * 1000;
        let timeData = [];
        let currentDate = formatDate(new Date(time), 'yyyy年MM月dd日');
        let num = -1;
        for (let i = 0; i < 12; i++) {
          let cirdd = new Date(time - i * 12 * 60 * 60 * 1000);
          let testdd = formatDate(cirdd, 'yyyy年MM月dd日');
          let timestr = formatDate(cirdd, 'hh:mm');
          if (i === 0 || currentDate !== testdd) {
            currentDate = testdd;
            num++;
            timeData.push({'id': i + 1, label: testdd, 'children': []});
          }
          timeData[num].children.push({'id': i + 1, label: timestr, datetime: cirdd})
        }
        this.data2 = timeData;
        this.tname = formatDate(new Date(time), 'yyyyMMdd_hhmm');
        init(this);
      },
      mqpfChange() {
        var geoJson = {
          'type': 'FeatureCollection',
          'features': []
        };
        if (map.getSource('states')) {
          map.getSource('states').setData(geoJson);
        }
        getDataByBox('', this);
      },
      handleClick(data, checked, node) {
        if (checked === true) {
          this.checkedId[0] = data.id;
          this.$refs.treeForm.setCheckedNodes([data]);
        }
      },
      nodeClick(data, checked, node) {
        this.checkedId[0] = data.id;
        this.$refs.treeForm.setCheckedNodes([data]);
      },
      goIndex() {
        toShowSytem(this);
      },
      currentChange(obj) {
        this.tname = formatDate(new Date(obj.datetime), 'yyyyMMdd_hhmm');
        this.mqpfChange();
      }
    }
  };
</script>
<style>
  @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
  .radio_text {
    color: #2191FD;
    font-size: 20px;
    text-align: center;
    line-height: 60px
  }
  #toIndex:hover {cursor: pointer;}

  .map_color_pillars {
    width: 40px;
    height: 190px;
    background: linear-gradient(#723122, #F2F12D);
    position: absolute;
    z-index: 9998;
    bottom: 80px;
    right: 30px;
    text-align: center;
  }

  .max{
    width: 100px;
    position: absolute;
    left: -80px;
    font-size: small;
    color: white;
  }

  .min{
    width: 100px;
    position: absolute;
    left: -80px;
    font-size: small;
    color: white;
    bottom: 0
  }
  
</style>
<style scoped>
  >>>.mapboxgl-ctrl-bottom-left {
    bottom: 82px!important;
    left: 20px!important;
  }
</style>
