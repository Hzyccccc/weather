<template>
  <div class="index">
    <el-card>
      <el-row>
        区域：
        <el-radio-group v-model="area">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="华北"></el-radio-button>
          <el-radio-button label="华南"></el-radio-button>
          <el-radio-button label="华中"></el-radio-button>
          <el-radio-button label="东南"></el-radio-button>
          <el-radio-button label="东北"></el-radio-button>
          <el-radio-button label="西北"></el-radio-button>
          <el-radio-button label="西南"></el-radio-button>
        </el-radio-group>
      </el-row>
      <br/>
      <el-row>
        省份：
        <el-select v-model="brandId" class="select_div">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        城市：
        <el-select v-model="brandId" class="select_div">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        区/县：
        <el-select v-model="brandId" class="select_div">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        品牌：
        <el-select v-model="brandId" class="select_div">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        车型：
        <el-select v-model="brandId" class="select_div">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        发生时间：
        <el-select v-model="brandId" class="select_div">
          <el-option
            v-for="(item,index) in brandList"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <br/>
      <el-row>
        紧急度：
        <el-radio-group v-model="area">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="中"></el-radio-button>
          <el-radio-button label="低"></el-radio-button>
        </el-radio-group>
      </el-row>
      <br/>
      <el-row>
        灾害类型：
        <el-radio-group v-model="area">
          <el-radio-button label="不限"></el-radio-button>
          <el-radio-button label="冰雹"></el-radio-button>
          <el-radio-button label="强雨"></el-radio-button>
        </el-radio-group>
      </el-row>
      <br/>
      <el-row>
        <el-table :data='tableData' border>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import ElRadioButton from 'element-ui/packages/radio/src/radio-button';

  export default {
    components: {ElRadioButton},
    data() {
      return {
        area: '不限',
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
        tableData: undefined
      }
    }
  };
</script>
<style lang="scss" scoped>
  .index {
    margin-top: 2%;
  }

  .input_div {
    margin: 0 1%;
    width: 12%;
  }

  .select_div {
    width: 9%;
    margin-right: 1%;
  }

</style>
