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
        <label style="font-size: 31px;color: white;padding-left:150px">气象基础数据可视化平台<i style="font-size:20px;">——站点72小时数据可视化系统</i></label>
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
        <el-container style="height: 100%;width:100%;">
          <el-aside width="250px">
            <el-container style="height: 100%;border-right:1px solid #D2D2D2">
              <el-header height="55px" style="padding: 0; margin-top:10px;">
                <!-- <p id="toIndex" style="text-align: center;font-size: larger">气象数据源可视化系统</p> -->
                <div style="background-image:url('static/title1.png');width:100%; height:57px;z-index:1199;line-height:57px;position:relative;text-align:right;">
                  <div style="background-image:url('static/num.png');width:29px; height:25px;position:absolute;top:17px;left:15px"></div><span style="font-size:16px;color:#fff;position:absolute;top:0px;right:15px">气象基础数据可视化平台</span>
                </div>
              </el-header>
              <el-main style="padding: 0; height: 700px">
                <el-container style="height: 80%;margin-top:10px">
                  <el-header style="padding: 0 0; text-align: center;background-color:#DCDCDC; ">
                    <p style="text-align: center;margin: 20px 0;color:#767676;font-size:16px">站点72小时数据可视化系统</p>
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
                <el-checkbox-group v-model="districten" @change="fiterLevel" style="padding-left:20px">
                  <el-checkbox label="1"><span class="radio_text">直辖市/省会</span></el-checkbox>
                  <el-checkbox label="2"><span class="radio_text">地市</span></el-checkbox>
                  <el-checkbox label="3"><span class="radio_text">区县</span></el-checkbox>
                </el-checkbox-group>
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
  import {init, getWeather,map} from 'src/api/data/showSystem/n72f/map';
  import {formatDate, toShowSytem} from 'src/api/data/showSystem/main';
  import cities from 'src/data/city_center2.json';
  import CitySelect from '../../home/cityselect';
  export default {
    components: {
      
      CitySelect
         
      },
    data() {
      return {
        districten: ['1'],
        weathers: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 29, 53, 999],
        markers: [],
        checkedId: [1],
        data2: [],
        tname: null,
        spid: null
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      tocity(e) {
        if (e.length < 3) {
          map.jumpTo({'center': e, 'zoom': 10});
        } else {
          map.jumpTo({'center': e.slice(0, 2), 'zoom': 3});
        }
      },
      init() {
        let date = new Date();
        let time = null;
        let hour = date.getHours();
        let diffes = null;
        if (hour >= 8 && hour < 12) {
          time = date.getTime() - date.getMinutes() * 1000 * 60 - (hour - 8) * 60 * 60 * 1000;
          diffes = [12, 8, 4];
        } else if (hour >= 12 && hour < 20) {
          time = date.getTime() - date.getMinutes() * 1000 * 60 - (hour - 12) * 60 * 60 * 1000;
          diffes = [4, 12, 8];
        } else if (hour >= 20 && hour < 24) {
          time = date.getTime() - date.getMinutes() * 1000 * 60 - (hour - 20) * 60 * 60 * 1000;
          diffes = [8, 4, 12];
        } else {
          time = date.getTime() - date.getMinutes() * 1000 * 60 - (hour + 4) * 60 * 60 * 1000;
          diffes = [8, 4, 12];
        }
        let timeData = [];
        let currentDate = formatDate(new Date(time), 'yyyy年MM月dd日');
        let num = -1;
        let round = 0;
        let cirtime = time;
        for (let i = 0; i < 12; i++) {
          let cirdd = null;
          if (i === 0) {
            cirdd = new Date(cirtime);
          } else {
            cirtime = cirtime - diffes[i - round * 3 - 1] * 60 * 60 * 1000;
            cirdd = new Date(cirtime);
          }
          if (i - round * 3 - 1 === 2) {
            round++;
          }
          let testdd = formatDate(cirdd, 'yyyy年MM月dd日');
          let timestr = formatDate(cirdd, 'hh:mm');
          if (i === 0 || currentDate !== testdd) {
            currentDate = testdd;
            num++;
            timeData.push({'id': i + 1, label: testdd, 'children': []});
            timeData[num].children.push({'id': i + 1, label: timestr});
          } else {
            timeData[num].children.push({'id': i + 1, label: timestr})
          }
        }
        this.data2 = timeData;
        this.tname = formatDate(new Date(time), 'yyyyMMdd');
        this.spid = formatDate(new Date(time), 'hh') + 10;
        init(this);
      },
      fiterLevel() {
        getWeather(this);
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
        this.spid = obj.label.split(':')[0] + 10;
        getWeather(this);
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
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  };
</script>
<style scoped>
  @import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css";

  .radio_text {
    color: #2191FD;
    font-size: 20px;
    text-align: center;
    line-height: 60px
  }
  #toIndex:hover {cursor: pointer;}
  
</style>
<style scoped>
  >>>.mapboxgl-ctrl-bottom-left {
    bottom: 82px!important;
    left: 20px!important;
  }
</style>
