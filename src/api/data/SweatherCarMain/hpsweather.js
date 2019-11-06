import http from 'src/http.js';
import {showserver} from 'src/main.js'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import cities from 'src/data/city_center.json';
import test from 'src/data/test.json'


export var map;
var timeInter = null;
var features;
var featuresRain;
var featuresWind;
var featuresHail;
var featuresSnow;
var featuresFog;
var featuresSanddust;
var markers = [];
var popups = [];
var markerWins = [];
var popupWins = [];
var lonlats = [];
var showmark = null;
var isClick = true;
var tplfLayerId;
var beforeLine;
var forecastLine;

export function loadMap(that) {
  mapboxgl.accessToken = 'pk.eyJ1IjoidHd0aW1lcyIsImEiOiJjanl4c2tkdnYwenVuM210YXhjdGg3OTljIn0.4hACBWooh6zXxfUFoOo1jw'
  var imageURL = 'http://t0.tianditu.gov.cn/vec_w/wmts?' +
    'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
    '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
  var cavURL = 'http://t0.tianditu.gov.cn/cva_w/wmts?' +
    'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
    '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
  map = new mapboxgl.Map({
    container: that.$refs.basicMapbox,
    style: {
      'version': 8,
      'sources': {
        'raster-tiles': {
          'type': 'raster',
          'tiles': [imageURL],
          'tileSize': 256
        },
        'cva-tiles': {
          'type': 'raster',
          'tiles': [cavURL],
          'tileSize': 256
        }
      },
      'layers': [{
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 18
      }, {
        'id': 'cva-tiles',
        'type': 'raster',
        'source': 'cva-tiles',
        'minzoom': 0,
        'maxzoom': 18
      }],
      'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
    },
    // style: 'mapbox://styles/mapbox/satellite-v9',  [109.7863, 20.4306]
    center: [106.523443, 33.284631], // 设置地图中心
    zoom: 3 ,// 设置地图比例
    pitchWithRotate: false,
    dragRotate: false
  });
  map.on('load', function () {
    // 添加台风预警线24和48小时线
    getTyphoonLine24HAnd48H();
  })
  map.addControl(new mapboxgl.ScaleControl());
  map.addControl(new mapboxgl.NavigationControl());

  map.on('click', 'rain', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'rainicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 强风
  map.on('click', 'wind', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'windicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});

  });
  // 冰雹
  map.on('click', 'hail', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'hailicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 大雪featuresSnow
  map.on('click', 'snow', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'snowicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 大雾
  map.on('click', 'fog', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'fogicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
// 沙尘
  map.on('click', 'sanddust', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'sanddusticon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // map.on('moveend', function (e) {
  //   getFeature(10800, that);
  //   that.rightFromData = [];
  //   for (let i = 0; i < 7; i++) {
  //     that.polygonData[i].wgrade1Num = 0;
  //     that.polygonData[i].wgrade2Num = 0;
  //     that.polygonData[i].wgrade3Num = 0;
  //     that.polygonData[i].polygonNum = 0;
  //   }
  // });
  map.on('moveend', function (e) {
    // 监控地图zoom
    if (map.getZoom() < 3) {
      // 删除警戒线文字
      if (document.getElementById('line48_div')) {
        document.getElementById('line48_div').remove()
      }
      if (document.getElementById('line24_div')) {
        document.getElementById('line24_div').remove()
      }
    } else {
      if (!document.getElementById('line48_div')) {
        getLineTitle();
      }
    }
    // that.rightFromData = [];
    for (let i = 0; i < 7; i++) {
      that.polygonData[i].wgrade1Num = 0;
      that.polygonData[i].wgrade2Num = 0;
      that.polygonData[i].wgrade3Num = 0;
      that.polygonData[i].polygonNum = 0;
    }
    if (that.value[0] && that.id[0] === '强雨') {
      that.rightFromData.forEach((v, i) => {
        if (v.objectType === '10800') {
          delete that.rightFromData[i]
        }
      });
      getFeature(10800, that);
    }
    if (that.value[1] && that.id[1] === '强风') {
      that.rightFromData.forEach((v, i) => {
        if (v.objectType === '10900') {
          delete that.rightFromData[i]
        }
      });
      getFeature(10900, that);
    }
    if (that.value[2] && that.id[2] === '冰雹') {
      that.rightFromData.forEach((v, i) => {
        if (v.objectType === '11000') {
          delete that.rightFromData[i]
        }
      });
      getFeature(11000, that);
    }

    if (that.value[3] && that.id[3] === '强雪') {
      that.rightFromData.forEach((v, i) => {
        if (v.objectType === '11100') {
          delete that.rightFromData[i]
        }
      });
      getFeature(11100, that);
    }

    if (that.value[4] && that.id[4] === '大雾') {
      that.rightFromData.forEach((v, i) => {
        if (v.objectType === '11200') {
          delete that.rightFromData[i]
        }
      });
      getFeature(11200, that);
    }

    if (that.value[5] && that.id[5] === '沙尘') {
      that.rightFromData.forEach((v, i) => {
        if (v.objectType === '11300') {
          delete that.rightFromData[i]
        }
      });
      getFeature(11300, that);
    }

    // if (that.value[0] === ture && that.id[0] === '强雨') {
    //   getFeature(10800, that);
    // }
  });
  // 强雨
  map.on('mouseenter', 'rain', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'rainicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  // 强风
  map.on('mouseenter', 'wind', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'windicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // 冰雹
  map.on('mouseenter', 'hail', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'hailicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  // 强雪
  map.on('mouseenter', 'snow', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'snowicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // 大雾
  map.on('mouseenter', 'fog', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'fogicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // 沙尘
  map.on('mouseenter', 'sanddust', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'sanddusticon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('zoomstart', function (e) {
    showmark = false;
    markers.forEach((itm) => {
      itm.remove();
    });
    popups.forEach((itm) => {
      itm.remove();
    });
  });
  map.on('zoomend', function (e) {
    loadMakers(that);
  });
}

function loadMakers(that) {
  let zoom = map.getZoom();
  if (zoom >= 10) {
    showLabel(that);
  } else {
    showmark = false;
    markers.forEach((itm) => {
      itm.remove();
    });
    popups.forEach((itm) => {
      itm.remove();
    });
  }
}

function showLabel(that) {
  if (showmark) return;
  if (markerWins.length === 0) {
    for (let i = 0; i < that.realFromData.length; i++) {
      let itm = that.realFromData[i];
      let markerWin = document.querySelectorAll('.marker-win')[i];
      let popupWin = document.querySelectorAll('.popup-win')[i];
      let lonlat = [parseFloat(itm.geomMpx), parseFloat(itm.geomMpy)]
      markerWins.push(markerWin);
      popupWins.push(popupWin);
      lonlats.push(lonlat);
    }
  }
  markers = [];
  popups = [];
  for (let i = 0; i < that.realFromData.length; i++) {
    var popup = new mapboxgl.Popup({'offset': [75, 30]})
      .setLngLat(lonlats[i])
      .setDOMContent(popupWins[i])
      .addTo(map);
    popups.push(popup);
    var marker = new mapboxgl.Marker({'element': markerWins[i]})
      .setLngLat(lonlats[i])
      .setPopup(popup)
      .addTo(map);
    markers.push(marker);
  }
  showmark = true;
}

// 台风
export function getTyphoon(that) {
  // 获取当前时间
  let tname = that.currentTime[0];
  let spid = that.currentTime[1];
  // 获取台风数据
  http({
    url: `${showserver}/rest/tplf/getTplfBytime`,
    method: 'post',
    // data: {'tname': tname, 'spid': '1510'}
    data: {'tname': tname, 'spid': spid}
  }).then(res => {
    if (res.code !== 0) return;
    let result = res.result;
    let tfdata = [];
    let tfType = [];
    let tfdataLine = [];
    let lon = null;
    let lat = null;
    // that.options = [];
    let points = [];

    result.forEach((item, index) => {
      // 备份台风名字
      that.tfName[index] = item.typhname;
      tfType[index] = item.typhname;
      tfdata[index] = item.circle;
      // 统计台风数量   28
      if (item.windcontimax >= 32.7) {
        that.typhoonData.typhoon3Num += 1;
      } else if (item.windcontimax >= 28.5 && item.windcontimax <= 32.6) {
        that.typhoonData.typhoon2Num += 1;
      } else {
        that.typhoonData.typhoon1Num += 1;
      }
      // 转化台风数据
      if (item.circle != null) {
        tfdata[index] = JSON.parse(item.circle);
      }
      //加载台风数据
      // 判断是否有layer, 有删除layer ,Source
      if (map.getLayer(tfType[index])) {
        map.removeLayer(tfType[index]);
        map.removeSource(tfType[index]);
      }
      // 添加台风layer
      if (tfdata[index] != null) {
        // 添加geo图层
        map.addLayer({
          'id': tfType[index],
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'geometry': {
                    'type': 'Polygon',
                    'coordinates': tfdata[index]
                  }
                }
              ]
            }
          },
          'layout': {},
          'paint': {
            // 'fill-color': '#b3b1a9',
            // 'fill-color': '#000',
            'fill-opacity': 0.3           /* 填充透明度 */
          }
        });
      }
      let weather = [item.lon, item.lat];
      let div = document.createElement('div');
      div.id = that.tfName[index] + '_div';
      div.className = that.tfName[index] + '_div';
      div.style.backgroundImage = `url('http://106.15.202.31/test/typhoon.gif')`;
      div.style.backgroundSize = '40px 40px';
      div.style.visibility = 'visible';
      div.style.width = '40px';
      div.style.height = '40px';
      var marker = new mapboxgl.Marker(div);
      marker.setLngLat(weather).addTo(map);
      // 画预测路径未来的点
      getForecastLine(that, that.tfName[index]);
      // 已经经过的线
      getBeforeLine(that, that.tfName[index]);
    });
  });
}

// 添加台风预警线24和48小时线
function getTyphoonLine24HAnd48H() {
  if (map.getLayer('typhoonLine24H')) {
    map.removeLayer('typhoonLine24H')
  }
  // 添加点24
  map.addLayer({
    'id': 'typhoonLine24H',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'properties': {
            'color': '#F6F218' // blue,
          },
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              // [34, 127], [22, 127], [15, 110]
              [127, 34], [127, 22], [110, 15]
            ]
          }
        }, {
          'type': 'Feature',
          'properties': {
            'color': '#627BFF' // blue
          },
          'geometry': {
            'type': 'LineString',
            // 'coordinates': [[34, 132], [22, 132], [15, 125], [15, 110]]
            'coordinates': [[132, 34], [132, 22], [125, 15], [110, 15]]
          }
        }]
      }
    },
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'paint': {
      'line-color': ['get', 'color'],
      'line-width': 3,
      'line-opacity': 0.8
    }
  });
  // 画警戒线
  getLineTitle();
}

