import http from 'src/http.js'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import {showserver} from 'src/main.js'

export var map;
var y0 = 53.56064;
var x0 = 73.446307;
var param = {curpage: 1, pagesize: 100000};
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
    zoom: 4, // 设置地图比例
    pitchWithRotate: false,
    dragRotate: false
  });
  // 设置语言
  var language = new MapboxLanguage({defaultLanguage: 'zh'});
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(language);
  // 使用定位模块
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    zoom: 5
  }));
  map.on('load', function () {
    loadScw(that);
  });

  map.on('click', 'mapDistributionLayer', function (e) {
    // console.log(e.features[0].geometry.coordinates);
    let coordinates = e.features[0].geometry.coordinates[0];
    that.coor = coordinates.join(',');
    let alllng = [];
    let alllat = [];
    for (let i = 0; i < coordinates.length; i++) {
      alllng.push(coordinates[i][0]);
      alllat.push(coordinates[i][1]);
    }
    that.bounds = new mapboxgl.LngLatBounds(
      new mapboxgl.LngLat(Math.max.apply(null, alllng), Math.max.apply(null, alllat)),
      new mapboxgl.LngLat(Math.min.apply(null, alllng), Math.min.apply(null, alllat))
    );
    that.dialogVisible = true;
  });

  map.on('mouseenter', 'mapDistributionLayer', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
}

export function loadScw(that) {
  let dtypestr = ',' + that.dtypes.join(',') + ',';
  let wtypestr = ',' + that.wtypes.join(',') + ',';
  let tname = that.tname.split('_')[0];
  let spid = that.tname.split('_')[1];
  http({
    url: `${showserver}/rest/scw/getWmiScwByTime`,
    method: 'post',
    data: {'tname': tname, 'spid': spid}
  }).then(res => {
    if (res.code !== 0) return;
    let gdata = res.result;
    let features = gdata.features;
    let showfts = [];
    for (let i = 0; i < features.length; i++) {
      let obj = features[i];
      let dtype = obj.properties.dtype;
      let wtype = obj.properties.wtype;
      if (dtypestr.indexOf(',' + dtype + ',') > -1 && wtypestr.indexOf(',' + wtype + ',') > -1) {
        showfts.push(obj);
      }
    }
    gdata.features = showfts;
    if (map.getSource('PolygonData')) {
      map.removeLayer('mapDistributionLayer');
      map.removeSource('PolygonData');
    }
    // 声明geo
    map.addSource('PolygonData', {
      'type': 'geojson',
      'data': gdata
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
            ['rain', 'RGB(102,153,255)'], /* 不同的population的值绘制相应的填充颜色 */
            ['wind', 'RGB(255,0,255)'],
            ['hail', 'RGB(255,0,102)'],
            ['rain_wind', 'RGB(255,102,0)'],
            ['rain_hail', 'RGB(102,153,255)'],
            ['wind_hail', 'RGB(255,0,255)'],
            ['rain_wind_hail', 'RGB(255,0,102)']
          ]
        },
        'fill-opacity': 0.3           /* 填充透明度 */
      }
    });
  });
}

export var diaMap;
export function dialogMap(that) {
  that.mqpf = 'cr';
  if (!diaMap) {
    diaMap = new mapboxgl.Map({
      container: that.$refs.diaMap,
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
      center: [114.3170116505, 30.5310568266], // 设置地图中心
      zoom: 8 // 设置地图比例
    });
    diaMap.on('load', function () {
      getDataByBox2(that);
    })
  } else {
    getDataByBox2(that);
  }
  diaMap.fitBounds(that.bounds, {'linear': true});
}

