import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import {getAll2} from 'src/api/data/showSystem/ncHis/index'

export var map;
var y0 = 53.56064;
var x0 = 73.446307;
export function init(that) {
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
    // style: 'mapbox://styles/mapbox/satellite-v9',
    center: [106.523443, 33.284631], // 设置地图中心
    zoom: 4, // 设置地图比例
    pitchWithRotate: false,
    dragRotate: false
  });
  // 设置语言
  var language = new MapboxLanguage({defaultLanguage: 'zh'});
  map.addControl(language);
  map.addControl(new mapboxgl.ScaleControl());
  map.addControl(new mapboxgl.NavigationControl());
  // 使用定位模块
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    zoom: 14
  }));
  map.on('dragend', function (res) {
    map.removeLayer('mapGeoLayer');
    map.removeSource('states');
    getBounds(that);
    getAll2(that.getAllForm, that);
  });
  getBounds(that);
  getAll2(that.getAllForm, that);
}

function getBounds(that) {
  // 获取当前视距的数据范围
  var startY = map.getBounds()._ne.lat;
  var startX = map.getBounds()._sw.lng;
  var endY = map.getBounds()._sw.lat;
  var endX = map.getBounds()._ne.lng;
  that.getAllForm.startRid = Math.floor((y0 - startY) / 0.01);
  that.getAllForm.startCid = Math.floor((startX - x0) / 0.01);
  that.getAllForm.endRid = Math.floor((y0 - endY) / 0.01);
  that.getAllForm.endCid = Math.floor((endX - x0) / 0.01);
}