// 画警戒线
function getLineTitle() {
  let zoom = map.getZoom();
  let H48 = document.createElement('div');
  H48.id = 'line48_div';
  H48.style.fontSize = '12px';
  H48.style.color = '#627BFF';
  H48.innerHTML = '48<br>小<br>时<br>警<br>戒<br>线';
  let H48Title = new mapboxgl.Marker(H48, {offset: [1, -10]})
    .setLngLat([132, 28])
    .addTo(map);
  let H24 = document.createElement('div');
  H24.id = 'line24_div';
  H24.style.fontSize = '12px';
  H24.style.color = '#F6F218';
  H24.innerHTML = '24<br>小<br>时<br>警<br>戒<br>线';
  let H24Title = new mapboxgl.Marker(H24, {offset: [1, -10]})
    .setLngLat([127, 28])
    .addTo(map);
}

// 画预测路径未来的点
function getForecastLine(that, type) {
  // 获取当前时间
  let tname = that.currentTime[0];
  let spid = that.currentTime[1];
  let data = null;
  let color;
  http({
    url: `${showserver}/rest/tplf/getTplfBytimeForecast`,
    method: 'post',
    // data: {'tname': tname, 'spid': '1510'}
    data: {'tname': tname, 'spid': spid}
  }).then(res => {
    if (res.code === 0) {
      var result = res.result;
      data = result[type];
      forecastLine = type + 'ForecastLine';
      color = '#ed6498';
      var geojson = {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': data
          }
        }]
      };
      if (map.getLayer(forecastLine)) {
        map.removeLayer(forecastLine);
        map.removeSource(forecastLine);
      }
      // 添加点
      map.addLayer({
        'id': forecastLine,
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          "line-dasharray": [2, 4],
          'line-color': color,
          'line-width': 5,
          'line-opacity': 0.8
        }
      });
    }
  })
}

