<template>
  <div class='index'>
    <el-card>
      <div style='display: flex;border-bottom: 2px grey solid'>
        <div class='top_block' style='margin-right: 22%'>
          接入车辆数：<span class='top_num'>3,103,091</span>
        </div>
        <div class='top_block' style='margin-right: 22%'>
          今日受影响车辆数：<span class='top_num'>3,103,091</span>
        </div>
        <div class='top_block' style='margin-bottom: 2%'>
          已通知车辆数：<span class='top_num'>3,103,091</span>
        </div>
      </div>
      <br/><br/>
      <row :gutter='20'>
        <el-col :span='8'>
          <div class='bg-purple-light'>
            <label style='font-weight: bold;font-size: large'>受恶劣天气影响列表:</label><br/><br/>
            省份：
            <el-select v-model='brandId' class='select_div'>
              <el-option
                v-for='(item,index) in brandList'
                :key='index'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
            城市：
            <el-select v-model='brandId' class='select_div'>
              <el-option
                v-for='(item,index) in brandList'
                :key='index'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
            区/县：
            <el-select v-model='brandId' class='select_div'>
              <el-option
                v-for='(item,index) in brandList'
                :key='index'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
            <br/><br/>
            天气情况：
            <el-select v-model='brandId' class='select_div'>
              <el-option
                v-for='(item,index) in brandList'
                :key='index'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
            车辆品牌：
            <el-select v-model='brandId' class='select_div'>
              <el-option
                v-for='(item,index) in brandList'
                :key='index'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
            <el-button type='primary' style='margin-left: 1%'>查询</el-button>
            <br/><br/>
            <div style='height: 500px;border: 1px  solid black'>

            </div>
          </div>
        </el-col>
        <el-col :span='15' :offset='1' style='height:620px '>
          <label style='font-weight: bold;font-size: large'>今日受灾区域分布:</label><br/><br/>
          <div ref='distriMapbox' style='height:100%;width:100%;'></div>
        </el-col>
      </row>
    </el-card>
  </div>
</template>
<script>
  import mapboxgl from 'mapbox-gl'
  import MapboxLanguage from '@mapbox/mapbox-gl-language'
  import PolygonData from 'src/data/scw_v2_20180806_1020.json'
  import pointData from 'src/data/scw_car_20180806_1020'

  var map;
  export default {
    data() {
      return {
        brandList: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }],
        brandId: undefined,
        bannerImg: require('src/data/car.png')
      }
    },
    mounted() {
      this.init()
    },
    destroyed() {
      map.remove()
    },
    methods: {
      // 加载点图层
      addPoints() {
        map.removeLayer('PolygonContent')
        map.loadImage('http://106.15.202.31/test/car.png', function (error, image) {
          if (error) throw error;
          map.addImage('car', image);
          map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'pointData',
            'layout': {
              'icon-image': 'car',
              'icon-size': 1,
              'text-field': '{label}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.6],
              'text-anchor': 'top'
            }
          });
        })
      },
      // 加载点总数图层
      addPolynContent() {
        map.removeLayer('points')
        map.removeImage('location')
        map.loadImage('http://106.15.202.31/test/location.png', function (error, image) {
          if (error) throw error;
          map.addImage('location', image);
          map.addLayer({
            'id': 'PolygonContent',
            'type': 'symbol',
            'source': 'PolygonData',
            'layout': {
              'icon-image': 'location',
              'icon-size': 0.5,
              'icon-anchor': 'bottom',
              'text-field': '{count}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              // 'text-color': 'yellow',
              'text-offset': [0, -1.4],
              'text-size': 11,
              'text-anchor': 'bottom'
            }
          });
        })
      },
      // 初始化
      init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHd0aW1lcyIsImEiOiJjanl4c2tkdnYwenVuM210YXhjdGg3OTljIn0.4hACBWooh6zXxfUFoOo1jw'
        var imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
          '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
        map = new mapboxgl.Map({
          container: this.$refs.distriMapbox,
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
          center: [116.3975298068, 39.9176060416], // 设置地图中心
          zoom: 4// 设置地图比例
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
          zoom: 5
        }))
        var that = this
        var pointNum = 0;
        var polynCountNum = 0;
        // 地图平移完成时，去掉旧图层，刷新新图层
        // map.on('moveend', function () {
        //   map.removeLayer('mapGeoLayer')
        //   map.removeSource('states')
        //   that.getBounds();
        //   that.getAll();
        // })
        // 地图缩放完成时，去掉旧图层，刷新新图层
        map.on('zoomend', function (res) {
          console.log(map.getZoom())
          if (map.getZoom() >= 4) {
            // 代表第一次加载点
            if (pointNum === 0) {
              that.addPoints()
            }
            pointNum++
            polynCountNum = 0
          }
          if (map.getZoom() < 4) {
            if (polynCountNum === 0) {
              that.addPolynContent()
            }
            polynCountNum++
            pointNum = 0
          }

          // map.removeLayer('mapGeoLayer')
          // map.removeSource('states')
        })
        map.on('load', function () {
          // 声明geo
          map.addSource('PolygonData', {
            'type': 'geojson',
            'data': PolygonData
          });
          map.addSource('pointData', {
            'type': 'geojson',
            'data': pointData
          });
          // 添加geo图层
          map.addLayer({
            'id': 'mapDistributionLayer',
            'type': 'fill',
            'source': 'PolygonData',
            'layout': {},
            'paint': {
              'fill-color': {
                property: 'wtype', /* 函数的输入来源，population属性值 */
                type: 'categorical',
                stops: [/* Property function */
                  ['rain', '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
                  ['rain_wind', '#7B68EE'],
                  ['wind', '#00FFFF']
                ]
              },
              'fill-opacity': 0.3           /* 填充透明度 */
            }
          })
          map.loadImage('http://106.15.202.31/test/location.png', function (error, image) {
            if (error) throw error;
            map.addImage('location', image);
            map.addLayer({
              'id': 'PolygonContent',
              'type': 'symbol',
              'source': 'PolygonData',
              'layout': {
                'icon-image': 'location',
                'icon-size': 0.5,
                'icon-anchor': 'bottom',
                'text-field': '{count}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                // 'text-color': 'yellow',
                'text-offset': [0, -1.4],
                'text-size': 11,
                'text-anchor': 'bottom'
              }
            });
          })
        });
        map.on('click', 'PolygonContent', function (e) {
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('车辆数:' + e.features[0].properties.count)
            .addTo(map);
        });
      }
    },
    computed: {}
  };
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

  .top_num {
    font-weight: bold;
    font-size: xx-large;
  }

  .index {
    margin-top: 2%;
  }

  .top_block {
    background-color: grey;
    width: 22%;
    height: 100px;
    text-align: center;
    line-height: 100px;
  }

  .select_div {
    width: 20%;
    margin-right: 1%;
  }

  .bg-purple-light {
    background: #ffffff;
  }
</style>
