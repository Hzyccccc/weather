import http from 'src/http.js'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import {showserver} from 'src/main';

export var map;
var y0 = 0;
var x0 = 70;
var splitNum = 0.05;
mapboxgl.accessToken = 'pk.eyJ1IjoidHd0aW1lcyIsImEiOiJjanl4c2tkdnYwenVuM210YXhjdGg3OTljIn0.4hACBWooh6zXxfUFoOo1jw'
var imageURL = 'http://t0.tianditu.gov.cn/vec_w/wmts?' +
  'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
  '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
var cavURL = 'http://t0.tianditu.gov.cn/cva_w/wmts?' +
    'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
    '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
export function init(that) {
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
    // style: 'mapbox://styles/mapbox/satellite-v9',
    center: [106.523443, 33.284631], // 设置地图中心
    zoom: 4 ,// 设置地图比例
    pitchWithRotate: false,
    dragRotate: false
  });
  // 设置语言
  var language = new MapboxLanguage({defaultLanguage: 'zh'});
  map.addControl(new mapboxgl.ScaleControl());
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(language);
  // 使用定位模块
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    zoom: 8
  }));
  map.on('load', function () {
    var bounds = map.getBounds();
    that.coor = bounds._ne.lng + ',' + bounds._ne.lat + ',' +
      bounds._sw.lng + ',' + bounds._sw.lat;
    that.mqpfChange();
  });
  map.on('dragend', function () {
    var bounds = map.getBounds();
    that.coor = bounds._ne.lng + ',' + bounds._ne.lat + ',' +
      bounds._sw.lng + ',' + bounds._sw.lat;
    that.mqpfChange();
  })
}

export function getDataByBox(url, that) {
  switch (that.mqpf) {
    case 'mqf' : url = `${showserver}/rest/grb2/his/getMqfInBox`;
      break;
    case 'temp' : url = `${showserver}/rest/grb2/his/getTempInBox`;
      break;
    case 'uv' : url = `${showserver}/rest/grb2/his/getUVInBox`;
      break;
  }
  http({
    method: 'post',
    url: url,
    data: {'coor': that.coor, 'curpage': that.curpage, 'pagesize': that.pagesize, 'tname': that.tname},
    timeout: 60000
  }).then(function (response) {
    if (response.code !== 0) return;
    let res = response.result.list;
    that.total = response.pages;
    var geoJson = {
      'type': 'FeatureCollection',
      'features': []
    };
    // 存储geo
    let max = 0;
    let min = 9999;
    for (var i = 0; i < res.length; i++) {
      var rid = res[i].rid;
      var cid = res[i].cid;
      var crV0 = res[i].val;
      if (max < crV0) {
        max = crV0;
      }
      if (min > crV0) {
        min = crV0;
      }
      var xLeftTop = x0 + ((cid) * splitNum);
      var yLeftTop = y0 + ((rid) * splitNum);
      var xRightBottom = x0 + ((cid + 1) * splitNum);
      var yRightBottom = y0 + ((rid + 1) * splitNum);
      var LeftTop = [xLeftTop, yLeftTop];
      var leftBottom = [xRightBottom, yLeftTop];
      var RightTop = [xLeftTop, yRightBottom];
      var RightBottom = [xRightBottom, yRightBottom];
      geoJson.features.push({
        'type': 'Feature',
        'geometry': {'type': 'Polygon', 'coordinates': [[LeftTop, RightTop, RightBottom, leftBottom, LeftTop]]},
        'properties': {'crV0': Math.floor(crV0)},
        'id': i
      });
    }
    let weight = Math.round((max - min) / 10);
    let stops = [/* Property function */
      [min, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
      [min + 1 * weight, '#EED322'],
      [min + 2 * weight, '#E6B71E'],
      [min + 3 * weight, '#DA9C20'],
      [min + 4 * weight, '#CA8323'],
      [min + 5 * weight, '#B86B25'],
      [min + 6 * weight, '#A25626'],
      [max, '#723122']
    ];
    if (!map.getSource('states')) {
      // 声明geo
      map.addSource('states', {
        'type': 'geojson',
        'data': geoJson
      });
      // 添加geo图层
      map.addLayer({
        'id': 'mapGeoLayer',
        'type': 'fill',
        'source': 'states',
        'minzoom': 4,
        'layout': {},
        'paint': {
          'fill-color': {
            property: 'crV0', /* 函数的输入来源，population属性值 */
            stops: stops
          },
          'fill-opacity': 0.75           /* 填充透明度 */
        }
      })
    } else {
      map.getSource('states').setData(geoJson);
      map.setPaintProperty('mapGeoLayer', 'fill-color', {'property': 'crV0', 'stops': stops});
    }
    if (that.curpage < that.total) {
      that.curpage++;
      that.mqpfChange();
    } else {
      that.curpage = 1;
    }
  })
}


