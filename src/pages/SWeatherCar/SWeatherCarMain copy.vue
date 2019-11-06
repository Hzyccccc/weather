<template>
  <div class="layout">
    <div class="top_div">
      <div
        style="height:81px;width: 100%;z-index: -100;background-image: url('static/icon/img03/title.jpg');line-height: 82px">
        <el-image
          style="width: 135px; display: inline-block; vertical-align: top;margin: 0px 2.5%"
          src="static/icon/white_bottom_logo.png"
        ></el-image>
        <label style="font-size: 31px;color: white">四维智联创新应用展示中心</label>
         <ul style="display: inline-block;float: right;margin: 0 35px;color:#fff;font-size:26px">
          <li v-if="user" @click="exit" class="user-icon" style="padding: 0;cursor:pointer;">
            <el-dropdown
              :show-timeout="10"
              :hide-timeout="10"
              @command="handleCommand"
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
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}" style="background-color: rgb(212, 217, 223);padding-top: 6px;margin-top: 81px">
        <div class="logo-wrapper" style="background-color: rgb(16,118,180);padding-top: 6px;height: 60px">
          <div @click="$router.replace('/')" style="font-size: large;font-weight: bold;margin: 5px 10px;color: white;
        background-image: url('static/icon/bad_weather_logo.png'); background-size: contain; cursor: pointer;
        background-repeat: no-repeat; line-height: 23px; text-align: right">
            <p>极端天气</p>
            <p>车辆预警系统</p>
          </div>
        </div>
        <div style="position: absolute;top: 75px;width: 100%;bottom: 0;">
          <el-collapse accordion v-model="activeNames">
            <el-collapse-item v-for="(itm, idx) in sideWeather" :key="idx" :name="itm.type">
              <template slot="title">
                <el-checkbox v-model="itm.flag"  :data="itm.label" @change="adverseChange(itm.flag,itm.label)" style="margin: 0 0 0 10px;"></el-checkbox>
                <!--<i v-if="isSideWeather(itm.type)" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/weather/${itm.img1})`}"></i>-->
                <i v-if="wCity[itm.type].length > 0" class="div_layer_icon el-icon-close"
                   :style="{'background-image': `url(static/icon/weather/${itm.img1})`}"></i>
                <i v-else class="div_layer_icon el-icon-close"
                   :style="{'background-image': `url(static/icon/weather/${itm.img2})`}"></i>
                <span>{{itm.label}}</span>
              </template>
              <el-tree
                :data="wCity[itm.type]"
                accordion :expand-on-click-node="false"
                @node-click="handleNodeClick">
              </el-tree>
              <!--<el-tree-->
              <!--:data="wCity[itm.type]"-->
              <!--accordion :expand-on-click-node="false"-->
              <!--@node-click="linkClick">-->
              <!--</el-tree>-->
            </el-collapse-item>
          </el-collapse>
      </div>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}" style="top: 0px;overflow-x: auto;background-color: white;margin-top: 81px">
      <el-row :gutter="20" style="min-width: 100%;margin-left: 0px; overflow:hidden">
        <div style="margin: 10px 0 0 0px;width: 140px;display: inline-block">
          <el-card style="background-color: rgba(242,242,242);text-align: center;" class="top_card">
            <p style="font-size: 30px;font-weight: 700;padding: 12px 0px;">{{currtTime}}</p>
            <p>{{currtDate}}</p>
          </el-card>
        </div>
        <div style="display: inline-block;width: 140px">
          <el-card style="background-color: rgba(242,242,242);text-align: center;width: 140px" class="top_card">
            <p style="font-size: 30px;font-weight: 700;padding: 12px 0px;">{{sumWeather()}}</p>
            <p style="font-size: 13px">全国受天气影响车辆</p>
          </el-card>
        </div>
        <div style="display: inline-block;position: absolute; top: 0;left: 300px;right: 0;overflow:hidden">
          <el-row :gutter="10" style="padding: 10px 0; overflow:hidden">
            <el-col :span="3" v-for="(itm, idx) in polygonData" :key="idx" style="min-width: 170px">
              <div class="top_card" style="margin-right: 0;padding-left: 55px;white-space: nowrap; margin-bottom:10px"
                   :style="{'background-image': itm.polygonNum>0?'url(static/icon/weather/' + itm.img + '.png)':'url(static/icon/weather/' + itm.img + '_gray.png)'}">
                <div style="height: 85px;padding-left: 0;padding-right: 0">
                  <p class="p_wgrade_lb" style="font-size: 14px"><label class="wgrade_lb">总预警量:</label>{{itm.polygonNum}}
                  </p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">红色一级:</label>{{itm.wgrade1Num}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">橙色一级:</label>{{itm.wgrade2Num}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">橙色二级:</label>{{itm.wgrade3Num}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </div>

    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}"
         style="margin-top: 129px">
      <div class="content">
        <el-row style="position: absolute; top: 15px;left: 0; right: 0; bottom: 0" :gutter="20">
          <el-col :span="20" style="height: 100%;position: relative">
            <div ref="basicMapbox" style="height: 100%;"></div>
            <city-select style="top: 10px;" @tocity="tocity($event)"></city-select>
          </el-col>
          <el-col :span="4" style="border: 1px solid silver;height: 100%;overflow: hidden;position: relative;padding: 0"
                  id="dataList">
            <el-row style="height: 30px;text-align: center;">
              <el-button type="primary" plain @click="notifyAll" size="mini" style="width: 100%;">一键通知</el-button>
            </el-row>
            <el-row style="position: absolute;top: 30px;bottom: 0;right: 0;left: 0">
              <el-scrollbar style="height: 100%">
                <el-table :data="rightFromDataCar" style="width: 100%;height: 100%;overflow: auto"
                          :show-header="false" border>
                  <el-table-column prop="name" class-name="table_cell2">
                    <template slot-scope="scope">
                      <div @click="changeCarPoint(scope.row)">
                        品牌: {{scope.row.brand}}
                        <br>
                        车牌: {{scope.row.carNumber}}
                        <br>
                        车主: {{scope.row.carPersonName}}
                        <!--车主: 王先生-->
                        <br>
                        联系方式：{{scope.row.randomCarNumber}}
                        <!--联系方式：138*******4578-->
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import mapboxgl from 'mapbox-gl'
  import {sessionStorage} from 'src/assets/js/storage';
  import ElImage from 'element-ui/packages/image/src/main';
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group';
  import {formatDate} from 'src/api/data/showSystem/main';
  import {map, loadMap, getFeature, getFeatureCity} from 'src/api/data/SweatherCarMain/sweatherCar';
  import cities from 'src/data/city_center2.json';
  import CitySelect from '../home/cityselect';

  var carSize = null;
  export default {
    components: {
      CitySelect,
      ElRadioGroup,
      ElImage
    },
    created() {
    },
    data() {
      return {
        data: undefined,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rightFromDataCar: [],
        AutoUpdates: undefined,
        isdycupdate: false,
        menuRadio: ['1', '2', '3', '4', '5', '6', '7', '8'],
        isCollapsed: false,
        updatetime: '2019年08月15日 16时00分',
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
          {'type': 'rain', 'label': '强雨', 'img1': 'bigrain1.png', 'img2': 'bigrain2.png',flag: true},
          {'type': 'wind', 'label': '强风', 'img1': 'bigwind1.png', 'img2': 'bigwind2.png',flag: true},
          {'type': 'hail', 'label': '冰雹', 'img1': 'hail1.png', 'img2': 'hail2.png',flag: true},
          {'type': 'snow', 'label': '强雪', 'img1': 'bigsnow1.png', 'img2': 'bigsnow2.png'},
          {'type': 'fog', 'label': '大雾', 'img1': 'bigfog1.png', 'img2': 'bigfog2.png'},
          {'type': 'sanddust', 'label': '沙尘', 'img1': 'sanddust1.png', 'img2': 'sanddust2.png'},
          {'type': 'freeze', 'label': '道路结冰', 'img1': 'freeze1.png', 'img2': 'freeze2.png'}
        ],
        sumCar: 0,
        tname: null,
        releaseTime: null,
        currtDate: null,
        currtTime: null,
        activeNames: 'rain',
        occurTime: true,
        regionCode: 1,
        wtype: 10100,
        rightFromDataCarFB: undefined,
        timer: null,
        value: [true, true, true],
        id: ['强雨', '强风', '冰雹']
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
      this.timer = setInterval(this.initTime, 1000);
      // this.getRegionData();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    methods: {
      adverseChange(value, id) {
        switch (id) {
          case '强雨':
            if (value && id === '强雨') {
              this.value[0] = value;
              this.id[0] = id;
              console.log(222);
              getFeature(10800, this);
              return
            } else {
              this.value[0] = '';
              this.id[0] = '';
              this.rightFromDataCar.forEach((v, i) => {
                if (v.objectType === 10800) {
                  delete this.rightFromDataCar[i]
                }
              });
              this.rightFromDataCarFB.forEach((v, i) => {
                if (v.objectType === 10800) {
                  delete this.rightFromDataCarFB[i]
                }
              });
              if (document.getElementById('weather_div')) {
                document.getElementById('weather_div').remove()
              }
              if (map.getSource('rain')) {
                map.removeLayer('rain');
                map.removeLayer('PolygonContent1');
                map.removeLayer('rain' + 'icon');
                map.removeSource('rain');
                console.log(266);
              }
              if (map.getLayer('rainPointId')) {
                map.removeLayer('rainPointId');
              }

              if (map.hasImage('rain')) {
                map.removeImage('rain1');
                map.removeImage('rain2');
                map.removeImage('rain3')
              }
              this.polygonData[0].wgrade1Num = 0;
              this.polygonData[0].wgrade2Num = 0;
              this.polygonData[0].wgrade3Num = 0;
              this.polygonData[0].polygonNum = 0;

              return
            }
            break;
          case '强风':
            if (value && id === '强风') {
              console.log(444);
              getFeature(10900, this);
              this.value[1] = value;
              this.id[1] = id;
              return
            } else {
              this.value[1] = '';
              this.id[1] = '';

              if (map.getLayer('windPointId')) {
                map.removeLayer('windPointId');
              }
              if (map.getSource('wind')) {
                map.removeLayer('wind');
                map.removeLayer('PolygonContent2');
                map.removeLayer('wind' + 'icon');
                map.removeSource('wind');
              }
              if (map.hasImage('wind1')) {
                map.removeImage('wind1')
                map.removeImage('wind2')
                map.removeImage('wind3')
              }
              this.polygonData[1].wgrade1Num = 0;
              this.polygonData[1].wgrade2Num = 0;
              this.polygonData[1].wgrade3Num = 0;
              this.polygonData[1].polygonNum = 0;
              this.rightFromDataCar.forEach((v, i) => {
                if (v.objectType === 10900) {
                  delete this.rightFromDataCar[i]
                }
              });
              this.rightFromDataCarFB.forEach((v, i) => {
                if (v.objectType === 10900) {
                  delete this.rightFromDataCarFB[i]
                }
              });
              return
            }
            break;
          case '冰雹':
            if (value && id === '冰雹') {
              getFeature(11000, this);
              this.value[2] = value;
              this.id[2] = id;
              return
            } else {
              this.value[2] = value;
              this.id[2] = id;
              if (map.getSource('hail')) {
                map.removeLayer('hail');
                map.removeLayer('PolygonContent3');
                map.removeLayer('hail' + 'icon');
                map.removeSource('hail');
              }
              if (map.getLayer('hailPointId')) {
                map.removeLayer('hailPointId');
              }
              if (map.hasImage('hail')) {
                map.removeImage('hail1');
                map.removeImage('hail2');
                map.removeImage('hail3');
              }
              this.polygonData[2].wgrade1Num = 0;
              this.polygonData[2].wgrade2Num = 0;
              this.polygonData[2].wgrade3Num = 0;
              this.polygonData[2].polygonNum = 0;
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === 11000) {
                  delete this.rightFromDataCar[i]
                }
              });
              this.rightFromDataCarFB.forEach((v, i) => {
                if (v.objectType === 11000) {
                  delete this.rightFromDataCarFB[i]
                }
              });
              return
            }
            break;
          // case "强雪":
          //   if (value && id === "强雪") {
          //     console.log(444);
          //     return
          //   } else {
          //     console.log(555);
          //     return
          //   }
          //   break;
          // case "大雾":
          //   if (value && id === "大雾") {
          //     console.log(444);
          //     return
          //   } else {
          //     console.log(555);
          //     return
          //   }
          //   break;
          // case "沙尘":
          //   if (value && id === "沙尘") {
          //     console.log(444);
          //     return
          //   } else {
          //     console.log(555);
          //     return
          //   }
          //   break;
          // case "道路结冰":
          //   if (value && id === "道路结冰") {
          //     console.log(444);
          //     return
          //   } else {
          //     console.log(555);
          //     return
          //   }
          //   break;
        }
        console.log(id);
      },
      init() {
        loadMap(this);
        this.getData();
      },
      initTime() {
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60 - 20 * 60 * 1000;
        let rdd = new Date(time);
        this.updatetime = formatDate(rdd, 'hh:mm:ss');
        this.tname = formatDate(rdd, 'yyMMdd');
        this.tname = '190909';
        this.releaseTime = formatDate(date, 'yyyy-MM-dd hh:mm') + ':00';
        this.currtDate = formatDate(date, 'yyyy/MM/dd');
        this.currtTime = formatDate(date, 'hh:mm');
        this.releaseTime = '2019-09-09 13:40:00';
      },
      getData() {
        getFeature(10800, this);
        getFeature(10900, this);
        getFeature(11000, this);
        getFeatureCity(10800, this);
        getFeatureCity(10900, this);
        getFeatureCity(11000, this);
      },

      // 点击车牌
      changeCarPoint(data) {
        // map.fitBounds([[360, 180], [data.lon, data.lat]]);
        if (document.getElementById('weather_div')) {
          document.getElementById('weather_div').remove()
        }
        map.flyTo({'center': [data.lon, data.lat], 'zoom': 13});
        let weather = [data.lon, data.lat];
        let div = document.createElement('div');
        div.id = 'weather_div';
        div.className = 'weather_div';
        div.style.backgroundImage = `url('http://106.15.202.31/test/0.3s.gif')`;
        // div.style.backgroundImage = `url('http://106.15.202.31/test/car1.png')`;
        div.style.backgroundSize = '40px 40px';
        div.style.visibility = 'visible';
        div.style.width = '40px';
        div.style.height = '40px';
        var marker = new mapboxgl.Marker(div);
        marker.setLngLat(weather).addTo(map);
      },

      // 点击树
      handleNodeClick(data) {
        var cityCarNumberInfo = [];
        var num = 0;
        if (data.label === '全国') {
          map.flyTo({'center': [116.405285, 39.904989], 'zoom': 3});
        }
        // 省级跳转
        if (data.id === 1) {
          let id = JSON.stringify(parseInt(data.proCode));
          // 显示对应车牌信息
          for (var j = 0; j < this.rightFromDataCarFB.length; j++) {
            if (this.rightFromDataCarFB[j].proCode === data.proCode) {
              this.rightFromDataCarFB[j].brand = this.rightFromDataCarFB[j].brand.charAt(0) + '****' + this.rightFromDataCarFB[j].brand.charAt(this.rightFromDataCarFB[j].brand.length - 1)
              this.rightFromDataCarFB[j].carNumber = this.rightFromDataCarFB[j].carNumber.charAt(0) + '****' + this.rightFromDataCarFB[j].carNumber.charAt(this.rightFromDataCarFB[j].carNumber.length - 1)
              cityCarNumberInfo[num] = this.rightFromDataCarFB[j];
              num++;
            }
          }
          this.rightFromDataCar = cityCarNumberInfo;
          map.fitBounds(cities[id].center);
        }
        if (data.id === 2) {
          let id = JSON.stringify(parseInt(data.cityCode));
          // 显示对应车牌信息
          var maxX = 0;
          var minX = 9999;
          var maxY = 0;
          var minY = 9999;
          for (var i = 0; i < this.rightFromDataCarFB.length; i++) {
            if (this.rightFromDataCarFB[i].cityCode === data.cityCode) {
              this.rightFromDataCarFB[i].brand = this.rightFromDataCarFB[i].brand.charAt(0) + '****' + this.rightFromDataCarFB[i].brand.charAt(this.rightFromDataCarFB[i].brand.length - 1)
              this.rightFromDataCarFB[i].carNumber = this.rightFromDataCarFB[i].carNumber.charAt(0) + '****' + this.rightFromDataCarFB[i].carNumber.charAt(this.rightFromDataCarFB[i].carNumber.length - 1)
              cityCarNumberInfo[num] = this.rightFromDataCarFB[i]
              if (maxX < this.rightFromDataCarFB[i].lon) {
                maxX = this.rightFromDataCarFB[i].lon
              }
              if (minX > this.rightFromDataCarFB[i].lon) {
                minX = this.rightFromDataCarFB[i].lon
              }
              if (maxY < this.rightFromDataCarFB[i].lat) {
                maxY = this.rightFromDataCarFB[i].lat
              }
              if (minY > this.rightFromDataCarFB[i].lat) {
                minY = this.rightFromDataCarFB[i].lat
              }
              num++;
            }
          }
          console.log(maxX, minX, maxY, minY)
          // var center = [
          //   [
          //     minX,
          //     minY
          //   ],
          //   [
          //     maxX,
          //     maxY
          //   ]
          // ]
          var center = [(minX + maxX) / 2, (minY + maxY) / 2]
          this.rightFromDataCar = cityCarNumberInfo;
          // console.log('点击跳转')
          // map.flyTo({'center': center, 'zoom': 9});
          // console.log('点击跳转成功')
          map.fitBounds(cities[id].center);
          // map.setMaxZoom(11)
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
      // 求汽车总和
      sumWeather() {
        let sum = 0;
        this.polygonData.forEach((itm, idx) => {
          sum += itm.polygonNum;
        });
        return sum;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.axios.get(`/aicLogin/aicLoginExit?userId=${this.$store.state.user.userId}`).then(res => {
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
      // linkClick(id) {
      //   map.jumpTo({'center': cities[id].center, 'zoom': 8});
      // },
      tocity(e) {
        if (e.length < 3) {
          map.jumpTo({'center': e, 'zoom': 10});
        } else {
          map.jumpTo({'center': e.slice(0, 2), 'zoom': 3});
        }
      },
      // 通知按钮
      notifyAll() {
        this.$message({
          message: '通知成功！',
          type: 'waring'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

  .mapboxgl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }

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

  &
  :not(.el-menu--collapse) {
    overflow-y: auto;
    overflow-x: hidden;
  }

  i {
    color: #FFFFFF;
  }

  .menu-item {

  &
  .is-active,

  &
  :hover {
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

  &
  :hover {
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
    font-size: 5px;
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
    padding-right: 10px;
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
    font: 14px/1.5 sans-serif;
  }
  .popup-win-img {
    background-repeat: no-repeat;
    background-size: contain;
    white-space: nowrap;
    padding-top: 36px;
    width: 50px;
    height: 72px;
    overflow: hidden;
    line-height: 3;
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


