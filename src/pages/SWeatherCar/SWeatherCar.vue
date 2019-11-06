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
          <div ref="map"></div>
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
  export default {
    name: 'root',
    mounted() {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .root {
    width: 100%;
    height: 100%;
  }

  .map-div {
    height: 80%;
    border: 1px solid black;
  }
  .right-div{
    height: 80%;
    border: 1px solid black;
  }
</style>