export function getDataByBox(url, that) {
  http({
    method: 'post',
    url: url,
    data: {'coor': that.coor},
    timeout: 60000
  }).then(function (response) {
    if (response.code !== 0) return;
    let res = response.result;
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
      var xLeftTop = x0 + ((cid) * 0.01);
      var yLeftTop = y0 - ((rid) * 0.01);
      var xRightBottom = x0 + ((cid + 1) * 0.01);
      var yRightBottom = y0 - ((rid + 1) * 0.01);
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
    let weight = Math.round((max - min) / 8);
    let stops = [/* Property function */
      [min, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
      [min + 1 * weight, '#EED322'],
      [min + 2 * weight, '#E6B71E'],
      [min + 3 * weight, '#DA9C20'],
      [min + 4 * weight, '#CA8323'],
      [min + 5 * weight, '#B86B25'],
      [min + 6 * weight, '#A25626'],
      [min + 7 * weight, '#8B4225'],
      [max, '#723122']
    ];
    if (!diaMap.getSource('states')) {
      // 声明geo
      diaMap.addSource('states', {
        'type': 'geojson',
        'data': geoJson
      });
      // 添加geo图层
      diaMap.addLayer({
        'id': 'mapGeoLayer',
        'type': 'fill',
        'source': 'states',
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
      diaMap.getSource('states').setData(geoJson);
      diaMap.setPaintProperty('mapGeoLayer', 'fill-color', {'property': 'crV0', 'stops': stops});
    }
  })
}

var pointList = null;
var pages = 1;
export function getDataByBox2(that) {
  param.coor = that.coor;
  let stops = null;
  switch (that.mqpf) {
    case 'mqf':
      stops = [
        [0, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
        [200, '#EED322'],
        [400, '#E6B71E'],
        [600, '#DA9C20'],
        [800, '#CA8323'],
        [1000, '#B86B25'],
        [1200, '#A25626'],
        [1400, '#8B4225'],
        [1666, '#723122']
      ];
      that.max = 160;
      that.min = 0;
      param.tname = that.tname;
      param.wtype = 'qpf';
      break;
    case 'cr':
      stops = [/* Property function */
        [0, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
        [10, '#EED322'],
        [20, '#E6B71E'],
        [30, '#DA9C20'],
        [40, '#CA8323'],
        [50, '#B86B25'],
        [60, '#A25626'],
        [70, '#8B4225'],
        [80, '#723122']
      ];
      that.max = 8;
      that.min = 0;
      param.tname = that.tname;
      param.wtype = 'cr';
      break;
    case 'ph':
      stops = [
        [1, '#F2F12D'],
        [2, '#B86B25'],
        [3, '#723122']
      ];
      that.max = 3;
      that.min = 1;
      param.tname = that.tname;
      param.wtype = 'ph';
      break;
    case 'uv':
      // 添加geo图层
      stops = [/* Property function */
        [200, '#F2F12D'], /* 不同的population的值绘制相应的填充颜色 */
        [400, '#EED322'],
        [600, '#E6B71E'],
        [800, '#DA9C20'],
        [1000, '#CA8323'],
        [1200, '#B86B25'],
        [1400, '#A25626'],
        [1600, '#8B4225'],
        [1800, '#723122']
      ];
      that.max = 1800;
      that.min = 0;
      param.tname = that.tname;
      param.wtype = 'uv';
      break;
  }
  http({
    url: showserver + '/rest/scw/getMqpfInScw',
    method: 'post',
    data: param
  }).then(res => {
    if (res.code === 0) {
      pointList = res.result.list;
      pages = res.result.pages;
      var geoJson = {
        'type': 'FeatureCollection',
        'features': []
      };
      // 存储geo
      for (var i = 0; i < pointList.length; i++) {
        var rid = pointList[i].rid;
        var cid = pointList[i].cid;
        var v0 = pointList[i].v0;
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
            'v0': v0
          },
          'id': i
        })
      }
      if (diaMap.getSource('states')) {
        diaMap.getSource('states').setData(geoJson);
        diaMap.setPaintProperty('mapGeoLayer', 'fill-color', {'property': 'v0', 'stops': stops});
      } else {
        // 声明geo
        diaMap.addSource('states', {
          'type': 'geojson',
          'data': geoJson
        });
        // 添加geo图层
        diaMap.addLayer({
          'id': 'mapGeoLayer',
          'type': 'fill',
          'source': 'states',
          'layout': {},
          'paint': {
            'fill-color': {
              property: 'v0', /* 函数的输入来源，population属性值 */
              stops: stops
            },
            'fill-opacity': 0.35           /* 填充透明度 */
          }
        });
      }
      if (param.curpage < that.pages) {
        param.curpage++;
        that.mqpfChange()
      } else {
        param.curpage = 1
      }
    }
  })
}


