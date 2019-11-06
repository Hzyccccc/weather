<template>
  <div class="index">
    <el-card>
      <el-row>
        品牌：
        <el-select v-model="brandId">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        车牌号：
        <el-input class="input_div"></el-input>
        车辆VIN码：
        <el-input class="input_div"></el-input>
        时间:
        <el-date-picker
          v-model="brandId"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        -
        <el-date-picker
          v-model="brandId"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-button type="primary">查询轨迹</el-button>
        <el-radio></el-radio>
        显示天气路径
      </el-row>
      <br/>
      <el-row>
        报险地点：
        <el-input style="width: 40%;margin-right: 1%"></el-input>
        <el-button type="primary">显示poi</el-button>
      </el-row>
      <el-row class="map_div">
        <div id="container" style="width:100%;height:100%;"></div>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  // import {TMap} from 'src/api/data/map'

  export default {
    data() {
      return {
        brandList: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }],
        brandId: undefined
      }
    },
    // mounted() {
    //   TMap('KVTBZ-MKTWF-MSXJ7-NLA5A-SJ5XV-OABTJ').then(qq => {
    //     var map = new qq.maps.Map(document.getElementById('container'), {
    //       // 地图的中心地理坐标。
    //       center: new qq.maps.LatLng(39.916527, 116.397128),
    //       zoom: 12
    //     })
    //   })
    // },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .index {
    margin-top: 2%;
  }

  .input_div {
    margin: 0 1%;
    width: 12%;
  }
  .map_div{
    margin-top: 2%;
    width: 100%;
    height: 620px;
  }
</style>
