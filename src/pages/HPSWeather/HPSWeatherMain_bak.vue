<template>
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
          <li class="exit-icon" @click="exit">
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
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}" style="background-color: rgb(212, 217, 223);padding-top: 6px;margin-top: 81px">
      <div class="logo-wrapper" style="background-color: rgb(16,118,180);padding-top: 6px">
        <div style="font-size: large;font-weight: bold;margin: 5px 10px;color: white;
        background-image: url('static/icon/bad_weather_logo.png'); background-size: contain;
        background-repeat: no-repeat; line-height: 23px; text-align: right">
          <label>极端天气预报系统</label>
        </div>
      </div>
      <div class="menu-wrapper" style="top: 55px;">
        <el-row>
          <el-col :span="4" style="height: 40px;padding-left: 5%">
            <div style="height: 100%;
        background-image: url('static/icon/bad_weather_type.png'); background-size: contain;
        background-repeat: no-repeat;background-position: center center"></div>
          </el-col>
          <el-col :span="20" id="w_type_id">
            <el-select v-model="data" placeholder="极端天气类型" style="width: 100%;border: none">
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div style="position: absolute;top: 100px;border-top: 1px solid grey;width: 100%">
        <el-row :gutter="20" style="margin: 18px 2px">
          <el-col :span="24" style="text-align: center" id="col_switch_id">
            <el-switch
              v-model="mapMode"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="地图模式">
            </el-switch>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin: 18px 2px">
          <el-col :span="24" style="text-align: center">
            地图图层控制
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10" style="line-height: 40px;text-align: right">
            <div class="div_layer_icon" style="background-color: #6BC04B;background-image: url('static/icon/weather/bigrain.png')"></div>
            <div class="div_layer_icon" style="background-color: #FFB35A;background-image: url('static/icon/weather/bigwind.png')"></div>
            <div class="div_layer_icon" style="background-color: #b150c5;background-image: url('static/icon/weather/hail.png')"></div>
            <div class="div_layer_icon" style="background-color: #a08470;background-image: url('static/icon/weather/typhoon.png')"></div>
            <div class="div_layer_icon" style="background-color: #0071CF;background-image: url('static/icon/weather/bigsnow1.png')"></div>
            <div class="div_layer_icon" style="background-color: #00BEB7;background-image: url('static/icon/weather/bigfog1.png')"></div>
            <div class="div_layer_icon" style="background-color: #F5D312;background-image: url('static/icon/weather/sanddust.png')"></div>
            <div class="div_layer_icon" style="background-color: #FC5474;background-image: url('static/icon/weather/freeze.png')"></div>
          </el-col>
          <el-col :span="14" style="text-align: left">
            <el-checkbox-group v-model="menuRadio">
              <el-checkbox label="1" style="height: 40px;line-height: 40px;color: black">强雨</el-checkbox>
              <el-checkbox label="2" style="height: 40px;line-height: 40px;color: black">强风</el-checkbox>
              <el-checkbox label="3" style="height: 40px;line-height: 40px;color: black">冰雹</el-checkbox>
              <el-checkbox label="4" style="height: 40px;line-height: 40px;color: black">台风</el-checkbox>
              <el-checkbox label="5" style="height: 40px;line-height: 40px;color: black">大雪</el-checkbox>
              <el-checkbox label="6" style="height: 40px;line-height: 40px;color: black">大雾</el-checkbox>
              <el-checkbox label="7" style="height: 40px;line-height: 40px;color: black">沙尘</el-checkbox>
              <el-checkbox label="8" style="height: 40px;line-height: 40px;color: black">道路结冰</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="topbar-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}" style="line-height: 52px;background-color: rgb(242,242,242);margin-top: 81px">
      <!--<div class="menu-collapse-wrapper float-left" @click="toggleMenu">
        <i class="el-icon-adm-menu" :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
      </div>-->
      <div class="title float-left" style="padding-left: 10px">
        高精短时极端天气预报
      </div>
      <div class="title float-right">
        更新日期: {{updatetime}}
      </div>
      <div class="title float-right" style="margin-right: 20px">
        <el-checkbox v-model="AutoUpdates" label="1" style="margin-left: 10px" @change="dycChange">自动更新</el-checkbox>
      </div>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="content">
        <div id="root" class="root" style="overflow: hidden">
          <div class="top-block">
            <el-row :gutter="20" style="margin-top: 20px;height: 94px">
              <el-col :span="3" v-for="itm in polygonData" :key="itm.polygonNum">
                <el-card :style="{'background-color': itm.color, 'background-image': 'url(static/icon/weather/' + itm.img + ')'}" class="top_card">
                  <el-row :gutter="10" style="margin-top: 2px;margin-right: 0">
                    <el-col :span="9" style="height: 100%">
                      <div style="text-align: center; margin-top: 15px; ">
                        <el-link style="color: white;text-align: left" @click="toRain(0)">
                          <label style="float: left;margin-top: 25px">{{itm.polygonName}}</label><br>{{itm.polygonNum}}
                        </el-link>
                      </div>
                    </el-col>
                    <el-col :span="15" style="height: 80px;background-color: white;padding-left: 0;padding-right: 0">
                      <el-link @click="toRain(1)"><label class="wgrade_lb">I级预警:</label>{{itm.wgrade1Num}}</el-link>
                      <!--<br>
                      <el-link @click="toRain(2)"><label class="wgrade_lb">II级预警:</label>{{itm.wgrade2Num}}</el-link>
                      <br>
                      <el-link @click="toRain(3)"><label class="wgrade_lb">III级预警:</label>{{itm.wgrade3Num}}</el-link>
                      <br>
                      <el-link @click="toRain(4)"><label class="wgrade_lb">IV级预警:</label>{{itm.wgrade4Num}}</el-link>-->
                    </el-col>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="10" style="margin-top: 20px;height: 100%;">
            <el-col :span="18" style="height: 95%;position: relative">
              <div ref="basicMapbox" style="height: 641px;"></div>
              <div style="position: absolute;bottom: 30px;left: 0;right: 0;padding: 0 10%">
                <el-row style="background-color: rgba(178,202,250,0.5)">
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(107,192,73);"></i>
                      <span style="color: black;">强雨</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(255,179,90);"></i>
                      <span style="color: black;">强风</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(177,80,196);"></i>
                      <span style="color: black;">冰雹</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(153,131,110);"></i>
                      <span style="color: black;">台风</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(2,112,207);"></i>
                      <span style="color: black;">大雪</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(0,191,185);"></i>
                      <span style="color: black;">大雾</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(245,211,18);"></i>
                      <span style="color: black;">沙尘</span>
                    </button>
                  </el-col>
                  <el-col :span="3">
                    <button type="button" class="legend_box">
                      <i class="el-icon-search" style="color: rgba(0,0,0,0);background-color: RGB(252,84,115);"></i>
                      <span style="color: black;">道路结冰</span>
                    </button>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="6" style="border: 1px solid silver">
              <el-row style="height: 60px;padding: 10px 5px">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="天气类型">
                    <el-select v-model="formInline.wtype" placeholder="全选">
                      <el-option label="暴雨" value="shanghai"></el-option>
                      <el-option label="大风" value="shanghai"></el-option>
                      <el-option label="冰雹" value="shanghai"></el-option>
                      <el-option label="台风" value="shanghai"></el-option>
                      <el-option label="大雪" value="shanghai"></el-option>
                      <el-option label="大雾" value="shanghai"></el-option>
                      <el-option label="沙尘" value="beijing"></el-option>
                      <el-option label="道路结冰" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-row>
              <el-row>
                <el-table :data="rightFromData" style="width: 100%;" height="540"
                                :show-header="false" border>
                  <el-table-column class-name="table_cell1" align="center" width="100">
                    <template slot-scope="scope">
                      <div class="block">
                        <el-image style="width: 65%;"
                                  src="static/icon/img03/bigrain.jpg"></el-image>
                      </div>
                      <span class="demonstration">
                        <label v-if="scope.row.wgrade === 10101">
                          雨强>22 mm/hr
                        </label>
                        <label v-else-if="scope.row.wgrade === 10102">
                          12<雨强<22 mm/hr
                        </label>
                        <label v-else-if="scope.row.wgrade === 10103">
                          8<雨强<12 mm/hr
                        </label>
                        <label v-else-if="scope.row.wgrade === 10104">
                           4<雨强<8 mm/hr
                        </label>
                        <label v-else="scope.row.wgrade === 10104">
                           无
                        </label>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" class-name="table_cell2">
                    <template slot-scope="scope">
                      地点: {{scope.row.location}}
                      <br>
                      <label v-if="scope.row.wgrade === 10101">
                        灾强: 雨强 > 22 mm/hr
                      </label>
                      <label v-else-if="scope.row.wgrade === 10102">
                        灾强: 12< 雨强 < 22 mm/hr
                      </label>
                      <label v-else-if="scope.row.wgrade === 10103">
                        灾强: 8< 雨强 < 12 mm/hr
                      </label>
                      <label v-else-if="scope.row.wgrade === 10104">
                        灾强: 4< 雨强 < 8 mm/hr
                      </label>
                      <label v-else="scope.row.wgrade === 10104">
                        灾强: 无
                      </label>
                      <br>
                      灾害持续时长：2h
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row style="height: 40px">
                <el-pagination :page-size="20" layout="prev, pager, next" :total="1000"></el-pagination>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {sessionStorage} from 'src/assets/js/storage';
  import ElImage from 'element-ui/packages/image/src/main';
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group';
  import mapboxgl from 'mapbox-gl'
  import {getAll} from 'src/api/data/SweatherCarMain/index'
  import {formatDate} from 'src/api/data/showSystem/main';

  var map;
  var markers = {};
  export default {
    components: {
      ElRadioGroup,
      ElImage
    },
    created() {
      // this.checkAuth();
    },
    data() {
      return {
        polygonData: [
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '暴雨', color: 'rgb(50,89,34)', img: 'bigrain.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '大风', color: 'rgb(147,102,52)', img: 'bigwind.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '冰雹', color: 'rgb(96,44,108)', img: 'hail.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '台风', color: 'rgb(114,95,80)', img: 'typhoon.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '大雪', color: 'rgb(0,113,207)', img: 'bigsnow1.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '大雾', color: 'rgb(0,122,117)', img: 'bigfog1.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '沙尘', color: 'rgb(153,131,9)', img: 'sanddust.png'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, wgrade4Num: 0, polygonNum: 0, polygonName: '结冰', color: 'rgb(170,56,79)', img: 'freeze.png'}
        ],
        rightFromData: undefined,
        AutoUpdates: undefined,
        isdycupdate: false,
        menuRadio: ['1', '2', '3', '4', '5', '6', '7', '8'],
        menuOptions: [
          {label: '高精短时极端天气预报', value: 1},
          {label: '六小时极端天气预报', value: 2},
          {label: '十二小时极端天气预报', value: 3}
        ],
        data: 1,
        mapMode: undefined,
        // sider_menu_data: [
        //   {
        //     path: '/HPSWeather',
        //     title: '高精短时极端天气预报',
        //     icon: 'el-icon-adm-home'
        //   },
        //   {
        //     path: '/sixHoursWeather',
        //     title: '六小时极端天气预报',
        //     icon: 'el-icon-adm-home'
        //   },
        //   {
        //     path: '/twelveHoursWeather',
        //     title: '十二小时极端天气预报',
        //     icon: 'el-icon-adm-home'
        //   }
        // ],
        isCollapsed: false,
        adminMenuShow: false,
        updatetime: '2019年08月15日 16时00分',
        formInline: {wtype: null}
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
      this.init()
      this.initTime();
    },
    methods: {
      init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHd0aW1lcyIsImEiOiJjanl4c2tkdnYwenVuM210YXhjdGg3OTljIn0.4hACBWooh6zXxfUFoOo1jw'
        var imageURL = 'http://t0.tianditu.gov.cn/vec_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
          '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
        map = new mapboxgl.Map({
          container: this.$refs.basicMapbox,
          style: {
            'version': 8,
            'sources': {
              'raster-tiles': {
                'type': 'raster',
                'tiles': [imageURL],
                'tileSize': 256
              }
            },
            'layers': [{
              'id': 'simple-tiles',
              'type': 'raster',
              'source': 'raster-tiles',
              'minzoom': 0,
              'maxzoom': 18
            }
            ]
          },
          // style: 'mapbox://styles/mapbox/satellite-v9',
          center: [109.7863, 20.4306], // 设置地图中心
          zoom: 4 // 设置地图比例
        })
        this.getData()
      },
      initTime() {
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60 - 20 * 60 * 1000;
        this.updatetime = formatDate(new Date(time), 'yyyy年MM月dd日 hh时mm分')
      },
      getData() {
        let that = this;
        getAll(10100, 0).then(res => {
          that.resCallBack(res, 10100);
        });
        getAll(10200, 0).then(res => {
          that.resCallBack(res, 10200);
        })
      },
      resCallBack(res, code) {
        for (var i = 0; i < res.result.features.length; i++) {
          res.result.features[i].geometry = JSON.parse(res.result.features[i].geometry);
        }
        // 处理json对其进行分类
        var features = res.result.features;
        var wgradeArr = []; // 分级对照
        var dataArr = []; // 总的数据数组
        var dataArr1 = [] // 对应的分级数组
        var dataArr2 = [] // 对应的分级数组
        var dataArr3 = [] // 对应的分级数组
        var dataArr4 = [] // 对应的分级数组
        var iconname = null;
        var iconpath = null;
        var stops = null;
        var grades = [];
        switch (code) {
          case 10100:
            iconname = 'rain';
            iconpath = 'bigrain.jpg';
            stops = [
              [10101, '#6BC04B'], /* 不同的population的值绘制相应的填充颜色 */
              [10102, 'rgba(50,89,34,0)'],
              [10103, 'rgba(50,89,34,0)'],
              [10104, 'rgba(50,89,34,0)']
            ];
            grades = [10101, 10102, 10103];
            break;
          case 10200:
            iconname = 'dafeng';
            iconpath = 'bigwind.jpg';
            stops = [
              [10201, '#FFB35A'], /* 不同的population的值绘制相应的填充颜色 */
              [10202, 'rgba(147,102,52,0)'],
              [10203, 'rgba(147,102,52,0)'],
              [10204, 'rgba(147,102,52,0)']
            ];
            grades = [10201, 10202, 10203];
            break;
        }
        for (var j = 0; j < features.length; j++) {
          features[j].properties.icon = iconname;
          wgradeArr.push(features[j].properties.wgrade)
          // dataArr.push(features[j].properties)
        }
        var newfts = [];
        for (var m = 0; m < wgradeArr.length; m++) {
          if (wgradeArr[m] === grades[0]) {
            dataArr1.push(dataArr[m]);
            newfts.push(features[m]);
            dataArr.push(features[m].properties);
          } else if (wgradeArr[m] === grades[1]) {
            dataArr2.push(dataArr[m])
          } else if (wgradeArr[m] === grades[2]) {
            dataArr3.push(dataArr[m])
          } else {
            dataArr4.push(dataArr[m])
          }
        }
        res.result.features = newfts;
        switch (code) {
          case 10100:
            this.polygonData[0].wgrade1Num = dataArr1.length;
            this.polygonData[0].wgrade2Num = dataArr2.length;
            this.polygonData[0].wgrade3Num = dataArr3.length;
            this.polygonData[0].wgrade4Num = dataArr4.length;
            this.polygonData[0].polygonNum = wgradeArr.length;
            this.polygonData[0].polygonNum = dataArr1.length;
            break;
          case 10200:
            this.polygonData[1].wgrade1Num = dataArr1.length;
            this.polygonData[1].wgrade2Num = dataArr2.length;
            this.polygonData[1].wgrade3Num = dataArr3.length;
            this.polygonData[1].wgrade4Num = dataArr4.length;
            this.polygonData[1].polygonNum = wgradeArr.length;
            this.polygonData[1].polygonNum = dataArr1.length;
            break;
        }

        this.rightFromData = dataArr // 右侧列表数据来源
        if (map.getSource(iconname)) {
          map.removeLayer(iconname);
          map.removeLayer(iconname + 'icon');
          map.removeSource(iconname);
        }
        map.addSource(iconname, {
          'type': 'geojson',
          'data': res.result
        });
        map.addLayer({
          'id': iconname,
          'type': 'fill',
          'source': iconname,
          'layout': {},
          // 'maxzoom': 9,
          'paint': {
            'fill-color': {
              property: 'wgrade', /* 函数的输入来源，population属性值 */
              type: 'categorical',
              stops: stops
            },
            'fill-opacity': 0.6          /* 填充透明度 */
          }
        });
        map.loadImage('static/icon/img03/' + iconpath, function (error, image) {
          if (error) throw error;
          if (map.hasImage(iconname)) {
            map.removeImage(iconname)
          }
          map.addImage(iconname, image);
          map.addLayer({
            'id': iconname + 'icon',
            'type': 'symbol',
            'source': iconname,
            'layout': {
              'icon-image': '{icon}',
              'icon-size': 0.1
            },
            // 'maxzoom': 9,
            'paint': {}
          });
        })
      },
      toRain(param) {
        switch (param) {
          case 0:
            map.setPaintProperty('rain', 'fill-opacity', 0.6);
            break;
          case 1:
            // 点击一级显示所有一级面
            map.setPaintProperty('rain', 'fill-opacity', {
              property: 'wgrade', /* 函数的输入来源，population属性值 */
              type: 'categorical',
              stops: [/* Property function */
                [10101, 0.6], /* 不同的population的值绘制相应的填充颜色 */
                [10102, 0],
                [10103, 0],
                [10104, 0]
              ]
            });
            break;
          case 2:
            // 点击一级显示所有一级面
            map.setPaintProperty('rain', 'fill-opacity', {
              property: 'wgrade', /* 函数的输入来源，population属性值 */
              type: 'categorical',
              stops: [/* Property function */
                [10101, 0], /* 不同的population的值绘制相应的填充颜色 */
                [10102, 0.6],
                [10103, 0],
                [10104, 0]
              ]
            });
            break;
          case 3:
            // 点击一级显示所有一级面
            map.setPaintProperty('rain', 'fill-opacity', {
              property: 'wgrade', /* 函数的输入来源，population属性值 */
              type: 'categorical',
              stops: [/* Property function */
                [10101, 0], /* 不同的population的值绘制相应的填充颜色 */
                [10102, 0],
                [10103, 0.6],
                [10104, 0]
              ]
            });
            break;
          case 4:
            // 点击一级显示所有一级面
            map.setPaintProperty('rain', 'fill-opacity', {
              property: 'wgrade', /* 函数的输入来源，population属性值 */
              type: 'categorical',
              stops: [/* Property function */
                [10101, 0], /* 不同的population的值绘制相应的填充颜色 */
                [10102, 0],
                [10103, 0],
                [10104, 0.6]
              ]
            });
            break;
        }
      },
      toLocation(fid) {
        map.setPaintProperty('rain', 'fill-opacity', {
          property: 'fid', /* 函数的输入来源，population属性值 */
          type: 'categorical',
          stops: [/* Property function */
            [fid, 0.6] /* 不同的population的值绘制相应的填充颜色 */
          ],
          default: 0
        });
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
      dycChange() {
        this.isdycupdate = !this.isdycupdate;
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
    heihgt: $topbarHeight;
    line-height: $topbarHeight;
    padding: 0 24px 0 0;
    background-color: $topbarBackgroundColor;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
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
    padding: 16px;
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
  #w_type_id>>>.el-input__inner{background-color: rgba(0,0,0,0)!important;border: none;font-weight: bold;}
  #w_type_id>>>.el-select__caret{color: black!important;font-weight: bold;}
  #col_switch_id>>>.el-switch__label *{font-size: 18px}
  .div_layer_icon{
    float: right;
    width: 30px;
    height: 30px;
    margin: 5px;
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: center center
  }
  .wgrade_lb{width: 70px; display: inline-block;text-align: center}
  .top_card>>>.el-card__body{padding: 5px}
  .top_card{

    background-repeat: no-repeat;
    background-position: left center;
    background-position: 21px 5px;
    background-size: 23%;
  }
  >>>.table_cell1{
    border: none;
    padding: 5px 0;
    font-size: 5px;
  }
  >>>.table_cell2{
    border: 1px solid silver;
    padding: 5px 0;
  }
  >>>.el-table__body{
    border-spacing:0px 5px;
    padding-right: 10px;
  }
  >>>.cell{
    white-space: nowrap!important;
  }
  .legend_box {
    background-color: rgba(0,0,0,0);
    border: none;
  }
</style>
