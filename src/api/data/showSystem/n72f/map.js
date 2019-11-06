import http from 'src/http.js'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import areaData from 'src/data/areaid_list_v3.1.json'

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
  let levels = ',' + that.districten.join(',') + ',';
  let gdata = JSON.parse(JSON.stringify(areaData));
  let features = gdata.features;
  let areaIds = [];
  let showfts = [];
  for (let i = 0; i < features.length; i++) {
    let obj = features[i];
    let dtype = obj.properties.level;
    if (levels.indexOf(',' + dtype + ',') > -1) {
      areaIds.push(obj.properties.areaid);
      showfts.push(obj);
    }
  }
  gdata.features = showfts;
  http({
    method: 'post',
    url: `${that.SERVER}/rest/n72f/selectWeatherByAreaId`,
    data: {'spid': that.spid, 'areaIds': areaIds, tname: that.tname},
    timeout: 60000
  }).then(function (res) {
    if (res.code === 0 && res.result.length > 0) {
      let ent = res.result;
      let csAreas = [];
      for (let i = 0; i < ent.length; i++) {
        csAreas.push(ent[i].areaid);
        if (ent[i].weather === 301) ent[i].weather = 999;
      }
      features = gdata.features;
      for (let i = 0; i < features.length; i++) {
        let obj2 = features[i];
        let areaid = JSON.stringify(obj2.properties.areaid);
        for (let j = 0; j < ent.length; j++) {
          if (areaid === ent[j].areaid) {
            obj2.properties.weather = ent[j].weather;
            obj2.properties.temp = ent[j].temp;
            break;
          } else {
            obj2.properties.weather = 999;
            obj2.properties.temp = '30';
          }
        }
      }

      if (map.getSource('tempLayer')) {
        map.getSource('tempLayer').setData(gdata);
      } else {
        // 声明geo
        map.addSource('tempLayer', {
          'type': 'geojson',
          'data': gdata
        });
        gdata.features.forEach(function(obj, itm) {
          let weather = obj.properties.weather;
          map.loadImage('static/image/' + weather + '.png', function (error, image) {
            if (error) throw error;
            if (!map.hasImage(weather)) {
              map.addImage(weather, image);
            }
            if (itm === gdata.features.length - 1) {
              map.addLayer({
                'id': 'tempLayer',
                'type': 'symbol',
                'source': 'tempLayer',
                'layout': {
                  'icon-image': '{weather}',
                  'icon-size': 0.8,
                  'text-field': '{NAMECN}:{temp}℃',
                  'icon-allow-overlap': true,
                  // 'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                  'text-allow-overlap': true,
                  'text-size': 11,
                  'text-transform': 'uppercase',
                  'text-letter-spacing': 0.05,
                  'text-offset': [4, 0]
                },
                'paint': {
                  // 'text-color': 'black'
                }
              });
            }
          });
        });

        // 添加geo图层
        /* map.addLayer({
          'id': 'tempLayer',
          'type': 'symbol',
          'source': 'tempLayer',
          'layout': {
            'text-field': '{NAMECN}:{temp}℃',
            'icon-allow-overlap': true,
            // 'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 11,
            'text-transform': 'uppercase',
            'text-letter-spacing': 0.05,
            'text-offset': [4, 0]
          },
          'paint': {
            // 'text-color': 'black'
          }
        }); */
      }

      that.markers.forEach(function (obj) {
        obj.remove();
      });
      /* that.markers = [];
      gdata.features.forEach(function(obj) {
        let weather = obj.properties.weather;
        let div = document.createElement('div');
        div.className = 'weather_div';
        div.style.backgroundImage = `url('static/image/${weather}.png')`;
        div.style.backgroundSize = '24px 24px';
        div.style.width = '24px';
        div.style.height = '24px';
        let marker = new mapboxgl.Marker(div);
        marker.setLngLat(obj.geometry.coordinates).addTo(map);
        that.markers.push(marker);
      }) */
    } else {
      if (map.getSource('tempLayer')) {
        map.removeLayer('tempLayer');
        map.removeSource('tempLayer');
      }
      that.markers.forEach(function (obj) {
        obj.remove();
      });
    }
  });
}
