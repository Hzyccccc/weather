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
        车牌所属地：
        <el-select v-model="brandId">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        报险地：
        <el-select v-model="brandId">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="brandId">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input style="width: 30%; margin-left: 5%" prefix-icon="el-icon-search" clearable></el-input>
      </el-row>
      <br/>
      <el-row>
        查询时段:
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
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </el-row>
      <el-row class="table_div">
        <el-table :data='tableData' border>
          <el-table-column label="车辆品牌" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.a }}</span>
            </template>
          </el-table-column>
          <el-table-column label="车辆号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.b }}</span>
            </template>
          </el-table-column>
          <el-table-column label="VIN码" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.c }}</span>
            </template>
          </el-table-column>
          <el-table-column label="查询时间" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.d }}</span>
            </template>
          </el-table-column>
          <el-table-column label="出险地点" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.e }}</span>
            </template>
          </el-table-column>
          <el-table-column label="天气轨迹" align="center">
            <template slot-scope="scope">
              <el-button @click="openDetails">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <el-dialog title="历史详情" :visible.sync="openDetailsVisible" :close-on-click-modal="false"
                 custom-class="user-details" :modal="false" align="center">
        <template>
          <el-row style="display: flex;font-size: small;background-color: rgb(242,242,242);height: 50px;line-height: 50px">
            <div class="dialog_span">品牌:<span>丰田</span></div>
            <div class="dialog_span">车牌号：<span>京A2908</span></div>
            <div class="dialog_span">车辆VIN码: <span>GM21799832</span></div>
            <div class="dialog_span">查询时间：<span>2019年6月2日</span></div>
            <div class="dialog_span">报险地点：<span>北京市海淀区北京师范大学</span></div>
          </el-row>
          <br/><br/>
          <el-row class="map_div">
            <div id="container" style="width:100%;height:100%;"></div>
          </el-row>
        </template>
      </el-dialog>
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
        brandId: undefined,
        tableData: [{
          a: '丰田',
          b: '京A2908',
          c: 'GM21799832',
          d: '2019年6月2日',
          e: '北京市海淀区北京师范大学'
        }],
        openDetailsVisible: false
      }
    },
    methods: {
      // openDetails() {
      //   this.openDetailsVisible = true
      //   TMap('KVTBZ-MKTWF-MSXJ7-NLA5A-SJ5XV-OABTJ').then(qq => {
      //     var map = new qq.maps.Map(document.getElementById('container'), {
      //       // 地图的中心地理坐标。
      //       center: new qq.maps.LatLng(39.916527, 116.397128),
      //       zoom: 12
      //     })
      //   })
      // }
    }
  };
</script>
<style lang="scss" scoped>
  .index {
    margin-top: 2%;
  }

  .input_div {
    margin: 0 1%;
    width: 17%;
  }

  .table_div {
    margin-top: 2%;
  }

  .dialog_span {
    margin: 0 2%;
  }

  .map_div {
    margin-top: 2%;
    width: 100%;
    height: 620px;
  }

</style>
