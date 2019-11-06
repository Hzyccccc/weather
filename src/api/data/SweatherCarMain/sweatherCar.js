import http from 'src/http.js';
import {showserver} from 'src/main.js'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import cities from 'src/data/city_center.json';
import test from 'src/data/test.json'

export var map;
var timeInter = null;
var features;
var markers = [];
var popups = [];
var markerWins = [];
var popupWins = [];
var lonlats = [];
var showmark = null;
var isClick = true;
var carSize;

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
    // style: 'mapbox://styles/mapbox/satellite-v9',  [116.3683244, 39.915085]  33.284631,
    center: [106.523443, 33.284631], // 设置地图中心
    zoom: 4, // 设置地图比例
    pitchWithRotate: false,
    dragRotate: false
  });
  map.addControl(new mapboxgl.ScaleControl());
  map.addControl(new mapboxgl.NavigationControl());

  map.on('click', 'rainicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 强风
  map.on('click', 'windicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 冰雹
  map.on('click', 'hailicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 强雪
  map.on('click', 'snowicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });

  // 大雾
  map.on('click', 'fogicon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });

  // 沙尘
  map.on('click', 'sanddusticon', function (e) {
    // let coor = e.features[0].geometry.coordinates[0];
    // jump2poly(coor);
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 地图移动监听
  map.on('moveend', function (e) {
    if (map.getZoom() < 13) {
      if (document.getElementById('weather_div')) {
        document.getElementById('weather_div').remove()
      }
    }
    that.rightFromDataCarFB = [];
    that.rightFromDataCar = [];
    that.carSize = 0;
    for (let i = 0; i < 7; i++) {
      that.polygonData[i].wgrade1Num = 0;
      that.polygonData[i].wgrade2Num = 0;
      that.polygonData[i].wgrade3Num = 0;
      that.polygonData[i].polygonNum = 0;
    }
    // 移动地图
    selectFeatureByType(that.param, that);

    // 获取地图车辆面
    if (that.value[0] && that.id[0] === '强雨') {
      getFeature(10800, that);
    }
    if (that.value[1] && that.id[1] === '强风') {
      getFeature(10900, that);
    }
    if (that.value[2] && that.id[2] === '冰雹') {
      getFeature(11000, that);
    }
    if (that.value[3] && that.id[3] === '强雪') {
      getFeature(11100, that);
    }
    if (that.value[4] && that.id[4] === '大雾') {
      getFeature(11200, that);
    }
    if (that.value[5] && that.id[5] === '沙尘') {
      getFeature(11300, that);
    }
  });


  map.on('mouseenter', 'rainicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseenter', 'windicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseenter', 'hailicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  // 强雪
  map.on('mouseenter', 'snowicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // 大雾
  map.on('mouseenter', 'fogicon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  // 沙尘
  map.on('mouseenter', 'sanddusticon', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  // 监控水滴划入
  for (let i = 1; i < 8; i++) {
    // 水滴点击
    map.on('click', 'PolygonContent' + i, function (e) {
      let coor = e.features[0].geometry.coordinates[0];
      jump2poly(coor);
    });
    // 变小手
    map.on('mouseenter', 'PolygonContent' + i, function () {
      map.getCanvas().style.cursor = 'pointer';
    });
    // 移开变回原来状态
    map.on('mouseleave', 'PolygonContent' + i, function () {
      map.getCanvas().style.cursor = '';
    });
  }

  // 水滴点击
  map.on('click', 'point', function (e) {
    let zoom = map.getZoom();
    // if (zoom > 3) {
    //   map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 13});
    // }
    map.flyTo({'center': e.features[0].geometry.coordinates, 'zoom': 12});
  });
  // 变小手
  map.on('mouseenter', 'point', function () {
    let zoom = map.getZoom();
    map.getCanvas().style.cursor = 'pointer';
  });
  // 移开变回原来状态
  map.on('mouseleave', 'point', function () {
    map.getCanvas().style.cursor = '';
  });


  map.on('zoomstart', function (e) {

  });
  map.on('zoomend', function (e) {
    // loadMakers(that);
  });

  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  // 强雨
  map.on('mouseenter', 'rainPoint', function (e) {
    showCarLabel(e, popup);
  });
  map.on('mouseleave', 'rainPoint', function (e) {
    remove(popup);
  });
  // 强风
  map.on('mouseenter', 'windPoint', function (e) {
    showCarLabel(e, popup);
  });
  map.on('mouseleave', 'windPoint', function (e) {
    remove(popup);
  });
  // 冰雹
  map.on('mouseenter', 'hailPoint', function (e) {
    showCarLabel(e, popup);
  });
  map.on('mouseleave', 'hailPoint', function (e) {
    remove(popup);
  });
  // 强雪
  map.on('mouseenter', 'snowPoint', function (e) {
    showCarLabel(e, popup);
  });
  map.on('mouseleave', 'snowPoint', function (e) {
    remove(popup);
  });

  // 大雾
  map.on('mouseenter', 'fogPoint', function (e) {
    showCarLabel(e, popup);
  });
  map.on('mouseleave', 'fogPoint', function (e) {
    remove(popup);
  });
  // 沙尘
  map.on('mouseenter', 'sanddustPoint', function (e) {
    showCarLabel(e, popup);
  });
  map.on('mouseleave', 'sanddustPoint', function (e) {
    remove(popup);
  });
}

function remove(popup) {
  map.getCanvas().style.cursor = '';
  popup.remove();
}

function showCarLabel(e, popup) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();
  // 品牌
  var brand = e.features[0].properties.brand;
  // 处理隐藏品牌
  var brandStr = brand.charAt(0) + '****' + brand.charAt(brand.length - 1);
  // 车牌
  var carNumber = e.features[0].properties.carNumber;
  // 车牌隐藏处理
  var carNumberStr = carNumber.charAt(0) + '****' + carNumber.charAt(carNumber.length - 1);
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }
  var style = 'font-size:small;background:white;border:1px #000 solid;border-radius:10%;width:70px;height:80px';
  var testStyle = 'margin:5px';
  // 随机车主和手机号;
  var randomCarNumberStr = [139, 138, 158, 156];
  var carPersonNameStr = ['王', '李', '刘', '梁', '马'];
  var nameStr = ['女士', '先生']
  var carPersonName = carPersonNameStr[Math.floor(Math.random() * 4) + 0] + nameStr[Math.floor(Math.random() * 2) + 0];
  var randomCarNumber = randomCarNumberStr[Math.floor(Math.random() * 3) + 0] + '****' + (Math.floor(Math.random() * 1000) + 1000);
  popup.setLngLat(coordinates)
    .setHTML('<div style=' + style + '><text style=' + testStyle + '>品牌：' + brandStr + '</text> <br> <text style=' + testStyle + '>车牌：' + carNumberStr + '</text> <br> <text style=' + testStyle + '>车主：' + carPersonName + '</text> <br> <text style=' + testStyle + '>联系方式：' + randomCarNumber + '</text></div>')
    .addTo(map);
}


function loadMakers(that) {
  let zoom = map.getZoom();
  if (zoom >= 10) {
    // showLabel(that);
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

export function selectFeatureByType(param, that) {
  let zoom = map.getZoom();
  let bounds = map.getBounds();
  let coor = bounds._ne.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._sw.lat + ',' +
    bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._sw.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
  //  获取地图车辆面
  axios.get(`${showserver}/rest/feature/selectFeatureByType?wtype=${param}&bounds=${coor}&zoom=${zoom}`).then(res => {
    if (res.data.code !== 0) return;
    res = res.data;
    resPonitLocalBack(res.result, that);
  })
}

// 画水滴
function resPonitLocalBack(res, that) {
  let zoom = map.getZoom();
  var carNum = 0;
  if (map.getSource('point')) {
    if (map.getLayer('point')) {
      map.removeLayer('point');
    }
    map.removeSource('point');
  }
  // if (zoom <= 3) {
  // res.forEach((item, index) => {
  //   carNum += item.carNum
  // });
  // map.addSource('point', {
  //   'type': 'geojson',
  //   'data': {
  //     'type': 'FeatureCollection',
  //     'features': [{
  //       'type': 'Feature',
  //       'geometry': {
  //         'type': 'Point',
  //         'coordinates': [106.523443, 33.284631]
  //       },
  //       'properties': {
  //         'carNum': carNum
  //       }
  //     }]
  //   }
  // });
  // map.loadImage('http://106.15.202.31/test/location.png', function (error, image) {
  //   if (error) throw error;
  //   if (map.hasImage('location')) {
  //     map.removeImage('location')
  //   }
  //
  //   if (map.getLayer('point')) {
  //     map.removeLayer('point');
  //   }
  //
  //   map.addImage('location', image);
  //   map.addLayer({
  //     'id': 'point',
  //     'type': 'symbol',
  //     'maxzoom': 4,
  //     'minzoom': 2,
  //     'source': 'point',
  //     'layout': {
  //       'icon-ignore-placement': true,
  //       'icon-allow-overlap': true,
  //       'icon-image': {
  //         property: 'carNum', /* 函数的输入来源，population属性值 */
  //         type: 'categorical',
  //         stops: [
  //           [0, '']
  //         ],
  //         default: 'location'
  //       },
  //       'icon-size': 0.6,
  //       'icon-anchor': 'bottom',
  //       'text-field': '{carNum}',
  //       'text-offset': [0, -1.7],
  //       'text-size': 11,
  //       'text-anchor': 'bottom'
  //     },
  //     'paint': {
  //       'text-color': 'rgb(,,)',
  //       'text-opacity': {
  //         property: 'carNum', /* 函数的输入来源，population属性值 */
  //         type: 'categorical',
  //         stops: [
  //           [0, 0]
  //         ],
  //         default: 1
  //       }
  //     }
  //   });
  // });
  // } else if (zoom < 9 && zoom > 3) {
  if (zoom < 7) {
    var data = [];
    // 大于4级地图
    res.forEach((item, index) => {
      data[index] = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': item.point
        },
        'properties': {
          'carNum': item.carNum
        }
      }
    });
    map.addSource('point', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': data
      }
    });
    map.loadImage('http://106.15.202.31/test/location.png', function (error, image) {
      if (error) throw error;
      if (map.hasImage('location')) {
        map.removeImage('location')
      }
      map.addImage('location', image);

      if (map.getLayer('point')) {
        map.removeLayer('point')
      }

      map.addLayer({
        'id': 'point',
        'type': 'symbol',
        'maxzoom': 7,
        'minzoom': 1,
        'source': 'point',
        'layout': {
          'icon-ignore-placement': true,
          'icon-allow-overlap': true,
          'icon-image': {
            property: 'carNum', /* 函数的输入来源，population属性值 */
            type: 'categorical',
            stops: [
              [0, '']
            ],
            default: 'location'
          },
          'icon-size': 0.6,
          'icon-anchor': 'bottom',
          'text-field': '{carNum}',
          'text-offset': [0, -1.7],
          'text-size': 11,
          'text-anchor': 'bottom'
        },
        'paint': {
          'text-color': 'rgb(,,)',
          'text-opacity': {
            property: 'carNum', /* 函数的输入来源，population属性值 */
            type: 'categorical',
            stops: [
              [0, 0]
            ],
            default: 1
          }
        }
      });
    });
  }
}

// 获取地图车辆面
export function getFeature(param, that) {
  let bounds = map.getBounds();
  let coor = bounds._ne.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._sw.lat + ',' +
    bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._sw.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
  //  获取地图车辆面
  axios.post(`${showserver}/rest/feature/selectAllFeature`, `wtype=${param}&bounds=${coor}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
    if (res.data.code !== 0) return;
    for (var i = 0; i < res.data.result.features.length; i++) {
      res.data.result.features[i].geometry = JSON.parse(res.data.result.features[i].geometry);
    }
    res = res.data;
    resCallBack(res.result.features, param, that);
  });
  // 查询某种天气下页面有的车辆点
  axios.post(`${showserver}/rest/feature/selectAllCarPoint`, `wtype=${param}&bounds=${coor}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(obj => {
    if (obj.data.code !== 0) return;
    obj = obj.data;
    objCallBack(obj, param, that);
  });
  // 获取车辆信息
  axios.post(`${showserver}/rest/feature/queryAllCarInfo`, `wtype=${param}&bounds=${coor}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(obj => {
    if (obj.data.code !== 0) return;
    obj = obj.data;
    carCallBack(obj, param, that);
  });
}

function carCallBack(res, code, that) {
  var grades = [];
  var gradetype = null;
  switch (code) {
    case 10800:
      gradetype = 0;
      grades = [10801, 10802, 10803];
      break;
    case 10900:
      gradetype = 1;
      grades = [10901, 10902, 10903];
      break;
    case 11000:
      gradetype = 2;
      grades = [11001, 11002, 11003];
      break;
    case 11100:
      gradetype = 3;
      grades = [11101, 11102, 11103];
      break;
    case 11200:
      gradetype = 4;
      grades = [11201, 11202, 11203];
      break;
    case 11300:
      gradetype = 5;
      grades = [11301, 11302, 11303];
      break;
  }
  if (res.code === 0) {
    for (var j = 0; j < res.result.length; j++) {
      res.result[j].brand = res.result[j].brand.charAt(0) + '****' + res.result[j].brand.charAt(res.result[j].brand.length - 1)
      res.result[j].carNumber = res.result[j].carNumber.charAt(0) + '****' + res.result[j].carNumber.charAt(res.result[j].carNumber.length - 1)
      // 计算各个天气分级数量
      if (grades[0] === res.result[j].wgrade) {
        that.polygonData[gradetype].wgrade1Num += 1;
      } else if (grades[1] === res.result[j].wgrade) {
        that.polygonData[gradetype].wgrade2Num += 1;
      } else if (grades[2] === res.result[j].wgrade) {
        that.polygonData[gradetype].wgrade3Num += 1;
      }
      that.polygonData[gradetype].polygonNum += 1;
    }
  }
  // 右测车牌
  var randomCarNumberStr = [139, 138, 158, 156];
  var carPersonNameStr = ['王', '李', '刘', '梁', '马'];
  var nameStr = ['女士', '先生'];
  if (res.code === 0) {
    for (var i = 0; i < res.result.length; i++) {
      carSize++;
      res.result[i].brand = res.result[i].brand.charAt(0) + '****' + res.result[i].brand.charAt(res.result[i].brand.length - 1);
      res.result[i].carNumber = res.result[i].carNumber.charAt(0) + '****' + res.result[i].carNumber.charAt(res.result[i].carNumber.length - 1);
      // // 随机生成手机号
      var carData = {};
      carData.randomCarNumber = randomCarNumberStr[Math.floor(Math.random() * 3) + 0] + '****' + (Math.floor(Math.random() * 1000) + 1000);
      carData.carPersonName = carPersonNameStr[Math.floor(Math.random() * 4) + 0] + nameStr[Math.floor(Math.random() * 2) + 0];
      carData.brand = res.result[i].brand;
      carData.carNumber = res.result[i].carNumber;
      carData.cityCode = res.result[i].cityCode;
      carData.proCode = res.result[i].proCode;
      carData.lat = res.result[i].lat;
      carData.lon = res.result[i].lon;
      carData.objectType = res.result[i].wtype;
      that.rightFromDataCar.push(carData);
      // this.rightFromDataCar[i].randomCarNumber = randomCarNumberStr[Math.floor(Math.random() * 3) + 0] + '****' + Math.floor(Math.random() * 1000) + 1000;
      // this.rightFromDataCar[i].carPersonName = carPersonNameStr[Math.floor(Math.random() * 4) + 0] + '先生';
      // this.rightFromDataCar[i].brand = res.result[i].brand
      // this.rightFromDataCar[i].carNumber = res.result[i].carNumber
      // this.rightFromDataCar[i].cityCode = res.result[i].cityCode
    }
    that.rightFromDataCarFB = that.rightFromDataCar
  }
}

// 加载页面汽车的点
function objCallBack(res, code, that) {
  var pointData = null;
  var grades = [];
  var gradetype = null;
  switch (code) {
    case 10800:
      pointData = 'rainPoint';
      gradetype = 0;
      grades = [10801, 10802, 10803];
      break;
    case 10900:
      pointData = 'windPoint';
      gradetype = 1;
      grades = [10901, 10902, 10903];
      break;
    case 11000:
      pointData = 'hailPoint';
      gradetype = 2;
      grades = [11001, 11002, 11003];
      break;
    case 11100:
      pointData = 'snowPoint';
      gradetype = 3;
      grades = [11101, 11102, 11103];
      break;
    case 11200:
      pointData = 'fogPoint';
      gradetype = 4;
      grades = [11201, 11202, 11203];
      break;
    case 11300:
      pointData = 'sanddustPoint';
      gradetype = 5;
      grades = [11301, 11302, 11303];
      break;
  }
  // 转化数据
  for (var i = 0; i < res.result.features.length; i++) {
    res.result.features[i].geometry = JSON.parse(res.result.features[i].geometry);
  }
  if (map.getSource(pointData)) {
    if (map.getLayer(pointData)) {
      map.removeLayer(pointData);
    }
    map.removeSource(pointData);

  }

  // 添加数据源
  map.addSource(pointData, {
    'type': 'geojson',
    'data': res.result
  });
  map.loadImage('http://106.15.202.31/test/car.png', function (error, image) {
    if (error) throw error;
    if (map.hasImage('car')) {
      map.removeImage('car')
    }

    if (map.getLayer(pointData)) {
      map.removeLayer(pointData);
    }

    map.addImage('car', image);
    map.addLayer({
      'id': pointData,
      'type': 'symbol',
      'source': pointData,
      'minzoom': 11,
      'maxzoom': 18,
      'layout': {
        'icon-ignore-placement': true,
        'icon-allow-overlap': true,
        'icon-image': 'car',
        'icon-size': 0.8
        // 'text-field': '{label}',
        // 'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        // 'text-offset': [0, 0.6],
        // 'text-anchor': 'top'
      }
    });
  });
}

// 加载水滴面
function resCallBack(res, code, that) {
  features = null;
  features = res;
  // 处理json对其进行分类
  var wgradeArr = []; // 分级对照
  var dataArr = [];
  var iconname = null;
  var iconpath = null;
  var iconid = null;
  var stops = null;
  var grades = [];
  var gradetype = null;
  var carPointId;
  var carLayerId;
  switch (code) {
    case 10800:
      carPointId = 'points1';
      carLayerId = 'PolygonContent1';
      iconid= 'rainid';
      iconname = 'rain';
      iconpath = 'rain';
      gradetype = 0;
      grades = [10801, 10802, 10803];
      stops = [
        [grades[0], '#6BC04B'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#A1D784'],
        [grades[2], '#ABDB92']
      ];
      break;
    case 10900:
      carPointId = 'points2';
      carLayerId = 'PolygonContent2';
      iconid= 'windid';
      iconname = 'wind';
      iconpath = 'wind';
      gradetype = 1;
      grades = [10901, 10902, 10903];
      stops = [
        [grades[0], '#FFB35A'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#FFC37B'],
        [grades[2], '#FFCC8C']
      ];
      break;
    case 11000:
      carPointId = 'points3';
      carLayerId = 'PolygonContent3';
      iconname = 'hail';
      iconpath = 'hail';
      iconid= 'hailid';
      gradetype = 2;
      grades = [11001, 11002, 11003];
      stops = [
        [grades[0], '#CB6BDA'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#CB8BDB'],
        [grades[2], '#DAA9E3']
      ];
      break;
    case 11100:
      carPointId = 'points4';
      carLayerId = 'PolygonContent4';
      iconname = 'snow';
      iconpath = 'snow';
      iconid= 'snowid';
      gradetype = 3;
      grades = [11101, 11102, 11103];
      stops = [
        [grades[0], '#086DC1'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#167ACE'],
        [grades[2], '#4E98D6']
      ];
      break;
    case 11200:
      carPointId = 'points5';
      carLayerId = 'PolygonContent5';
      iconname = 'fog';
      iconpath = 'fog';
      iconid= 'fogid';
      gradetype = 4;
      grades = [11201, 11202, 11203];
      stops = [
        [grades[0], '#01AEA8'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#03C0B9'],
        [grades[2], '#5ADED9']
      ];
      break;
    case 11300:
      carPointId = 'points6';
      carLayerId = 'PolygonContent6';
      iconname = 'sanddust';
      iconpath = 'sanddust';
      iconid= 'sanddustid';
      gradetype = 5;
      grades = [11301, 11302, 11303];
      stops = [
        [grades[0], '#E4C411'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#F2D323'],
        [grades[2], '#F8E472']
      ];
      break;
  }
  // loadMakers(that);  区分面的等级图标
  for (var i = 0; i < features.length; i++) {
    // 区分等级图标
    let grade = parseInt(features[i].properties.wgrade) % 100;
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
    dataArr.push(features[i].properties)
  }
  // that.rightFromData = that.rightFromData.concat(dataArr); // 右侧列表数据来源

  // 面的数据源判断
  if (map.getSource(iconname)) {
    if (map.getLayer(iconname)) {
      map.removeLayer(iconname);
    }
    // if (map.getLayer(iconname + 'icon')) {
    //   map.removeLayer(iconname + 'icon');
    // }
    map.removeSource(iconname);
  }
  // 水滴的数据源判断
  if (map.getSource(carLayerId)) {
    if (map.getLayer(carLayerId)) {
      map.removeLayer(carLayerId);
    }
    map.removeSource(carLayerId);
  }

  // icon图标的数据源判断
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
  // 图表数据源
  map.addSource(iconname, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': features
    }
  });
 // 水滴数据源
  map.addSource(carLayerId, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': data
    }
  });

  if (map.getZoom() >= 7) {
    // 聚合点图层
    map.loadImage('http://106.15.202.31/test/location.png', function (error, image) {
      if (error) throw error;
      if (map.hasImage('location')) {
        map.removeImage('location')
      }
      if (map.getLayer(carLayerId)) {
        map.removeLayer(carLayerId)
      }
      map.addImage('location', image);
      map.addLayer({
        'id': carLayerId,
        'type': 'symbol',
        'source': carLayerId,
        'maxzoom': 10,
        'minzoom': 7,
        'layout': {
          'icon-ignore-placement': true,
          'icon-allow-overlap': true,
          // 'icon-image': 'location',
          'icon-image': {
            property: 'carNum', /* 函数的输入来源，population属性值 */
            type: 'categorical',
            stops: [
              [0, '']
            ],
            default: 'location'
          },
          'icon-size': 0.6,
          'icon-anchor': 'bottom',
          'text-field': '{carNum}',
          'text-offset': [0, -1.7],
          'text-size': 11,
          'text-anchor': 'bottom'
        },
        'paint': {
          'text-color': 'rgb(,,)',
          'text-opacity': {
            property: 'carNum', /* 函数的输入来源，population属性值 */
            type: 'categorical',
            stops: [
              [0, 0]
            ],
            default: 1
          }
        }
      });
    });
  }
  // 分级页面显示图颜色图层
  map.addLayer({
    'id': iconname,
    'type': 'fill',
    'source': iconname,
    'layout': {},
    'minzoom': 2,
    'paint': {
      'fill-antialias': true,
      'fill-color': {
        property: 'wgrade', /* 函数的输入来源，population属性值 */
        type: 'categorical',
        stops: stops
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
    map.addImage(iname, image);

    if (map.getLayer(iconname + 'icon')) {
      map.removeLayer(iconname + 'icon');
    }
    map.addLayer({
      'id': iconname + 'icon',
      'type': 'symbol',
      'source': iconid,
      'maxzoom': 11,
      'minzoom': 10,
      'layout': {
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
        'icon-size': 0.06,
        'icon-offset': [0, 0]
      },
      'paint': {}
    });
  });
}

// 获取城市选择
export function getFeatureCity(param, that) {
  http({
    url: `${showserver}/rest/feature/selectCityCarCount?wtype=${param}`,
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
        that.wCity.sanddust = citys;
        break;
    }
  })
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


