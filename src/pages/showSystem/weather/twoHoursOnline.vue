<template>
  <div style='height:100%;width:100%;position: absolute;'>
    <div ref='basicMapbox' style='height:100%;width:100%;z-index: 1000'></div>
    <div class="check_div">
      <el-radio-group v-model="getAllForm.typeCode" @change="checkChange('type')">
        <el-radio :label="1"><span class="radio_text">降雨量</span></el-radio>
        <el-radio :label="2"><span class="radio_text">雷达反射强度</span></el-radio>
        <el-radio :label="3"><span class="radio_text">相态</span></el-radio>
        <el-radio :label="4"><span class="radio_text">风</span></el-radio>
      </el-radio-group>
    </div>
    <div class="version_div">
      <el-radio-group v-model="getAllForm.vCode" @change="checkChange" v-for="(item,index) in vArr" :key="index">
        <el-radio :label="index"><span class="radio_text" style="margin-right: 10px">{{item}}</span></el-radio>
      </el-radio-group>
    </div>
    <div class="map_color_pillars">
      <label class="max">max: {{max}}</label>
      <label class="min">min: {{min}}</label>
    </div>
    <!--<pre id='info'></pre>-->
    <!-- <pre id='coordinates' class='coordinates'></pre> -->
  </div>
</template>
<script>
  import mapboxgl from 'mapbox-gl'
  import MapboxLanguage from '@mapbox/mapbox-gl-language'
  import {getRealTimeData} from 'src/api/data/showSystem/ncRealtime/index'
  import ElRadio from 'element-ui/packages/radio/src/radio';

  var map;
  var y0 = 53.56064;
  var x0 = 73.446307;
  var pointList = [];
  export default {
    components: {ElRadio},
    data() {
      return {
        max: 8,
        min: 0,
        getAllForm: {
          currentpage: 1,
          pagesize: 180000,
          startCid: undefined,
          startRid: undefined,
          endCid: undefined,
          endRid: undefined,
          typeCode: 2,
          vCode: 0
        },
        pages: undefined,
        vArr: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      getAll(obj) {
        // 只有当不是zoom移动情况下的版本列表刷新
        if (obj !== 'zoomMove') {
          // 初始化v版本列表
          var length;
          if (this.getAllForm.typeCode === 1 || this.getAllForm.typeCode === 2) {
            length = 24
          } else if (this.getAllForm.typeCode === 3) {
            length = 4
          } else {
            length = 3
          }
          for (var i = 0; i < length; i++) {
            this.vArr.push('v' + i);
          }
        }
        getRealTimeData(this.getAllForm).then(res => {
          if (res.code === 0) {
            pointList = res.result.list
            this.pages = res.result.pages;
            var geoJson = {
              'type': 'FeatureCollection',
              'features': []
            }
            // 存储geo
            for (var i = 0; i < pointList.length; i++) {
              var UV0 = null
              var rid = pointList[i].rid;
              var cid = pointList[i].cid;
              var crV0 = pointList[i].crV0;
              var uVo = pointList[i].uV0;
              var vV0 = pointList[i].vV0;
              var mqfV0 = pointList[i].mqfV0;
              var phV0 = pointList[i].phV0;
              if (uVo !== null) {
                // u v平方和开方
                UV0 = Math.sqrt(Math.pow(uVo, 2) + Math.pow(vV0, 2))
              }
              var xLeftTop = x0 + ((cid) * 0.01)
              var yLeftTop = y0 - ((rid) * 0.01)
              var xRightBottom = x0 + ((cid + 1) * 0.01)
              var yRightBottom = y0 - ((rid + 1) * 0.01)
              var LeftTop = [xLeftTop, yLeftTop]
              var leftBottom = [xRightBottom, yLeftTop]
              var RightTop = [xLeftTop, yRightBottom]
              var RightBottom = [xRightBottom, yRightBottom]
              geoJson.features.push({
                'type': 'Feature',
                'geometry': {'type': 'Polygon', 'coordinates': [[LeftTop, RightTop, RightBottom, leftBottom, LeftTop]]},
                'properties': {
                  'crV0': Math.floor(crV0 / 10),
                  'mqfV0': mqfV0,
                  'phV0': phV0,
                  'UV0': UV0
                },
                'id': i
              })
            }
            console.log(geoJson)
            // 声明geo
            map.addSource('states', {
              'type': 'geojson',
              'data': geoJson
            });
            switch (this.getAllForm.typeCode) {
              case 1:
                // 添加geo图层
                map.addLayer({
                  'id': 'mapGeoLayer',
                  'type': 'fill',
                  'source': 'states',
                  'layout': {},
                  'paint': {
                    'fill-color': {
                      property: 'mqfV0', /* 函数的输入来源，population属性值 */
                      stops: [/* Property function */
                        [0, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
                        [1, '#CA8323'],
                        [2, '#723122']
                      ]
                    },
                    'fill-opacity': 0.35           /* 填充透明度 */
                  }
                })
                this.max = 2
                this.min = 0
                break;
              case 2:
                // 添加geo图层
                map.addLayer({
                  'id': 'mapGeoLayer',
                  'type': 'fill',
                  'source': 'states',
                  'layout': {},
                  'paint': {
                    'fill-color': {
                      property: 'crV0', /* 函数的输入来源，population属性值 */
                      stops: [/* Property function */
                        [0, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
                        [1, '#EED322'],
                        [2, '#E6B71E'],
                        [3, '#DA9C20'],
                        [4, '#CA8323'],
                        [5, '#B86B25'],
                        [6, '#A25626'],
                        [7, '#8B4225'],
                        [8, '#723122']
                      ]
                    },
                    'fill-opacity': 0.75           /* 填充透明度 */
                  }
                })
                this.max = 8
                this.min = 0
                break;
              case 3:
                // 添加geo图层
                map.addLayer({
                  'id': 'mapGeoLayer',
                  'type': 'fill',
                  'source': 'states',
                  'layout': {},
                  'paint': {
                    'fill-color': {
                      property: 'phV0', /* 函数的输入来源，population属性值 */
                      stops: [/* Property function */
                        [1, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
                        [2, '#B86B25'],
                        [3, '#723122']
                      ]
                    },
                    'fill-opacity': 0.35           /* 填充透明度 */
                  }
                })
                this.max = 3
                this.min = 1
                break;
              case 4:
                // 添加geo图层
                map.addLayer({
                  'id': 'mapGeoLayer',
                  'type': 'fill',
                  'source': 'states',
                  'layout': {},
                  'paint': {
                    'fill-color': {
                      property: 'UV0', /* 函数的输入来源，population属性值 */
                      stops: [/* Property function */
                        [200, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
                        [400, '#EED322'],
                        [600, '#E6B71E'],
                        [800, '#DA9C20'],
                        [1000, '#CA8323'],
                        [1200, '#B86B25'],
                        [1400, '#A25626'],
                        [1600, '#8B4225'],
                        [1800, '#723122']
                      ]
                    },
                    'fill-opacity': 0.75           /* 填充透明度 */
                  }
                })
                this.max = 1800
                this.min = 0
                break;
            }
            if (this.getAllForm.currentpage < this.pages) {
              this.getAllForm.currentpage++;
              this.getAll()
            } else {
              this.getAllForm.currentpage = 1
            }
          }
        })
      },
      // zoomMend() {
      //   var zoom = map.getZoom();
      //   if (zoom >= 8) {
      //     this.pointList = undefined
      //     var a = map.getOverlays();
      //     map.clearOverLays();
      //     a = [];
      //     this.getBounds()
      //     this.getAll()
      //   }
      // },
      // 初始化
      init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHd0aW1lcyIsImEiOiJjanl4c2tkdnYwenVuM210YXhjdGg3OTljIn0.4hACBWooh6zXxfUFoOo1jw'
        var imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
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
            ],
            'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
          },
          // style: 'mapbox://styles/mapbox/satellite-v9',
          center: [114.3170116505, 30.5310568266], // 设置地图中心
          zoom: 8 // 设置地图比例
        })
        // 设置语言
        var language = new MapboxLanguage({defaultLanguage: 'zh'});
        map.addControl(language);
        // 使用定位模块
        map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserLocation: true,
          zoom: 14
        }))
        var that = this
        // 地图平移完成时，去掉旧图层，刷新新图层
        // map.on('moveend', function () {
        //   map.removeLayer('mapGeoLayer')
        //   map.removeSource('states')
        //   that.getBounds();
        //   that.getAll();
        // })
        // 地图缩放完成时，去掉旧图层，刷新新图层
        map.on('zoomend', function (res) {
          map.removeLayer('mapGeoLayer')
          map.removeSource('states')
          that.getBounds();
          that.getAll('zoomMove');
        })
        this.getBounds();
        this.getAll();
        setInterval(function () {
          // 每隔五分钟，版本号自动跟新
          if (that.getAllForm.vCode === that.vArr.length - 1) {
            // 循环到最后一个版本，重置继续循环
            that.getAllForm.vCode = 0;
          } else {
            that.getAllForm.vCode++;
          }
          that.checkChange()
        }, 30000)
      },
      getBounds() {
        // 获取当前视距的数据范围
        var startY = map.getBounds()._ne.lat
        var startX = map.getBounds()._sw.lng
        var endY = map.getBounds()._sw.lat
        var endX = map.getBounds()._ne.lng
        this.getAllForm.startRid = Math.floor((y0 - startY) / 0.01)
        this.getAllForm.startCid = Math.floor((startX - x0) / 0.01)
        this.getAllForm.endRid = Math.floor((y0 - endY) / 0.01)
        this.getAllForm.endCid = Math.floor((endX - x0) / 0.01)
      },
      checkChange(param) {
        // 置空版本数组和版本号
        this.vArr = []
        // 更换展示项目时 重置版本值
        if (param === 'type') {
          this.getAllForm.vCode = 0
        }
        // 先移除图层，再请求新的数据
        map.removeLayer('mapGeoLayer')
        map.removeSource('states')
        this.getAll()
      }
    },
    computed: {}
  }
</script>
<style>
  @import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css');

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
    top: 30px;
    left: 30px;
    position: absolute;
    z-index: 9999;
  }

  .version_div {
    width: 600px;
    height: 20px;
    top: 30px;
    right: 30px;
    position: absolute;
    z-index: 9999;
  }

  .radio_text {
    color: white;
  }

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

</style>