// 已经发生的线
function getBeforeLine(that, type) {
  // 获取当前时间
  let tname = that.currentTime[0];
  let spid = that.currentTime[1];
  let data = null;
  var color;
  http({
    url: `${showserver}/rest/tplf/getTplfBytimeBefore`,
    method: 'post',
    // data: {'tname': tname, 'spid': '1510'}
    data: {'tname': tname, 'spid': spid}
  }).then(res => {
    if (res.code === 0) {
      var result = res.result;
      data = result[type];
      beforeLine = type + 'BeforeLine';
      color = '#ed6498';
      var geojson = {
        'type': 'FeatureCollection',
        'features': [{
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': data
          }
        }]
      };
      if (map.getLayer(beforeLine)) {
        map.removeLayer(beforeLine);
        map.removeSource(beforeLine);
      }
      // 添加点
      map.addLayer({
        'id': beforeLine,
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          "line-dasharray": [2, 4],
          'line-color': color,
          'line-width': 5,
          'line-opacity': 0.8
        }
      });
    }
  })
}

export function getFeature(param, that) {
  // clearMarkers();
  let bounds = map.getBounds();
  let coor = bounds._ne.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._sw.lat + ',' +
    bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._sw.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
  axios.post(`${showserver}/rest/current/selectFeatureByTime`, `wtype=${param}&bounds=${coor}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
    res = res.data;
    switch (param) {
      case 10800:
        if (res.result !== undefined) {
          featuresRain = res.result.features
        }
        that.initMaps[0]++;
        break;
      case 10900:
        if (res.result !== undefined) {
          featuresWind = res.result.features
        }
        that.initMaps[1]++;
        break;
      case 11000:
        if (res.result !== undefined) {
          featuresHail = res.result.features
        }
        that.initMaps[2]++;
        break;
      case 11100:
        if (res.result !== undefined) {
          featuresSnow = res.result.features
        }
        that.initMaps[3]++;
        break;
      case 11200:
        if (res.result !== undefined) {
          featuresFog = res.result.features
        }
        that.initMaps[4]++;
        break;
      case 11300:
        if (res.result !== undefined) {
          featuresSanddust = res.result.features
        }
        that.initMaps[5]++;
        break;
    }
    if (res.code === 0) {
      resCallBack(res.result.features, param, that)
    }
    ;
    if (that.initMaps[0] === 0 && that.initMaps[1] === 0 && that.initMaps[2] === 0 && that.initMaps[3] === 0 && that.initMaps[4] === 0 && that.initMaps[5] === 0) {
      that.realFromData = JSON.parse(JSON.stringify(that.rightFromData)); // 右侧列表数据来源
      if (timeInter) {
        window.clearInterval(timeInter);
      }
      timeInter = setInterval(() => {
        for (let i = 0; i < that.realFromData.length; i++) {
          that.realFromData[i].timeDiff = that.realFromData[i].timeDiff -= 1000;
        }
      }, 1000);
      that.initMap = false;
    }
  });
}

export function getFeatureCity(param, that) {
  http({
    url: `${showserver}/rest/current/selectCitysGroup?wtype=${param}`,
    method: 'get'
  }).then(res => {
    if (res.code !== 0) return;
    let citys = [{'label': '全国', 'children': res.result}];
    if (res.result.length === 0) {
      citys = []
    }
    switch (param) {
      case 10800:
        that.wCity.rain = citys;
        break;
      case 10900:
        that.wCity.wind = citys;
        break;
      case 11000:
        that.wCity.hail = citys;
        break;
      case 11100:
        that.wCity.snow = citys;
        break;
      case 11200:
        that.wCity.fog = citys;
        break;
      case 11300:
        that.wCity.sannddust = citys;
        break;
    }
  })
}

function resCallBack(res, code, that) {
  features = res
  if (features == null) {
    features = res;
  } else {
    features = features.concat(res);
  }
  // 处理json对其进行分类
  var wgradeArr = []; // 分级对照
  var dataArr = [];
  var iconname = null;
  var iconid = null;
  var iconpath = null;
  var stops = null;
  var grades = [];
  var gradetype = null;
  switch (code) {
    case 10800:
      iconname = 'rain';
      iconpath = 'rain';
      iconid= 'rainid';
      gradetype = 0;
      grades = ['10801', '10802', '10803'];
      stops = [
        [grades[0], '#6BC04B'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#A1D784'],
        [grades[2], '#ABDB92']
      ];
      break;
    case 10900:
      iconname = 'wind';
      iconpath = 'wind';
      iconid= 'windid';
      gradetype = 1;
      grades = ['10901', '10902', '10903'];
      stops = [
        [grades[0], '#FFB35A'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#FFC37B'],
        [grades[2], '#FFCC8C']
      ];
      break;
    case 11000:
      iconname = 'hail';
      iconpath = 'hail';
      iconid= 'hailid';
      gradetype = 2;
      grades = ['11001', '11002', '11003'];
      stops = [
        [grades[0], '#CB6BDA'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#CB8BDB'],
        [grades[2], '#DAA9E3']
      ];
      break;
    case 11100:
      iconname = 'snow';
      iconpath = 'snow';
      iconid= 'snowid';
      gradetype = 3;
      grades = ['11101', '11102', '11103'];
      stops = [
        [grades[0], '#086DC1'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#167ACE'],
        [grades[2], '#4E98D6']
      ];
      break;
    case 11200:
      iconname = 'fog';
      iconpath = 'fog';
      iconid= 'fogid';
      gradetype = 4;
      grades = ['11201', '11202', '11203'];
      stops = [
        [grades[0], '#01AEA8'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#03C0B9'],
        [grades[2], '#5ADED9']
      ];
      break;
    case 11300:
      iconname = 'sanddust';
      iconpath = 'sanddust';
      iconid= 'sanddustid';
      gradetype = 5;
      grades = ['11301', '11302', '11303'];
      stops = [
        [grades[0], '#E4C411'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#F2D323'],
        [grades[2], '#F8E472']
      ];
      break;
  }
  // loadMakers(that);
  for (var i = 0; i < features.length; i++) {
    let time = parseInt(features[i].properties.timeDiff);
    features[i].properties.timeDiff = time;
    features[i].properties.timeLate = parseInt(features[i].properties.timeLate);
    // 区分等级图标
    let grade = parseInt(features[i].properties.objectGrade) % 100;
    if (grade === 1) {
      features[i].properties.gtype = 1;
      features[i].properties.icon = iconname + '1';
    } else if (grade === 2) {
      features[i].properties.gtype = 2;
      features[i].properties.icon = iconname + '2';
    } else {
      features[i].properties.gtype = 3;
      features[i].properties.icon = iconname + '3';
    }
    // 计算各个天气分级数量
    if (grades[0] === features[i].properties.objectGrade) {
      that.polygonData[gradetype].wgrade1Num += 1;
    } else if (grades[1] === features[i].properties.objectGrade) {
      that.polygonData[gradetype].wgrade2Num += 1;
    } else if (grades[2] === features[i].properties.objectGrade) {
      that.polygonData[gradetype].wgrade3Num += 1;
    }
    that.polygonData[gradetype].polygonNum += 1;

    dataArr.push(features[i].properties)
  }
  that.rightFromData = that.rightFromData.concat(dataArr); // 右侧列表数据来源


  if (map.getSource(iconname)) {
    if (map.getLayer(iconname)) {
      map.removeLayer(iconname);
    }
    // if (map.getLayer(iconname + 'icon')) {
    //   map.removeLayer(iconname + 'icon');
    // }
    map.removeSource(iconname);
  }

  if (map.getSource(iconid)) {
    if (map.getLayer(iconname + 'icon')) {
      map.removeLayer(iconname + 'icon');
    }
    map.removeSource(iconid)
  }

  var data = [];
  features.forEach((item, index) => {
    data[index] = {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [item.properties.geomMpx, item.properties.geomMpy]
      },
      'properties': item.properties
    }
  });
  map.addSource(iconid, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': data
    }
  });




  map.addSource(iconname, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': features
    }
  });
  map.addLayer({
    'id': iconname,
    'type': 'fill',
    'source': iconname,
    'layout': {},
    // 'maxzoom': 9,
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'objectGrade', /* 函数的输入来源，population属性值 */
        type: 'categorical',
        stops: stops,
        default: '#fff'
      },
      'fill-opacity': 0.6
    }
  });
  map.loadImage('static/icon/wtype/' + iconpath + '1.png', function (error, image) {
    if (error) throw error;
    let iname = iconname + '1';
    if (map.hasImage(iname)) {
      map.removeImage(iname)
    }
    map.addImage(iname, image);
  });
  map.loadImage('static/icon/wtype/' + iconpath + '3.png', function (error, image) {
    if (error) throw error;
    let iname = iconname + '3';
    if (map.hasImage(iname)) {
      map.removeImage(iname)
    }
    map.addImage(iname, image);
  });
  map.loadImage('static/icon/wtype/' + iconpath + '2.png', function (error, image) {
    if (error) throw error;
    let iname = iconname + '2';
    if (map.hasImage(iname)) {
      map.removeImage(iname)
    }
    if (map.getLayer(iconname + 'icon')) {
      map.removeLayer(iconname + 'icon')
    }
    map.addImage(iname, image);
    map.addLayer({
      'id': iconname + 'icon',
      'type': 'symbol',
      'source': iconname,
      'maxzoom': 10,
      'layout': {
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
        'icon-size': 0.06
      },
      'paint': {}
    });
  });
}

function clearMarkers() {
  markers.forEach((itm) => {
    itm.remove();
  });
  popups.forEach((itm) => {
    itm.remove();
  });
  markers = [];
  popups = [];
  markerWins = [];
  popupWins = [];
}

export function togglePopup(id) {
  if (markers.length > 0) {
    markers[id].togglePopup();
  }
}

export function showPolygon(wgid, objectType) {
  let coor = null;
  switch (objectType) {
    case '10800':
      featuresRain.forEach((itm, idx) => {
        if (itm.properties.wgid === wgid) {
          coor = itm.geometry.coordinates[0];
        }
      });
      break;
    case '10900':
      featuresWind.forEach((itm, idx) => {
        if (itm.properties.wgid === wgid) {
          coor = itm.geometry.coordinates[0];
        }
      });
      break;
    case '11000':
      featuresHail.forEach((itm, idx) => {
        if (itm.properties.wgid === wgid) {
          coor = itm.geometry.coordinates[0];
        }
      });
      break;
    case '11100':
      featuresSnow.forEach((itm, idx) => {
        if (itm.properties.wgid === wgid) {
          coor = itm.geometry.coordinates[0];
        }
      });
      break;
    case '11200':
      featuresFog.forEach((itm, idx) => {
        if (itm.properties.wgid === wgid) {
          coor = itm.geometry.coordinates[0];
        }
      });
      break;
    case '11300':
      featuresSanddust.forEach((itm, idx) => {
        if (itm.properties.wgid === wgid) {
          coor = itm.geometry.coordinates[0];
        }
      });
      break;
  }
  jump2poly(coor);
  isClick = false;
}


function jump2poly(coor) {
  let minx = 360;
  let maxx = 0;
  let miny = 180;
  let maxy = 0;
  coor.forEach((itm, idx) => {
    if (minx > itm[0]) {
      minx = itm[0];
    }
    if (maxx < itm[0]) {
      maxx = itm[0];
    }
    if (miny > itm[1]) {
      miny = itm[1];
    }
    if (maxy < itm[1]) {
      maxy = itm[1];
    }
  });
  map.fitBounds([[minx, miny], [maxx, maxy]]);
}
