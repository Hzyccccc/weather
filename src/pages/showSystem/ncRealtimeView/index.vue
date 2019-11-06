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
        <label style="font-size: 31px;color: white;padding-left:150px">气象基础数据可视化平台<i style="font-size:20px;">——NC实时全量数据可视化系统</i></label>
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
        <el-container style="height: 100%;width:100%;">
          <el-aside width="250px">
            <el-container style="height: 100%;border-right:1px solid #ccc">
              <el-header height="60px" style="padding: 0; padding-top:10px;">
                <!-- <p id="toIndex" style="text-align: center;font-size: larger">气象数据源可视化系统</p> -->
                <div style="background-image:url('static/title1.png');width:100%; height:57px;z-index:1199;line-height:57px;position:relative;text-align:right;">
                  <div style="background-image:url('static/num.png');width:29px; height:25px;position:absolute;top:17px;left:15px"></div><span style="font-size:16px;color:#fff;position:absolute;top:0px;right:15px">气象基础数据可视化平台</span>
                </div>
              </el-header>
              <el-main style="padding: 0;padding-top:10px; height:100%">
                <el-container style="height: 80%">
                  <!-- <el-header height="55px" style="padding: 0 0; text-align: center;">
                    <div  style="width: 100%; margin-top:20px; height:57px;margin-top:20px" @click="checkTime(1)">
                      <div style="background-image: url('static/nowTime.png'); width:100%;height:100%; text-aline:center;line-height:57px;position: relative">
                          <span style=" position: absolute; top:2px; left:48px; font-size:22px;color:#FBFBF9"><b>{{currentTime.time}}</b></span>
                          <span style=" position: absolute; top:4px; left:112px; font-size:14px;color:#FBFBF9">{{currentTime.six}}</span>
                          
                          <span style=" position: absolute; top:-8px; left:135px; font-size:8px;color:#FBFBF9">{{currentTime.data}}</span>
                          <span style=" position: absolute; top:12px; left:162px; font-size:8px;color:#FBFBF9">{{dd}}</span>
                      </div>
                    </div>
                  </el-header> -->
                  <el-header height="55px" style="padding: 10px 0 0 0; text-align: center; position: relative">
                    <el-row style="background:#DCDCDC;color:#3A2F31">
                      <el-col :span="10" style="padding: 8px 0 11px 15px; font-size: 32px">{{currentTime.time}}</el-col>
                      <el-col :span="14" style="height: 100%">
                        <p class="dd-middle" style=" font-size: 14px;padding-left:20px;padding-top:11px">{{currentTime.data}}</p>
                        
                        <p class="dd-middle" style="padding-left:20px; font-size: 14px;">{{dd}}</p>
                        
                      </el-col>
                    </el-row>
                  </el-header>
                  <el-main style="padding: 0; height:500px;margin-top:10px">
                    <el-tree :data="data2" show-checkbox node-key="id" default-expand-all
                             @check-change="handleClick" ref="treeForm" @node-click="nodeClick"
                             :default-checked-keys="checkedId"
                             @current-change="currentChange" @check="currentChange">
                    </el-tree>
                  </el-main>
                  <div style="padding: 0 0; text-align: center">
                    <el-row style="margin:10px 0 ">
                      <div  style="width: 100% ; background:#49B1E8;font-size:12px;color: #FBFBF9; height:50px;cursor: pointer" @click="checkTime(checkId)">
                        <p style="padding:7px;">前五分钟</p>
                        <p>{{prevTime}}</p>
                      </div>
                    </el-row>
                    <el-row>
                      <div  style="width: 100% ; background:#49B1E8;font-size:12px;color: #FBFBF9; height:50px;cursor: pointer" @click="checkLastTime(checkId)">
                        <p style="padding:7px;">后五分钟</p>
                        <p>{{nextTime}}</p>
                      </div>
                    </el-row>
                  </div>
                </el-container>
              </el-main>
            </el-container>
          </el-aside>
          <el-container style="height: 100% ;margin-left:15px">
            <el-header style="padding: 0 10px 0 0; height:70px;">
              
              <el-row style="background:#FFFFFF; height:60px;margin-top:10px;z-index:100;border:1px solid #ccc;">
                <el-radio-group v-model="getAllForm.typeCode" @change="checkChange" style="padding-left:10px">
                  <el-radio :label="1" style="margin-left:10px"><span class="radio_text">降雨量</span></el-radio>
                  <el-radio :label="2"><span class="radio_text">雷达反射强度</span></el-radio>
                  <el-radio :label="3"><span class="radio_text">相态</span></el-radio>
                  <el-radio :label="4"><span class="radio_text">风</span></el-radio>
                </el-radio-group>
              </el-row>
            </el-header>
            <el-main style="padding: 0 10px 0 0;height:100%;border-left:1px solid #ccc;position: relative">
              <div ref='basicMapbox' style="height: 100%;overflow: hidden;position: relative"></div>
              <city-select style="top: 10px;" @tocity="tocity($event)"></city-select>
            </el-main>
          </el-container>
        </el-container>
      </el-main>
    </div>
  </div>
