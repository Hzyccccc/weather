<template>
  <div id="root" class="root">
    <div class="top-block">
      <el-row :gutter="20" style="margin-top: 20px">
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
        <el-col :span="3">
          <div style="border: 1px solid red;height: 80px">

          </div>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20" style="margin-top: 20px;height: 100%;">
      <el-col :span="20" style="height: 100%">
        <el-card class="map-div">
          <div ref="basicMapbox" style="height: 600px;"></div>
        </el-card>
      </el-col>
      <el-col :span="4" style="height: 100%">
        <el-card class="right-div">

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import mapboxgl from 'mapbox-gl'

  var map;
  export default {
    name: 'root',
    mounted() {
      this.init()
    },
    methods: {
      init() {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHd0aW1lcyIsImEiOiJjanl4c2tkdnYwenVuM210YXhjdGg3OTljIn0.4hACBWooh6zXxfUFoOo1jw'
        var imageURL = 'http://t0.tianditu.gov.cn/img_w/wmts?' +
          'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
          '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=34bf05f5c6f63bf558240af5dea1026a';
        map = new mapboxgl.Map({
          container: this.$refs.basicMapbox,
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
        })
      }
    }
  }
</script>

<style scoped>
  .root {
    width: 100%;
    height: 100%;
  }

  .map-div {
    height: 80%;
    border: 1px solid black;
  }

  .right-div {
    height: 80%;
    border: 1px solid black;
  }
  #root>>>.menu-wrapper{
    top: 65px!important;
  }
</style>
