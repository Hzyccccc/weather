import http from 'src/http.js'
import server from 'src/main.js'



export function queryCityPoint(params) {
  return http({
    url: server + '/rest/feature/queryCityPoint?name=' + params,
    // url: 'http://localhost:8083/rest/feature/queryAllCarInfo?wtype=' + params + '&code=' + code,
    method: 'get',
    timeout: 60000
  })
}

export function queryAllCarInfo(params) {
  return http({
    url: server + '/rest/feature/queryAllCarInfo?wtype=' + params,
    // url: 'http://localhost:8083/rest/feature/queryAllCarInfo',
    method: 'get',
    timeout: 60000
  })
}

export function queryAllCarCount() {
  return http({
    url: server + '/rest/feature/queryAllCarCount',
    // url: 'http://localhost:8083/rest/feature/queryAllCarCount',
    method: 'get',
    timeout: 60000
  })
}
export function selectCityCarCount(params, code) {
  return http({
    url: server + '/rest/feature/selectCityCarCount?wtype=' + params,
    // url: 'http://localhost:8083/rest/feature/selectCityCarCount?wtype=' + params,
    method: 'get',
    timeout: 60000
  })
}


export function getAllFeature(params, code) {
  return http({
    url: server + '/rest/feature/selectAllFeature?wtype=' + params,
    // url: 'http://localhost:8083/rest/feature/selectAllFeature?wtype=' + params,
    method: 'get',
    timeout: 60000
  })
}



export function getAll(params, code) {
  return http({
    url: server + '/rest/feature/selectFeature?wtype=' + params + '&code=' + code,
    // url: 'http://localhost:8083/rest/feature/selectFeature?wtype=' + params + '&code=' + code,
    method: 'get',
    timeout: 60000
  })
}



export function getRegionCarNum(wtype, regionCode) {
  return http({
    url: server + '/rest/feature/selectCarNumByRegion?wtype=' + wtype + '&regionCode=' + regionCode,
    // url: 'http://49.232.61.82/aic/carserver/rest/feature/selectCarNumByRegion?wtype=' + wtype + '&regionCode=' + regionCode,
    method: 'get'
  })
}

export function selectAllCarPoint() {
  return http({
    // url: 'http://localhost:8083/rest/feature/selectAllCarPoint',
    // url: 'http://49.232.61.82/aic/carserver/rest/feature/selectAllCarPoint',
    url: server + '/rest/feature/selectAllCarPoint',

    method: 'get'
  })
}