</template>
<script>
  import {getAll, getAll2} from 'src/api/data/showSystem/ncRealtime/index'
  import ElRadio from 'element-ui/packages/radio/src/radio';
  import {init, map} from 'src/api/data/showSystem/ncRealtime/map';
  import {formatDate, toShowSytem} from 'src/api/data/showSystem/main';
  import cities from 'src/data/city_center2.json';
  import CitySelect from '../../home/cityselect';
  export default {
    components: {
      ElRadio,
      CitySelect
         
      },
    data() {
      return {
        checkId: '5',
        max: 8,
        min: 0,
        getAllForm: {
          currentpage: 1,
          pagesize: 180000,
          startCid: undefined,
          startRid: undefined,
          endCid: undefined,
          endRid: undefined,
          typeCode: 4,
          curpage: 1
        },
        dd: null,
        tname: null,
        pages: undefined,
        data2: [],
        checkedId: [5],
        currentTime: {
          data: null,
          time: null,
          six: null
        },
        prevTime: null,
        nextTime: null,
        hourData: [],
        timer: null,
        lastTimer: ''
      }
    },
    mounted() {
      this.init();
      
      this.timer = setInterval(this.countTime, 1000)
      this.countTime()
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
      lastTime(){
        this.lastTimer = this.nextTime.substring(this.nextTime.length-5)
      },
      countTime() {
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60 - 20 * 60 * 1000;
        let timer = formatDate(new Date(time + 20 * 60 * 1000), 'hh:mm');
        
        console.log('===');
        
        console.log(timer);
        console.log(this.lastTimer);
        if(timer === this.lastTimer) {
          this.init();
          console.log('111');
          
        }
        
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$store.commit('SET_TOKEN', '');
            this.$store.commit('SET_USER', null);
            this.$store.commit('SET_MENUCODE', null);
            this.$router.replace({path: '/login'});
          })
          .catch(() => {
            return false;
          })
      },
      init() {
        
        
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60 - 20 * 60 * 1000;
        // this.currentTime = formatDate(new Date(time + 20 * 60 * 1000), 'yyyy年MM月dd日 hh:mm:ss');
        this.currentTime.data = formatDate(new Date(time + 20 * 60 * 1000), 'yyyy年MM月dd日');
        this.currentTime.time = formatDate(new Date(time + 20 * 60 * 1000), 'hh:mm');
        this.currentTime.six = formatDate(new Date(time + 20 * 60 * 1000), 'ss');
        this.prevTime = formatDate(new Date(time + 15 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.nextTime = formatDate(new Date(time + 25 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        let timeData = [];
        this.dd = '星期' + '日一二三四五六'.charAt(date.getDay());
        let currentDate = formatDate(new Date(time), 'yyyy年MM月dd日');
        let num = -1;
        for (let i = 0; i < 24; i++) {
          let cirdd = new Date(time + i * 5 * 60 * 1000);
          let testdd = formatDate(cirdd, 'yyyy年MM月dd日');
          let timestr = formatDate(cirdd, 'hh:mm');
          if (i === 0 || currentDate !== testdd) {
            currentDate = testdd;
            num++;
            timeData.push({'id': i + 1, label: testdd, 'children': []});
          }
          timeData[num].children.push({'id': i + 1, label: timestr, datetime: cirdd});
        }
        this.tname = formatDate(new Date(time + 20 * 60 * 1000), 'yyyyMMdd_hhmm');
        this.data2 = timeData;
        init(this);
        this.lastTime()
        
      },
      getAll() {
        getAll2(this.getAllForm, this);
      },
      checkChange() {
        // 先移除图层，再请求新的数据
        if (map.getSource('states')) {
          map.removeLayer('mapGeoLayer');
          map.removeSource('states');
        }
        this.getAll();
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
        console.log(obj);
        this.checkId = obj.id
        let timer = Number(new Date(obj.datetime))
        console.log(timer);
        this.prevTime = formatDate(new Date(timer - 5 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.nextTime = formatDate(new Date(timer + 5 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.tname = formatDate(obj.datetime, 'yyyyMMdd_hhmm');
        this.checkChange();
      },
      checkTime(idx) {
        
        idx--
        console.log(idx);
        if(idx == 0){
          idx = 1
        }
        this.checkedId[0] = idx;
        this.$refs.treeForm.setCheckedKeys([idx]);
        this.tname = formatDate(this.$refs.treeForm.getNode(idx).data.datetime, 'yyyyMMdd_hhmm');
        let timer = Number(new Date(this.$refs.treeForm.getNode(idx).data.datetime))
        this.prevTime = formatDate(new Date(timer - 5 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.nextTime = formatDate(new Date(timer + 5 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.checkChange();
        this.checkId = idx
      },
      checkLastTime(idx) {
        
        idx++
        if(idx == 25){
          idx = 24
        }
        console.log(idx);
        this.checkedId[0] = idx;
        this.$refs.treeForm.setCheckedKeys([idx]);
        let timer = Number(new Date(this.$refs.treeForm.getNode(idx).data.datetime))
        this.prevTime = formatDate(new Date(timer - 5 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.nextTime = formatDate(new Date(timer + 5 * 60 * 1000), 'yyyy年MM月dd日 hh:mm');
        this.tname = formatDate(this.$refs.treeForm.getNode(idx).data.datetime, 'yyyyMMdd_hhmm');
        this.checkChange();
        this.checkId = idx
      }
    }
   
  }
</script>
<style scoped>
  @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');
  #toIndex:hover,>>>#dateCheck:hover {cursor: pointer;}
  .dd-middle{
    padding: 5px 0 0 0;
     text-align: left;
    
     }
  .coordinates {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding: 5px 10px;
    margin: 0;
    font-size: 11px;
    line-height: 18px;
    border-radius: 3px;
    display: none;
  }

  .check_div {
    width: 600px;
    height: 20px;
    top: 10px;
    left: 30px;
    position: absolute;
    z-index: 9999;
    
  }

  .radio_text {
  
    color: #2191FD;
    font-size: 20px;
    text-align: center;
    line-height: 60px
  }

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
    left: -90px;
    font-size: small;
    color: white;
  }

  .min{
    width: 100px;
    position: absolute;
    left: -80px;
    font-size: small;
    color: white;
    bottom: 10px
  }
  >>>.el-carousel__item h3 {
    color: azure;
    font-size: 14px;
    line-height: 30px;
    margin: 0;
  }

  >>>.el-carousel__item {
    background-color: rgba(0,0,0,0);
    text-align: center;
  }
  >>>.mapboxgl-ctrl-bottom-left {
    bottom: 82px!important;
    left: 20px!important;
  }
  #toIndex:hover {cursor: pointer;}

</style>
