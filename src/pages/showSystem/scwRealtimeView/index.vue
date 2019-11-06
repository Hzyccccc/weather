<template>
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
        <label style="font-size: 31px;color: white;padding-left:150px">气象基础数据可视化平台<i style="font-size:20px;">——实时强对流数据可视化系统</i></label>
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
      <el-main style="padding: 0;position: relative; height:100%;width:100%;top: -6px;background:#fff">
        <el-container style="height: 100%;width:100%">
          <el-aside width="250px">
            <el-container style="height: 100%;margin-left:0px;border-right:1px solid #D2D2D2">
              <el-header height="45px" style="padding: 0; margin-top:10px; ">
                <!-- <p id="toIndex" style="text-align: center;font-size: larger">气象数据源可视化系统</p> -->
                <div style="background-image:url('static/title1.png');width:100%; height:57px;z-index:1199;line-height:57px;position:relative;text-align:right;">
                  <div style="background-image:url('static/num.png');width:29px; height:25px;position:absolute;top:17px;left:15px"></div><span style="font-size:16px;color:#fff;position:absolute;top:0px;right:15px">气象基础数据可视化平台</span>
                </div>
              </el-header>
              <el-main style="padding: 0; height: 700px">
                <el-container style="height: 80%;margin-top:25px">
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
                  <el-footer style="padding: 0 0; text-align: center" height="180px">
                    <el-checkbox-group v-model="wtypes" @change="fiterType">
                      <el-row class="chec_row">
                        <el-checkbox label="rain"><span>短时强降水</span></el-checkbox>
                      </el-row>
                      <el-row class="chec_row">
                        <el-checkbox label="wind"><span>雷雨大风</span></el-checkbox>
                      </el-row>
                      <el-row class="chec_row">
                        <el-checkbox label="hail"><span>冰雹</span></el-checkbox>
                      </el-row>
                      <el-row class="chec_row">
                        <el-checkbox label="rain_wind"><span>短时强降水和雷雨大风</span></el-checkbox>
                      </el-row>
                      <el-row class="chec_row">
                        <el-checkbox label="rain_hail"><span>短时强降水和冰雹</span></el-checkbox>
                      </el-row>
                      <el-row class="chec_row">
                        <el-checkbox label="wind_hail"><span>雷雨大风和冰雹</span></el-checkbox>
                      </el-row>
                      <el-row class="chec_row">
                        <el-checkbox label="rain_wind_hail"><span>短时强降水、雷雨大风和冰雹</span></el-checkbox>
                      </el-row>
                    </el-checkbox-group>
                  </el-footer>
                </el-container>
              </el-main>
            </el-container>
          </el-aside>
          <el-container style="height: 100%;margin-left:15px">
            <el-header style="padding: 0 20px 0 0 ; height: 60px;margin-top:10px">
              
              <el-row style="background:#FFFFFF; height:60px;z-index:100;border:1px solid #D2D2D2;">
                <el-checkbox-group v-model="dtypes" @change="fiterType" style="padding-left: 20px">
                  <el-checkbox label="obs"><span class="radio_text">实况</span></el-checkbox>
                  <el-checkbox label="forecast"><span class="radio_text">外延</span></el-checkbox>
                </el-checkbox-group>
              </el-row>
            </el-header>
            <el-main style="padding: 0 20px 0 0;height:100%;border-left:1px solid #D2D2D2;">
              <div ref='basicMapbox' style="height: 100%;"></div>
              <city-select style="top: 80px;left:280px" @tocity="tocity($event)"></city-select>
              
              <div style="position: absolute;bottom: 78px;left: 0px;right: 0;padding: 0 20px 0 266px;height:60px">
                <el-row style="background-color: rgba(55,79,147,0.6);height:100%">
                  <el-col :span="2" style="height: 10px;width: 7%"></el-col>
                  <el-col :span="2">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(0,255,0);background-color: RGB(0,255,0);"></i>
                      <span style="color: RGB(0,255,0);">短时强降水</span>
                    </button>
                  </el-col>
                  <el-col :span="2">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(255,179,91);background-color: RGB(255,179,91);"></i>
                      <span style="color: RGB(255,179,91);">雷雨大风</span>
                    </button>
                  </el-col>
                  <el-col :span="2">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(252,84,117);background-color: RGB(252,84,117);"></i>
                      <span style="color: RGB(252,84,117);">冰雹</span>
                    </button>
                  </el-col>
                  <el-col :span="4">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(191,224,59);background-color: RGB(191,224,59);"></i>
                      <span style="color: RGB(191,224,59);">短时强降水和雷雨大风</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(8,237,234);background-color: RGB(8,237,234);"></i>
                      <span style="color: RGB(8,237,234);">短时强降水和冰雹</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(236,124,7);background-color: RGB(236,124,7);"></i>
                      <span style="color: RGB(236,124,7);">雷雨大风和冰雹</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: RGB(235,6,7);background-color: RGB(235,6,7);"></i>
                      <span style="color: RGB(235,6,7);">短时强降水、雷雨大风和冰雹</span>
                    </button>
                  </el-col>
                </el-row>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-main>
    </div>

    <el-dialog title="范围内天气情况"
               :visible.sync="dialogVisible"
               :modal="false"
               :close-on-click-modal="false"
               :center="true"
               @opened="dialogOpend"
               @closed="dialogClosed"
               width="70%">
      <div>
        <el-radio-group v-model="mqpf" @change="mqpfChange">
          <el-radio label="mqf"><span>降雨量</span></el-radio>
          <el-radio label="cr"><span>雷达反射强度</span></el-radio>
          <el-radio label="ph"><span>相态</span></el-radio>
          <el-radio label="uv"><span>风</span></el-radio>
        </el-radio-group>
      </div>
      
      
      
    </el-dialog>
  </div>
