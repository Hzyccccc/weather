import http from 'src/http.js'
import {showserver} from 'src/main.js'
import {map} from 'src/api/data/showSystem/ncRealtime/map';

var y0 = 53.56064;
var x0 = 73.446307;
var pointList = [];
export function getAll(param, that) {
  http({
    url: showserver + '/rest/wmiMqpF/getAll',
    method: 'post',
    data: param
  }).then(res => {
    if (res.code === 0) {
      pointList = res.result.list;
      that.pages = res.result.pages;
      var geoJson = {
        'type': 'FeatureCollection',
        'features': []
      };
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
      // 声明geo
      map.addSource('states', {
        'type': 'geojson',
        'data': geoJson
      });
      switch (that.getAllForm.typeCode) {
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
          that.max = 2
          that.min = 0
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
          that.max = 8
          that.min = 0
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
          that.max = 3
          that.min = 1
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
          that.max = 1800
          that.min = 0
          break;
      }
      if (that.getAllForm.currentpage < that.pages) {
        that.getAllForm.currentpage++;
        that.getAll()
      } else {
        that.getAllForm.currentpage = 1
      }
    }
  })
}

export function getAll2(param, that) {
  param.curpage = param.currentpage;
  let stops = null;
  switch (that.getAllForm.typeCode) {
    case 1:
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
      param.tname = 'qpf_' + that.tname;
      break;
    case 2:
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
      param.tname = 'cr_' + that.tname;
      break;
    case 3:
      stops = [
        [1, '#F2F12D'],
        [2, '#B86B25'],
        [3, '#723122']
      ];
      that.max = 3;
      that.min = 1;
      param.tname = 'phase_' + that.tname;
      break;
    case 4:
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
      param.tname = 'uv_' + that.tname;
      break;
  }
  http({
    url: showserver + '/rest/nc/real/getMqpf',
    method: 'post',
    data: param
  }).then(res => {
    if (res.code === 0) {
      pointList = res.result.list;
      that.pages = res.result.pages;
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
        'layout': {},
        'paint': {
          'fill-color': {
            property: 'v0', /* 函数的输入来源，population属性值 */
            stops: stops
          },
          'fill-opacity': 0.35           /* 填充透明度 */
        }
      });
      if (that.getAllForm.currentpage < that.pages) {
        that.getAllForm.currentpage++;
        that.getAll()
      } else {
        that.getAllForm.currentpage = 1
      }
    }
  })
}

export function getRealTimeData(param) {
  return http({
    url: showserver + '/rest/wmiMqpF/getRealTimeData',
    method: 'post',
    data: param
  })
}

