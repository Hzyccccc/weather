import http from 'src/http.js'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import {showserver} from 'src/main';

export var map;
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
    zoom: 5
  }));
  map.on('load', function () {
    getWeather(that);
  });
}

export function getWeather(that) {
  let tname = that.tname.split('_')[0];
  let spid = that.tname.split('_')[1];
  http({
    url: `${showserver}/rest/tplf/getTplfBytime`,
    method: 'post',
    data: {'tname': tname, 'spid': spid}
  }).then(res => {
    if (res.code !== 0) return;
    let result = res.result;
    let tfdata = null;
    let lon = null;
    let lat = null;
    // that.options = [];
    let points = [];
    if (result[0].circle !== null) {
      lon = result[0].lon;
      lat = result[0].lat;
      that.options.push({'value': result[0].typhname, 'label': result[0].typhname});
      if (result[0].circle != null) {
        tfdata = JSON.parse(result[0].circle);
      }
    }
    // if (that.tplfValue === 'NEOGURI'){
    //   if (result[0].neoguriWhiTplf !== null) {
    //     lon = result[0].neoguriWhiTplf.lon;
    //     lat = result[0].neoguriWhiTplf.lat;
    //     // that.options.push({'value': result[0].neoguriWhiTplf.typhname, 'label': result[0].neoguriWhiTplf.typhname});
    //     if (result[0].neoguriWhiTplf.neoguriCircle != null) {
    //       tfdata = JSON.parse(result[0].neoguriWhiTplf.neoguriCircle);
    //     }
    //   }
    // }else {
    //   if (result[0].bualoiWhiTplf !== null) {
    //     lon = result[0].bualoiWhiTplf.lon;
    //     lat = result[0].bualoiWhiTplf.lat;
    //     // that.options.push({'value': result[0].bualoiWhiTplf.typhname, 'label': result[0].bualoiWhiTplf.typhname});
    //     if (result[0].bualoiWhiTplf.bualoiCircle != null) {
    //       tfdata = JSON.parse(result[0].bualoiWhiTplf.bualoiCircle);
    //     }
    //   }
    // }

    if (map.getLayer('tplfLayer')) {
      map.removeLayer('tplfLayer');
      map.removeSource('tplfLayer');
    }
    if (tfdata != null) {
      // 添加geo图层
      map.addLayer({
        'id': 'tplfLayer',
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
                  'coordinates': tfdata
                }
              }
            ]
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#b3b1a9',
          'fill-opacity': 0.3           /* 填充透明度 */
        }
      });
    }
    that.markers.forEach(function (obj) {
      obj.remove();
    });
    that.markers = [];
    if (lon !== null) {
      let weather = [lon, lat];
      map.setCenter(weather);
      let div = document.createElement('div');
      div.className = 'weather_div';
      div.style.backgroundImage = `url('http://106.15.202.31/test/typhoon.gif')`;
      div.style.backgroundSize = '40px 40px';
      div.style.width = '40px';
      div.style.height = '40px';
      let marker = new mapboxgl.Marker(div);
      marker.setLngLat(weather).addTo(map);
      that.markers.push(marker);
    }
  });
}



