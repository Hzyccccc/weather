<template>
  <div id="citybox" class="">
    <el-button plain="" @click="showpanel">
      {{currentCity}}
      <i class="el-icon-caret-top el-icon--right" v-if="showcp"></i>
      <i class="el-icon-caret-bottom el-icon--right" v-else></i>
    </el-button>
    <div class="city-panel" v-if="showcp" style="overflow: inherit">
      <header class="city-header">
        <span class="city-current">当前城市：{{currentCity}}</span>
        <!--<span class="city-default">设置为默认城市</span>-->
        <span class="city-panel-close" @click="showcp = false"><i class="el-icon-close"></i></span>
      </header>
      <ul class="city-hotlist">
        <li v-for="(itm, idx) in citydata.cityData.hotCitys" :key="idx" :adcode="itm.adcode" ctype="1"  @click="checkCity">{{itm.name}}</li>
      </ul>
      <section>
        <div class="city-pc-title" style="">
          <span class="city-province-title" :class="onprov?'city-select':''" @click="checkType">按省份</span><span class="city-city-title" :class="onprov?'':'city-select'" @click="checkType">按城市</span>
        </div>
        <div class="city-search" style="z-index: 10000">
          <i class="el-icon-search city-search-logo"></i>
          <el-input type="text" size="mini" class="city-search-suggestion" placeholder="请输入城市" autocomplete="off" clearable @input="citySearch" v-model="inputval"></el-input>
          <div class="result-search" v-if="rshow" style="padding:10px 0 10px 35px;">
            <div v-for="(itm, idx) in searchs" :key="idx" :x="itm.x" :y="itm.y" :cname="itm.name"
                 style="cursor: pointer; white-space:nowrap;overflow: hidden" @click="jumpTo">
              <i class="el-icon-search city-search-logo"></i>
              {{itm.name}}({{itm.spell}})
            </div>
          </div>
        </div>
      </section>
      <section class="city-list">
        <ul class="city-province-letter">
          <li v-for="(itm, idx) in citylist" :key="idx" @click="toScroll" :class="liSelect === idx?'li-select':''">{{idx}}</li>
        </ul>
        <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto;" :style="onprov?'height: 140px':'height: 114px'">
          <el-scrollbar style="height: 100%" id="cityList">
            <template v-if="onprov">
              <dl class="city-province" style="overflow: hidden; width: auto;">
                <template v-for="(itm, idx) in citylist">
                  <template v-for="(itm1, idx1) in itm">
                    <dt :class="`index-${idx}`">{{Object.keys(itm1)[0]}}:</dt>
                    <dd>
                      <li v-for="(itm2, idx2) in itm1[Object.keys(itm1)[0]]" :key="idx2" :adcode="itm2.adcode" ctype="2" @click="checkCity">{{itm2.name}}</li>
                    </dd>
                  </template>
                </template>
              </dl>
            </template>
            <template v-else>
              <dl class="city-city" style="overflow: hidden; width: auto;">
                <template v-for="(itm, idx) in citylist">
                  <dt :class="`index-${idx}`">{{idx}}:</dt>
                  <dd>
                    <li v-for="(itm2, idx2) in itm" :key="idx2" :adcode="itm2.adcode" ctype="2" @click="checkCity">{{itm2.name}}</li>
                  </dd>
                </template>
              </dl>
            </template>
          </el-scrollbar>
          <div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 3px; position: absolute; top: 44px; opacity: 0.4;
                      display: none; border-radius: 7px; z-index: 99; right: 1px; height: 30px;"></div>
          <div class="slimScrollRail" style="width: 3px; height: 100%; position: absolute; top: 0px; display: none;
                      border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
    import citydata from 'src/data/gaode_citys'
    export default {
      name: 'CitySelect',
      data() {
        return {
          currentCity: '全国',
          citydata: citydata.data,
          showcp: false,
          citylist: citydata.data.provinceByLetter,
          onprov: true,
          rshow: false,
          inputval: '',
          searchs: [],
          liSelect: 'A'
        }
      },
      methods: {
        showpanel() {
          this.showcp = !this.showcp;
          this.searchs = [];
          this.rshow = false;
          this.inputval = '';
        },
        checkCity(e) {
          this.currentCity = e.target.innerText;
          this.showcp = false;
          let ctype = e.target.attributes.ctype.value;
          let adcode = e.target.attributes.adcode.value;
          let provinces = null;
          let lon = null;
          let lat = null;
          switch (ctype) {
            case '1':
              provinces = citydata.data.cityData.hotCitys;
              provinces.forEach((itm, idx) => {
                if (adcode === itm.adcode) {
                  lon = itm.x;
                  lat = itm.y;
                }
              });
              break;
            case '2':
              provinces = citydata.data.cityData.provinces;
              let pcode = adcode.substring(0, 2) + '0000';
              let city = provinces[pcode];
              if (provinces[adcode]) {
                lon = city.x;
                lat = city.y;
              } else {
                let cities = city.cities;
                cities.forEach((itm, idx) => {
                  if (adcode === itm.adcode) {
                    lon = itm.x;
                    lat = itm.y;
                  }
                })
              }
              break;
          }
          if (this.currentCity === '全国') {
            this.$emit('tocity', [lon, lat, 0])
          } else {
            this.$emit('tocity', [lon, lat])
          }
        },
        checkType() {
          this.onprov = !this.onprov;
          if (this.onprov) {
            this.citylist = citydata.data.provinceByLetter;
          } else {
            this.citylist = citydata.data.cityByLetter;
          }
        },
        toScroll(e) {
          let top = document.querySelector('.index-' + e.target.innerText).offsetTop;
          // console.log(this.$refs.divScroll);
          this.liSelect = e.target.innerText;
          document.querySelector('#cityList').children[0].scrollTop = top;
        },
        citySearch(e) {
          let keyword = this.inputval;
          if (keyword.length === 0) {
            this.searchs = [];
            this.rshow = false;
            return;
          }
          let provinces = citydata.data.cityData.provinces;
          let cities = [];
          for (let key in provinces) {
            let city = provinces[key];
            if (cities.length > 9) {
              break;
            }
            if (city.spell.toUpperCase().indexOf(keyword.toUpperCase()) > -1 || city.name.indexOf(keyword) > -1) {
              cities.push({'name': city.name, 'spell': city.spell, 'x': city.x, 'y': city.y})
            }
          }
          for (let key in provinces) {
            let city = provinces[key];
            if (cities.length > 9) {
              break;
            }
            let children = city.cities;
            for (let i = 0; i < children.length; i++) {
              city = children[i];
              if (city.spell.toUpperCase().indexOf(keyword.toUpperCase()) > -1 || city.name.indexOf(keyword) > -1) {
                cities.push({'name': city.name, 'spell': city.spell, 'x': city.x, 'y': city.y})
              }
            }
          }
          this.searchs = cities;
          if (cities.length > 0) {
            this.rshow = true;
          }
        },
        jumpTo(e) {
          let lon = e.target.attributes.x.value;
          let lat = e.target.attributes.y.value;
          this.$emit('tocity', [lon, lat]);
          this.currentCity = e.target.attributes.cname.value;
          this.showcp = false;
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/styles/gaode.css";

  #citybox .slimScrollDiv>>>.el-scrollbar__wrap {
    overflow-x: hidden!important;
  }
</style>
