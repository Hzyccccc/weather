<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="layout">
    <div class="top_div">
      <div style="height:81px;width: 100%;z-index: -100;background-image: url('static/icon/img03/title.jpg');line-height: 82px">
        <el-image
          style="width: 135px; display: inline-block; vertical-align: top;margin: 0px 2.5%"
          src="static/icon/white_bottom_logo.png"
        ></el-image>
        <label style="font-size: 31px;color: white">四维智联创新应用展示中心</label>
        <ul style="display: inline-block;float: right;margin: 0 35px;color: white">
          <li v-if="user" class="user-icon" style="padding: 0;">
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
          <li class="exit-icon" @click="exit" style="cursor:pointer">
            <i class="icon iconfont el-icon-adm-exit"></i>
          </li>
        </ul>
        <ul style="display: inline-block;float: right;margin-right: 35px;color: white;">
          admin
        </ul>
        <ul style="display: inline-block;float: right;color: rgba(0,0,0,0);margin-right: 15px;
            background-image: url('static/icon/login.png');background-size: contain;background-repeat: no-repeat;
            background-position-y: center">
          aaaa
        </ul>
      </div>
    </div>
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}" style="background-color: white;padding-top: 6px;margin-top: 81px;border-right: 1px solid #EBEEF5;">
      <div class="logo-wrapper" style="background-color: rgb(16,118,180);height: 60px;padding-left: 5px">
        <div style="font-size: large;font-weight: 600;color: rgb(131,131,131);height: 100%;cursor: pointer;
        background-image: url('static/icon/bad_weather_logo.png'); background-size: 25%;background-position: 7px center;
        background-repeat: no-repeat; line-height: 23px; text-align: right;background-color: rgb(241,241,241)" @click="$router.replace('/')">
          <p style="padding: 5px 20px 0px 0;">台风利奇马</p>
          <p style="padding: 5px 20px 0px 0;">极端天气</p>
        </div>
      </div>
      <div style="position: absolute;top: 75px;width: 100%;bottom: 0;">
        <el-collapse accordion v-model="activeNames">
          <el-collapse-item v-for="(itm, idx) in sideWeather" :key="idx" :name="itm.type">
            <template slot="title">
              <!--<i v-if="isSideWeather(itm.type)" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/weather/${itm.img1})`}"></i>-->
              <i v-if="wCity[itm.type].length > 0" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/weather/${itm.img1})`}"></i>
              <i v-else class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/weather/${itm.img2})`}"></i>
              <span>{{itm.label}}</span>
            </template>
            <el-tree
              :data="wCity[itm.type]"
              accordion :expand-on-click-node="false"
              @node-click="linkClick">
            </el-tree>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}" style="top: 0px;overflow-x: auto;background-color: white;margin-top: 81px">
      <el-row :gutter="20" style="min-width: 100%;margin-left: 0px;overflow:hidden">
        <div style="margin: 10px 0 0 0px;width: 140px;display: inline-block">
          <el-card style="background-color: rgba(242,242,242);text-align: center;" class="top_card">
            <p style="font-size: 30px;font-weight: 700;padding: 12px 0px;">{{currtTime}}</p>
            <p>{{currtDate}}</p>
          </el-card>
        </div>
        <div style="display: inline-block;width: 140px;">
          <el-card style="background-color: rgba(242,242,242);text-align: center;" class="top_card">
            <p style="font-size: 30px;font-weight: 700;padding: 12px 0px;">{{sumWeather()}}</p>
            <p>当前极端天气数</p>
          </el-card>
        </div>
        <div style="display: inline-block;position: absolute; top: 10px;left: 300px;right: 0;overflow:hidden">
          <el-row :gutter="10" style="overflow:hidden">
            <el-col :span="3" v-for="(itm, idx) in polygonData" :key="idx" style="min-width: 170px">
              <div class="top_card" style="margin: 0 0 10px 0;padding-left: 55px;white-space: nowrap; margin-bottom:10px"
                   :style="{'background-image': itm.polygonNum>0?'url(static/icon/weather/' + itm.img + '.png)':'url(static/icon/weather/' + itm.img + '_gray.png)'}">
                <div style="height: 85px;padding-left: 0;padding-right: 0">
                  <p class="p_wgrade_lb" style="font-size: 14px"><label class="wgrade_lb">总预警量:</label>{{itm.polygonNum}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">红色一级:</label>{{itm.wgrade1Num}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">橙色一级:</label>{{itm.wgrade2Num}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">橙色二级:</label>{{itm.wgrade3Num}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row style="position: absolute; top: 125px;left: 16px; right: 16px; bottom: 16px; z-index: 100" :gutter="20">
        <el-col :span="18" style="height: 100%;">
          <div ref="basicMapbox" style="height: 100%;overflow: hidden;position: relative"></div>
          <!--<city-select style="top: 10px;" @tocity="tocity($event)"></city-select>-->
        </el-col>
        <el-col :span="6" style="border: 1px solid silver;height: 100%;overflow: hidden;position: relative;padding: 0" id="dataList">
          <el-row style="height: 30px;text-align: center;background-color: #66b1ff">
            <el-col :span="12" style="border-right: 2px solid white;padding: 4px;box-sizing:border-box;cursor: pointer" @click.native="orderOccurTime">
              <span style="color: white;vertical-align: top;margin-right: 2px">发生时间</span>
              <i :class="occurTime?'el-icon-caret-bottom':'el-icon-caret-top'" style="font-size: 20px;font-weight: 500"></i>
            </el-col>
            <el-col :span="12" style="padding: 4px;box-sizing:border-box;border-left: 2px solid white;cursor: pointer">
              <el-dropdown trigger="click" :hide-on-click="false">
                  <span class="el-dropdown-link">
                    <span style="color: white;vertical-align: top;margin-right: 2px">预警等级</span>
                    <i class="el-icon-s-operation" style="font-size: 20px;font-weight: 500"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-checkbox-group v-model="alarmList" @change="changeGrade">
                    <el-dropdown-item><el-checkbox label="1">红色一级</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox label="2">橙色一级</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox label="3">橙色二级</el-checkbox></el-dropdown-item>
                  </el-checkbox-group>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <div style="position: absolute;top: 30px;bottom: 0;right: 0px;left: 0">
            <el-scrollbar style="height: 100%">
              <el-table :data="_filterRightData(rightFromData)" style="width: 100%;height: 100%;overflow: auto"
                        :show-header="false" border :row-style="{'cursor': 'pointer'}" @row-click="toLocation">
                <el-table-column class-name="table_cell1" align="center" width="80" >
                  <template slot-scope="scope">
                    <div class="block">
                      <el-image v-if="scope.row.objectType === '10800'" style="width: 65%;" :src="`static/icon/wtype/rain${scope.row.gtype}.png`"></el-image>
                      <el-image v-if="scope.row.objectType === '10900'" style="width: 65%;" :src="`static/icon/wtype/wind${scope.row.gtype}.png`"></el-image>
                    </div>
                    <span :title="scope.row.objectName"  style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden; ">{{scope.row.objectName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" class-name="table_cell2">
                  <template slot-scope="scope">
                    <p :title="scope.row.location"  style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden; ">地点: {{scope.row.location}}</p>
                    <p v-if="scope.row.objectGrade === '108001'">危险: 车辆泡水，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '108002'">危险: 刹车缓顿，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '108003'">危险: 视野受限，减速慢行</p>
                    <p v-if="scope.row.objectGrade === '109001'">危险: 道路飓风，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '109002'">危险: 道路强风，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '109003'">危险: 道路横风，减速慢行</p>
                    <p v-if="scope.row.timeDiff > 0">预计发生时间: {{scope.row.occurtime | _formatDate}}</p>
                    <p v-if="scope.row.timeDiff > 0">预计持续时间: 约{{scope.row.duration}}分钟</p>
                    <p v-if="scope.row.timeDiff <= 0">发生时间: {{scope.row.occurtime | _formatDate}}</p>
                    <p v-if="scope.row.timeDiff <= 0">已经持续时间: {{scope.row.timeDiff | _formatDate3}}</p>
                  </template>
                </el-table-column>
                <el-table-column width="5"></el-table-column>
              </el-table>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="position: fixed;z-index: 1000;display: none" id="label-box">
      <template v-for="(itm, idx) in realFromData">
        <div class="marker-win" style="position: absolute;cursor: pointer;width: auto" @click="toLocation(itm)"
                @mouseenter="showPopup(idx)" @mouseleave="showPopup(idx)"
                :style="{'z-index': itm.wgid === checkWgid ?100:0, 'width': itm.timeDiff>0?'152px':''}">
          <div>
            <div style="width: 50px;padding: 0">
              <el-image v-if="itm.objectType === '10800'" style="width: 100%;" :src="`static/icon/wtype/rain${itm.gtype}.png`"></el-image>
              <el-image v-if="itm.objectType === '10900'" style="width: 100%;" :src="`static/icon/wtype/wind${itm.gtype}.png`"></el-image>
              <div v-if="itm.timeDiff > 0" style="width: 50px;text-align: center;color: rgb(125,125,125);">
                <p style="font-size: 12px;font-weight: 700;background-color: rgb(228,228,228);padding: 5px 0;border-radius: 11px">预警中</p>
              </div>
              <div v-else style="width: 50px;text-align: center;color: rgb(125,125,125);">
                <p style="font-size: 12px;font-weight: 700;background-color: rgb(228,228,228);padding: 5px 0;border-radius: 11px">发生中</p>
              </div>
            </div>
            <div v-if="itm.timeDiff > 0" style="width: 96px;text-align: center">
              <p style="font-weight: 700;font-size: 17px;padding: 7px 0"
                 :style="{'color': colorfiter(itm.timeDiff)}">{{itm.timeDiff | _formatDate2}}</p>
              <p style="font-size: 12px">距离发生时间还剩</p>
              <div style="width: 100%">
                <el-progress style="display: block" :percentage="(itm.timeDiff / itm.timeLate * 100) | _percentage"
                             :show-text="false" :color="colorfiter(itm.timeDiff)"></el-progress>
              </div>
            </div>
          </div>
          <!--<div v-if="itm.timeDiff > 0" style="width: 100%">
            <el-progress style="display: block" :percentage="(itm.timeDiff / itm.timeLate * 100) | _percentage"
                         :show-text="false" :color="colorfiter(itm.timeDiff)"></el-progress>
          </div>-->
        </div>
        <el-row class="popup-win" style="background-image: url('static/icon/context.png');position: absolute;width: 300px">
          <el-col class="popup-win-img" v-if="itm.objectType === '10800'"
                   :style="{'background-image': `url(static/icon/wtype/rain${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <el-col class="popup-win-img" v-if="itm.objectType === '10900'"
                   :style="{'background-image': `url(static/icon/wtype/wind${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <el-col style="width: 220px;padding: 0 0 0 5px;font-size: 12px;white-space: nowrap;overflow: hidden">
            <p>地点: {{itm.location}}</p>
            <p v-if="itm.objectGrade === '108001'">危险: 车辆泡水，挪车躲避</p>
            <p v-if="itm.objectGrade === '108002'">危险: 刹车缓顿，停车躲避</p>
            <p v-if="itm.objectGrade === '108003'">危险: 视野受限，减速慢行</p>
            <p v-if="itm.objectGrade === '109001'">危险: 道路飓风，挪车躲避</p>
            <p v-if="itm.objectGrade === '109002'">危险: 道路强风，停车躲避</p>
            <p v-if="itm.objectGrade === '109003'">危险: 道路横风，减速慢行</p>
            <p v-if="itm.timeDiff > 0">预计发生时间: {{itm.occurtime | _formatDate}}</p>
            <p v-if="itm.timeDiff > 0">预计持续时间: 约{{itm.duration}}分钟</p>
            <p v-if="itm.timeDiff <= 0">发生时间: {{itm.occurtime | _formatDate}}</p>
            <p v-if="itm.timeDiff <= 0">已经持续时间: {{itm.timeDiff | _formatDate3}}</p>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>
<script>
  import {sessionStorage} from 'src/assets/js/storage';
  import ElImage from 'element-ui/packages/image/src/main';
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group';
  import {formatDate} from 'src/api/data/showSystem/main';
  import cities from 'src/data/city_center2.json';
  import {map, loadMap, getFeature, getFeatureCity, togglePopup, showPolygon} from 'src/api/data/SweatherCarMain/hpsweather1';
  import CitySelect from '../home/cityselect';

  export default {
    components: {
      CitySelect,
      ElRadioGroup,
      ElImage
    },
    created() {
      // this.checkAuth();
    },
    data() {
      return {
        rightFromData: [],
        realFromData: [],
        AutoUpdates: undefined,
        isdycupdate: false,
        menuRadio: ['1', '2', '3', '4', '5', '6', '7', '8'],
        isCollapsed: false,
        updatetime: '10:00:00',
        wCity: {
          'rain': [],
          'wind': [],
          'hail': [],
          'snow': [],
          'fog': [],
          'sanddust': [],
          'freeze': []
        },
        polygonData: [
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '暴雨', color: 'rgb(50,89,34)', img: 'bigrain'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '大风', color: 'rgb(147,102,52)', img: 'bigwind'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '冰雹', color: 'rgb(96,44,108)', img: 'hail'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '大雪', color: 'rgb(0,113,207)', img: 'bigsnow'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '大雾', color: 'rgb(0,122,117)', img: 'bigfog'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '沙尘', color: 'rgb(153,131,9)', img: 'sanddust'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '结冰', color: 'rgb(170,56,79)', img: 'freeze'}
        ],
        sideWeather: [
          {'type': 'rain', 'label': '强雨', 'img1': 'bigrain1.png', 'img2': 'bigrain2.png'},
          {'type': 'wind', 'label': '强风', 'img1': 'bigwind1.png', 'img2': 'bigwind2.png'},
          {'type': 'hail', 'label': '冰雹', 'img1': 'hail1.png', 'img2': 'hail2.png'},
          {'type': 'snow', 'label': '强雪', 'img1': 'bigsnow1.png', 'img2': 'bigsnow2.png'},
          {'type': 'fog', 'label': '大雾', 'img1': 'bigfog1.png', 'img2': 'bigfog2.png'},
          {'type': 'sanddust', 'label': '沙尘', 'img1': 'sanddust1.png', 'img2': 'sanddust2.png'},
          {'type': 'freeze', 'label': '道路结冰', 'img1': 'freeze1.png', 'img2': 'freeze2.png'}
        ],
        // sumWeather: 10,
        tname: null,
        releaseTime: null,
        currtDate: null,
        currtTime: null,
        activeNames: 'rain',
        occurTime: true,
        alarmList: ['1', '2', '3'],
        checkCity: null,
        checkWgid: null,
        sideList: ['rain'],
        initMap: true,
        time: null
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
      this.initTime();
      this.init();
    },
    methods: {
      init() {
        loadMap(this);
        this.getData();
      },
      initTime() {
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60;
        let rdd = new Date(time);
        this.updatetime = formatDate(rdd, 'hh:mm:ss');
        this.tname = formatDate(rdd, 'yyMMdd');
        this.tname = '190909';
        this.releaseTime = formatDate(date, 'yyyy-MM-dd hh:mm') + ':00';
        // this.currtDate = formatDate(date, 'yyyy/MM/dd');
        this.currtDate = '2019-08-10';
        this.currtTime = formatDate(date, 'hh:mm');
        this.releaseTime = '2019-09-09 13:40:00';
        this.time = '2019-08-10 ' + formatDate(rdd, 'hh:mm') + ':00';
      },
      getData() {
        this.rightFromData = [];
        getFeature(10800, this);
        // param.wtype = 10200;
        // getFeature(param, this);
        getFeatureCity(10800, this);
      },
      toLocation(row) {
        this.checkWgid = row.wgid;
        showPolygon(row.wgid);
      },
      checkAuth() {
        let token = this.$store.state.token || sessionStorage.getItem('token');
        if (!token) {
          this.$router.replace('/login');
        }
      },
      handleCommand(command) {
        console.log(command);
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      orderOccurTime() {
        this.occurTime = !this.occurTime;
        if (this.occurTime) {
          for (let i = 0; i < this.rightFromData.length; i++) {
            for (let j = i + 1; j < this.rightFromData.length; j++) {
              let flag = this.rightFromData[i].occurtime > this.rightFromData[j].occurtime;
              if (flag) {
                let one = this.rightFromData[i];
                this.rightFromData[i] = this.rightFromData[j];
                this.rightFromData[j] = one;
              }
            }
          }
        } else {
          for (let i = 0; i < this.rightFromData.length; i++) {
            for (let j = i + 1; j < this.rightFromData.length; j++) {
              let flag = this.rightFromData[i].occurtime < this.rightFromData[j].occurtime;
              if (flag) {
                let one = this.rightFromData[i];
                this.rightFromData[i] = this.rightFromData[j];
                this.rightFromData[j] = one;
              }
            }
          }
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
      linkClick(data) {
        if (data.label === '全国') {
          map.jumpTo({'center': [116.405285, 39.904989], 'zoom': 3});
        }
        if (!data.districtId) return;
        this.alarmList = ['1', '2', '3'];
        let id = JSON.stringify(data.districtId);
        this.checkCity = id;
        // map.jumpTo({'center': cities[id].center, 'zoom': 10});
        map.fitBounds(cities[id].center);
        // let nfromdata = [];
        // this.realFromData.forEach((itm, idx) => {
        //   if (id === itm.districtId) {
        //     nfromdata.push(itm);
        //   }
        // });
        // this.rightFromData = nfromdata;
      },
      tocity(e) {
        if (e.length < 3) {
          map.jumpTo({'center': e, 'zoom': 10});
        } else {
          map.jumpTo({'center': e.slice(0, 2), 'zoom': 3});
        }
      },
      sumWeather() {
        let sum = 0;
        this.polygonData.forEach((itm, idx) => {
          sum += itm.polygonNum;
        });
        return sum;
      },
      showPopup(id) {
        togglePopup(id);
      },
      changeGrade() {
        let all = ',' + this.alarmList.join(',') + ',';
        let nfromdata = [];
        this.realFromData.forEach((itm, idx) => {
          let grade = ',' + parseInt(itm.objectGrade) % 100 + ',';
          if (this.checkCity == null && all.indexOf(grade) > -1) {
            nfromdata.push(itm);
          } else if (this.checkCity === itm.districtId && all.indexOf(grade) > -1) {
            nfromdata.push(itm);
          }
        });
        this.rightFromData = nfromdata;
      },
      isSideWeather(e) {
        let list = ',' + this.sideList.join(',') + ',';
        e = ',' + e + ',';
        if (list.indexOf(e) > -1) {
          return true;
        } else {
          return false;
        }
      },
      colorfiter(e) {
        e = Math.abs(e);
        let h = Math.floor(e / 1000 / 60 / 60);
        let m = Math.floor((e - h * 60 * 60 * 1000) / 1000 / 60);
        if (h > 0) {
          return 'rgb(0,153,255)';
        } else if (m < 60 && m > 29) {
          return 'orange';
        } else {
          return 'red'
        }
      },
      _filterRightData(e) {
        let all = ',' + this.alarmList.join(',') + ',';
        let nfromdata = [];
        e.forEach((itm, idx) => {
          let grade = ',' + parseInt(itm.objectGrade) % 100 + ',';
          if (all.indexOf(grade) > -1) {
            nfromdata.push(itm);
          }
        });
        return nfromdata;
      }
    },
    filters: {
      _formatDate(e) {
        return formatDate(new Date(e), 'hh:mm');
      },
      _formatDate2(e) {
        e = Math.abs(e);
        let h = Math.floor(e / 1000 / 60 / 60);
        let m = Math.floor((e - h * 60 * 60 * 1000) / 1000 / 60);
        let s = Math.floor((e - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
        return (h > 9 ? h : '0' + h) + ':' + (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s);
      },
      _formatDate3(e) {
        e = Math.abs(e);
        let h = Math.floor(e / 1000 / 60 / 60);
        let m = Math.floor((e - h * 60 * 60 * 1000) / 1000 / 60);
        let s = Math.floor((e - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
        if (h > 0) {
          return (h > 9 ? h : '0' + h) + 'h' + (m > 9 ? m : '0' + m) + 'min';
        } else {
          return (m > 9 ? m : '0' + m) + 'min';
        }
      },
      _percentage(e) {
        return Math.floor(e);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/styles/variable';

  .siderbar-wrapper {
    margin-top: 4.2%;
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
    margin-top: 4.2%;
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: 0;
    height: $topbarHeight;
    /*line-height: $topbarHeight;*/
    /*padding: 0 24px 0 0;*/
    background-color: $topbarBackgroundColor;
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
    transition: all 0.3s ease-in-out;
    z-index: 12;
    background-color: rgba(0, 51, 102, 0.5);

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
      display: inline-block;
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
    margin-top: 4.2%;;
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: $topbarHeight;
    bottom: 0;
    padding: 10px 16px 10px 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .top_div {
      height: 4.5%;
    }

    .map_color_pillars {
      width: 40px;
      height: 130px;
      background: linear-gradient(#0000FF, #B0C4DE);
      position: absolute;
      z-index: 9998;
      bottom: 30px;
      right: 20%;
      text-align: center;
    }

    .max {
      width: 100px;
      position: absolute;
      left: -80px;
      font-size: small;
      color: white;
    }

    .min {
      width: 100px;
      position: absolute;
      left: -80px;
      font-size: small;
      color: white;
      bottom: 0
    }
  }
</style>

<style scoped>
  @import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css";

  #w_type_id>>>.el-input__inner{background-color: rgba(0,0,0,0)!important;border: none;font-weight: bold;}
  #w_type_id>>>.el-select__caret{color: black!important;font-weight: bold;}
  #col_switch_id>>>.el-switch__label *{font-size: 18px}
  .div_layer_icon {
    float: right;
    color: rgba(0,0,0,0);
    width: 35px;
    height: 30px;
    margin: 5px 15px 5px 5px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center
  }
  .wgrade_lb{width: 70px; display: inline-block;text-align: center;padding: 2px 0;color: #606266;}
  .p_wgrade_lb{color: #606266;font-size: 13px;padding: 1.5px 0px}
  .top_card>>>.el-card__body{padding: 3px}
  .top_card{
    background-repeat: no-repeat;
    background-size: contain;
    height: 87px!important;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #EBEEF5
  }
  >>>.table_cell1{
    border: none;
    padding: 5px 0;
    font-size: 12px;
  }
  >>>.table_cell2{
    border: 1px solid silver;
    padding: 5px 0;
    font-size: 14px;
  }
  >>>.table_cell2 .cell{
    line-height: 1.3;
  }
  >>>.el-table__body{
    border-spacing:0px 5px;
    padding-right: 5px;
  }
  >>>.cell{
    white-space: nowrap!important;
  }
  .legend_box {
    background-color: rgba(0,0,0,0);
    border: none;
  }
  #dataList >>>.el-scrollbar__wrap {
    overflow-x: hidden!important;
  }
  >>>.mapboxgl-popup-close-button {
    display: none;
  }
  .marker-win {
    display: inline-block;
    background-color: white;
    padding: 7px;
    border: 1px solid;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font: 14px/1 sans-serif;
  }
  .marker-win div{
    display: inline-block;
  }
  .popup-win {
    display: inline-block;
    padding: 7px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 20px;
    font: 14px/1.8 sans-serif;
  }
  .popup-win-img {
    background-repeat: no-repeat;
    background-size: contain;
    white-space: nowrap;
    padding-top: 50px;
    width: 60px;
    height: 84px;
    overflow: hidden;
    line-height: 3;
    text-align: center;
    background-position-y: 10px;
  }
  >>>.mapboxgl-popup{
    position: inherit;
    background-color: rgba(0,0,0,0);
    z-index: 1000;
  }
  >>>.mapboxgl-popup-content{
    padding: 0;
  }
  >>>.mapboxgl-popup-tip{
    display: none;
    background-color: rgba(0,0,0,0);
  }
</style>