</template>
<script>
  import {init, diaMap, dialogMap, getDataByBox2, loadScw,map} from 'src/api/data/showSystem/scwRealtime/map';
  import {formatDate, toShowSytem} from 'src/api/data/showSystem/main';
  import cities from 'src/data/city_center2.json';
  import CitySelect from '../../home/cityselect';
  export default {
    components: {
      
      CitySelect
         
      },
    data() {
      return {
        max: 8,
        min: 0,
        dtypes: ['obs', 'forecast'],
        wtypes: ['rain', 'wind', 'hail', 'rain_wind', 'rain_hail', 'wind_hail', 'rain_wind_hail'],
        dialogVisible: false,
        bounds: null,
        coor: null,
        mqpf: 'cr',
        data2: [],
        checkedId: [1],
        tname: null,
        timer: null
      }
    },
    mounted() {
      this.init();
      this.timer = setInterval(this.init, 22000)
    },
    beforeDestroy() {
      clearInterval(this.timer);
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
        loadScw(this);
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
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60 - 15 * 60 * 1000;
        let timeData = [];
        let currentDate = formatDate(new Date(time), 'yyyy年MM月dd日');
        let num = -1;
        for (let i = 0; i < 12; i++) {
          let cirdd = new Date(time - i * 5 * 60 * 1000);
          let testdd = formatDate(cirdd, 'yyyy年MM月dd日');
          let timestr = formatDate(cirdd, 'hh:mm');
          if (i === 0 || currentDate !== testdd) {
            num++;
            timeData.push({'id': i + 1, label: testdd, 'children': []});
          }
          timeData[num].children.push({'id': i + 1, label: timestr, datetime: cirdd})
        }
        this.data2 = timeData;
        this.tname = formatDate(new Date(time), 'yyyyMMdd_hhmm');
        init(this);
      },
      dialogOpend() {
        dialogMap(this);
      },
      dialogClosed() {
        var geoJson = {
          'type': 'FeatureCollection',
          'features': []
        }
        if (diaMap.getSource('states')) {
          diaMap.getSource('states').setData(geoJson);
        }
      },
      mqpfChange() {
        var geoJson = {
          'type': 'FeatureCollection',
          'features': []
        };
        if (diaMap.getSource('states')) {
          diaMap.getSource('states').setData(geoJson);
        }
        let url = null;
        switch (this.mqpf) {
          case 'mqf' : url = `${this.SERVER}scw/getMqfInBox`;
            break;
          case 'cr' : url = `${this.SERVER}scw/getCrInBox`;
            break;
          case 'ph' : url = `${this.SERVER}scw/getPhInBox`;
            break;
          case 'uv' : url = `${this.SERVER}scw/getUVInBox`;
            break;
        }
        getDataByBox2(this);
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
        loadScw(this);
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
  .chec_row {
    text-align: left;
    padding: 2px 10px;
  }
  #toIndex:hover {cursor: pointer;}

  .map_color_pillars {
    width: 40px;
    height: 190px;
    background: linear-gradient(#723122, #F2F12D);
    position: absolute;
    z-index: 9998;
    bottom: 30px;
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
  .legend_box {
    background-color: rgba(0,0,0,0);
    border: none;
    line-height: 60px;
  }
  .legend_box>.el-icon-search{
    margin-right: 5px;
  }

</style>
