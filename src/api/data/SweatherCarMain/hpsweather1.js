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
    center: [116.3683244, 39.915085], // 设置地图中心
    zoom: 3 // 设置地图比例
  });
  map.addControl(new mapboxgl.ScaleControl());
  map.addControl(new mapboxgl.NavigationControl());

  map.on('click', 'rain', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    // console.log(e.features);
    // console.log(e.features[0].properties);
  });
  map.on('click', 'rainicon', function (e) {
    let coor = e.features[0].geometry.coordinates[0];
    jump2poly(coor);
  });
  map.on('moveend', function (e) {
    getFeature(10800, that);
    that.rightFromData = [];
    for (let i = 0; i < 7; i++) {
      that.polygonData[i].wgrade1Num = 0;
      that.polygonData[i].wgrade2Num = 0;
      that.polygonData[i].wgrade3Num = 0;
      that.polygonData[i].polygonNum = 0;
    }
  });

  map.on('mouseenter', 'rain', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseenter', 'rainicon', function () {
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

export function getFeature(param, that) {
  // clearMarkers();
  let bounds = map.getBounds();
  let coor = bounds._ne.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._sw.lat + ',' +
    bounds._sw.lng + ',' + bounds._sw.lat + ',' + bounds._sw.lng + ',' + bounds._ne.lat + ',' + bounds._ne.lng + ',' + bounds._ne.lat;
  axios.post(`${showserver}/rest/current/selectFeatureByTime1`, `wtype=${param}&bounds=${coor}&time=${that.time}`,
    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  .then(res => {
    res = res.data;
    if (res.code !== 0) return;
    resCallBack(res.result.features, param, that);
  });
}

export function getFeatureCity(param, that) {
  http({
    url: `${showserver}/rest/current/selectCitysGroup1?wtype=${param}&time=${that.time}`,
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
    }
  })
}

function resCallBack(res, code, that) {
  features = res;
  // 处理json对其进行分类
  var wgradeArr = []; // 分级对照
  var dataArr = [];
  var iconname = null;
  var iconpath = null;
  var stops = null;
  var grades = [];
  var gradetype = null;
  switch (code) {
    case 10800:
      iconname = 'rain';
      iconpath = 'rain';
      gradetype = 0;
      grades = ['108001', '108002', '108003'];
      stops = [
        [grades[0], '#6BC04B'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#A1D784'],
        [grades[2], '#ABDB92']
      ];
      break;
    case 10900:
      iconname = 'wind';
      iconpath = 'wind';
      gradetype = 1;
      grades = ['109001', '109002', '109003'];
      stops = [
        [grades[0], '#FFB35A'], /* 不同的population的值绘制相应的填充颜色 */
        [grades[1], '#FFC37B'],
        [grades[2], '#FFCC8C']
      ];
      break;
  }
  for (var j = 0; j < features.length; j++) {
    let time = parseInt(features[j].properties.timeDiff);
    features[j].properties.timeDiff = time;
    features[j].properties.timeLate = parseInt(features[j].properties.timeLate);
    // 区分等级图标
    let grade = parseInt(features[j].properties.objectGrade) % 100;
    if (grade === 1) {
      features[j].properties.gtype = 1;
      features[j].properties.icon = iconname + '1';
    } else {
      features[j].properties.gtype = 2;
      features[j].properties.icon = iconname + '2';
    }
    // 计算各个天气分级数量
    if (grades[0] === features[j].properties.objectGrade) {
      that.polygonData[gradetype].wgrade1Num += 1;
    } else if (grades[1] === features[j].properties.objectGrade) {
      that.polygonData[gradetype].wgrade2Num += 1;
    } else if (grades[2] === features[j].properties.objectGrade) {
      that.polygonData[gradetype].wgrade3Num += 1;
    }
    that.polygonData[gradetype].polygonNum += 1;

    dataArr.push(features[j].properties)
  }
  that.rightFromData = that.rightFromData.concat(dataArr); // 右侧列表数据来源
  if (map.getSource(iconname)) {
    map.removeLayer(iconname);
    map.removeLayer(iconname + 'icon');
    map.removeSource(iconname);
  }
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
  map.loadImage('static/icon/wtype/' + iconpath + '2.png', function (error, image) {
    if (error) throw error;
    let iname = iconname + '2';
    if (map.hasImage(iname)) {
      map.removeImage(iname)
    }
    map.addImage(iname, image);
    map.addLayer({
      'id': iconname + 'icon',
      'type': 'symbol',
      'source': iconname,
      'maxzoom': 10,
      'layout': {
        'icon-image': '{icon}',
        'icon-size': 0.5
      },
      'paint': {}
    });
  });
  if (that.initMap) {
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
  // loadMakers(that);
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

export function showPolygon(wgid) {
  let coor = null;
  features.forEach((itm, idx) => {
    if (itm.properties.wgid === wgid) {
      coor = itm.geometry.coordinates[0];
    }
  });
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
