<template xmlns:el-col="http://www.w3.org/1999/html">
  <div class="layout">
    <div class="top_div">
      <div style="height:81px;width: 100%;z-index: -100;background-image: url('static/title-ccc.jpg');line-height: 82px">
        <el-image
          style="width: 100px; display: inline-block; vertical-align: top;margin: 10px 20px;cursor: pointer;"
          src="static/icon/white_bottom_logo.png"
          @click="$router.replace('/')"
        ></el-image>
        <span style="position: absolute;top: 8px;left: 119px;color: #F4F4F4;">| 创新应用中心</span>
        <label style="font-size: 31px;color: white;padding-left:150px">高精短时气象预警平台<i style="font-size:20px;">——恶劣天气预警展示系统</i></label>
        <ul style="display: inline-block;float: right;margin: 0 35px;color:#fff;font-size:26px">
          <li v-if="user" @click="exit" class="user-icon" style="padding: 0;cursor:pointer;">
            <el-dropdown
              :show-timeout="10"
              :hide-timeout="10"
              @command="handleCommand"
              style="padding: 0 15px;color:#fff;">
              <div class="dropdown-content el-dropdown-link">
                <i class="icon el-icon-adm-usersetup" style="font-size:22px"></i>
                <span class="text" style="font-size:22px">{{user.userName}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">{{user.userName}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <!-- <li class="exit-icon" @click="exit" style="cursor:pointer;color:#fff; margin-right: 5px; width:20px;height:20px">
            <i class="icon iconfont el-icon-adm-exit"></i>
          </li> -->
        </ul>
        <!-- <ul style="display: inline-block;float: right;margin-right: 35px;color: white;">
          admin
        </ul>
        <ul style="display: inline-block;float: right;color: rgba(0,0,0,0);margin-right: 15px;
            background-image: url('static/icon/login.png');background-size: contain;background-repeat: no-repeat;
            background-position-y: center">
          aaaa
        </ul> -->
      </div>
    </div>
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}" style="background-color: #DCDCDC;padding-top: 11px;margin-top: 81px;border-right: 1px solid #EBEEF5;">
      <div class="logo-wrapper" style="background-color: #2E2E2E;height: 70px;padding-left: 5px">
        <!-- <div style="font-size: large;font-weight: 600;color: rgb(131,131,131);height: 100%;cursor: pointer;
        background-image: url('static/icon/bad_weather_logo.png'); background-size: 25%;background-position: 7px center;
        background-repeat: no-repeat; line-height: 23px; text-align: right;background-color: rgb(241,241,241)" @click="$router.replace('/')">
          <p style="padding: 5px 15px 0px 0;">高精短时恶劣</p>
          <p style="padding: 5px 15px 0px 0;">天气预警系统</p>
        </div> -->
        <div style="width: 100%;height: 70px;background:#B5B5B5;position: relative;">
            <span style=" position: absolute; top:26px; left:96px;">{{dd}}</span>
            <p style="font-size: 30px;font-weight: 700; float:left;line-height:64px;color:#444446;padding-left:5px">{{currtTime}}</p>
            <p style="padding-top:4px;">{{currtDate}}</p>
           
         
        </div>
      </div>
      <div style="position: absolute;top: 75px;width: 100%;bottom: 0;background:#DCDCDC" class="maxHeight">
        <el-collapse accordion v-model="activeNames" style="background:#DCDCDC">
          <el-collapse-item v-for="(itm, idx) in sideWeather" :key="idx" :name="itm.type" class="minHeight">
            <template slot="title">
              <!-- <el-checkbox v-model="itm.flag" :key="idx" :data="itm.label" @change="adverseChange(itm.flag,itm.label)" style="margin: 0 0 0 10px;"></el-checkbox> -->
              <!-- 实验 -->
              <el-checkbox-group v-model="itm.flag" @change="adverseChange(itm.flag,itm.label)">
                <el-checkbox-button  :label="itm.flag" :key="idx" style="margin-left:10px">
                  <i v-if="wCity[itm.type].length <= 0 && itm.flag === false" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/check/${itm.img6})`}" style="width:14px;height:14px;margin:0;"></i>
                  <i v-if="wCity[itm.type].length > 0 && itm.flag === false" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/check/${itm.img3})`}" style="width:14px;height:14px;margin:0;"></i>
                  <i v-if="wCity[itm.type].length > 0 && itm.flag === true" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/check/${itm.img4})`}" style="width:14px;height:14px;margin:0;"></i>
                  <i v-if="wCity[itm.type].length <= 0 && itm.flag === true" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/check/${itm.img5})`}" style="width:14px;height:14px;margin:0;"></i>
                </el-checkbox-button>
              </el-checkbox-group>
              <i v-if="wCity[itm.type].length > 0" class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/weather/${itm.img1})`}"></i>
              <i v-else class="div_layer_icon el-icon-close" :style="{'background-image': `url(static/icon/weather/${itm.img2})`}"></i>
              <span>{{itm.label}}</span>
            </template>
            <el-tree
              :data="wCity[itm.type]"
              accordion :expand-on-click-node="false"
              @node-click="linkClick"
              :current-node-key="idx"
              >
            </el-tree>
          </el-collapse-item>

        </el-collapse>
         <div class="Typhoon-hzy">

           <!-- <el-checkbox v-model="typhoonFlag" style="margin: 0 0 0 10px;float: left;" @change="changeTyphoonFlag()" ></el-checkbox>
           <i class="typhoon-img" :style="{'background-image': `url(static/icon/weather/hail1.png)`}"></i>

           <span >台风</span> -->
            <el-checkbox-group v-model="typhoonFlag" @change="changeTyphoonFlag()">
                <el-checkbox-button  :label="typhoonFlag" style="margin-left:10px;">
                  <i v-if="typhoonFlag === false && typhoonData.typhoonTotal <= 0" class="div_layer_icon el-icon-close" style="background-image: url(static/icon/check/noText.png);width:14px;height:14px;margin:0;"></i>
                  <i v-if="typhoonFlag === false && typhoonData.typhoonTotal > 0" class="div_layer_icon el-icon-close" style="background-image: url(static/icon/check/wind01.png);width:14px;height:14px;margin:0;"></i>
                  <i v-if="typhoonFlag === true && typhoonData.typhoonTotal > 0" class="div_layer_icon el-icon-close" style="background-image: url(static/icon/check/wind02.png);width:14px;height:14px;margin:0;"></i>
                  <i v-if="typhoonFlag === true && typhoonData.typhoonTotal <= 0" class="div_layer_icon el-icon-close" style="background-image: url(static/icon/check/noMore.png);width:14px;height:14px;margin:0;"></i>

                  <!-- <i v-if="wCity[itm.type].length <= 0 && itm.flag === true" class="div_layer_icon el-icon-close" style="background-image: url(static/icon/check/04.png);width:14px;height:14px;margin:0"></i> -->

                </el-checkbox-button>
              </el-checkbox-group>
              <i v-if="typhoonData.typhoonTotal > 0" class="typhoon-img" :style="{'background-image': `url(static/icon/weather/typhoon1.png)`}"></i>
              <i v-else class="typhoon-img" :style="{'background-image': `url(static/icon/weather/typhoon2.png)`}"></i>
            <span style="position: absolute;top: 0px;left: 78px;">台风</span>
         </div>
      </div>
    </div>
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}" style="top: 0px;overflow-x: auto; background-color: white;margin-top: 81px">
      <el-row :gutter="20" style="min-width: 100%;margin-left: 0px; overflow:hidden">

        <div style="margin: 10px 0 0 0px;width: 140px;display: inline-block">
          <el-card style="background-color: #D2D2D2;text-align: center;" class="top_card">
            <p style="font-size: 30px;font-weight: 700;padding: 12px 0px;">{{sumWeather()}}</p>
            <p>当前恶劣天气数</p>
          </el-card>
        </div>
        <div style="display: inline-block;position: absolute; top: 10px;left: 150px;right: 0; overflow:hidden">
          <el-row :gutter="10" style=" overflow:hidden">
            <el-col :span="3" v-for="(itm, idx) in polygonData" :key="idx" style="min-width: 170px">
              <div class="top_card" style="margin: 0 0 10px 0;padding-left: 55px; white-space: nowrap; "
                   :style="{'background-image': itm.polygonNum>0?'url(static/icon/weather/' + itm.img + '.png)':'url(static/icon/weather/' + itm.img + '_gray.png)'}">
                <div style="height: 85px;padding-left: 0;padding-right: 0">
                  <p class="p_wgrade_lb" style="font-size: 14px"><label class="wgrade_lb">总预警量:</label>{{itm.polygonNum}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">红色一级:</label>{{itm.wgrade1Num}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">橙色一级:</label>{{itm.wgrade2Num}}</p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">橙色二级:</label>{{itm.wgrade3Num}}</p>
                </div>
              </div>
            </el-col>
            <!-- 台风 -->
            <div style="float: right;width: 116px;height:87px;margin: 0 10px 10px 0;padding-left: 60px; white-space: nowrap;background-repeat: no-repeat;
                background-size: contain; box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                border: 1px solid #EBEEF5"
                :style="{'background-image': this.typhoonData.typhoonTotal>0?'url(static/icon/weather/typhoon.png)':'url(static/icon/weather/typhoon_gray.png)'}">
                <div style="height: 85px;padding-left: 0;padding-right: 0">
                  <p class="p_wgrade_lb" style="font-size: 14px"><label class="wgrade_lb">总台风数:{{sumTyphoon()}}</label></p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">超强台风:{{this.typhoonData.typhoon3Num}}</label></p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">强力台风:{{this.typhoonData.typhoon2Num}}</label></p>
                  <p class="p_wgrade_lb"><label class="wgrade_lb">普通台风:{{this.typhoonData.typhoon1Num}}</label></p>
                </div>
              </div>
          </el-row>
        </div>
      </el-row>
      <el-row style="position: absolute; top: 115px;left: 16px; right: 16px; bottom: 16px; z-index: 100; overflow:hidden; " :gutter="20">
        <el-col :span="18" style="height: 100%;">
          <div ref="basicMapbox" style="height: 100%;overflow: hidden;position: relative"></div>
          <city-select style="top: 10px;" @tocity="tocity($event)"></city-select>
        </el-col>
        <el-col :span="6" style="border: 1px solid silver;height: 100%;overflow: hidden;position: relative;padding: 0" id="dataList">
          <el-row style="height: 30px;text-align: center;background-color: #1F69C2; posttion:relative">
            <!-- 发生时间 -->
            <el-col :span="12" style="border-right: 2px solid white;padding: 4px;box-sizing:border-box;cursor: pointer;position:relative;" @click.native="orderOccurTime">
              <el-image
                style="width:24px; position:absolute;top:2px;left:6px"
                src="static/timer.png"
              ></el-image>
              <!-- <span style="background-image:url('static/timer.png')"></span> -->
              <span style="color: white;vertical-align: top;position:absolute;top:5px;left:40px">发生时间</span>
              <i :class="occurTime?'el-icon-caret-bottom':'el-icon-caret-top'" style="font-size: 20px;font-weight: 500;color:#fff;padding-left:100px;"></i>
            </el-col>
            <el-col :span="12" style="padding: 4px;box-sizing:border-box;border-left: 2px solid white;cursor: pointer;position:relative">
              <el-image
                style="width:24px; position:absolute;top:2px;left:6px"
                src="static/test.png"
              ></el-image>
              <span style="color: white;vertical-align: top;position:absolute;top:5px;left:40px;font-size:16px">预警等级</span>
              <el-dropdown trigger="click" :hide-on-click="false">
                  <span class="el-dropdown-link">
                    
                    <!-- <i class="el-icon-s-operation" style="font-size: 20px;font-weight: 500"></i> -->
                    <i :class="occurTime?'el-icon-caret-bottom':'el-icon-caret-top'" style="font-size: 20px;font-weight: 500;color:#fff;padding-left:100px"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                  <el-checkbox-group v-model="alarmList" @change="changeGrade">
                    <el-dropdown-item><el-checkbox label="1">红色一级</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox label="2">橙色一级</el-checkbox></el-dropdown-item>
                    <el-dropdown-item><el-checkbox label="3">橙色二级</el-checkbox></el-dropdown-item>
                  </el-checkbox-group>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <!-- 预警 -->
          <div style="position: absolute;top: 40px;bottom: 0;right: 0px;left: 0;background:#fff" class="colorTest">
            <el-scrollbar style="height: 100%;width:100%" >
              <el-table :stripe= "true" :data="_filterRightData(rightFromData)" style="width: 94%;height: 100%;margin: 0 10px"
                        :show-header="false"  :row-style="{'cursor': 'pointer'}" @row-click="toLocation">
                <!-- 左侧 -->
                <el-table-column class-name="table_cell1" align="center" width="80">
                  <template slot-scope="scope">
                    <div class="block">
                      <el-image v-if="scope.row.objectType === '10800'" style="width: 65%;" :src="`static/icon/wtype/rain${scope.row.gtype}.png`"></el-image>
                      <el-image v-if="scope.row.objectType === '10900'" style="width: 65%;" :src="`static/icon/wtype/wind${scope.row.gtype}.png`"></el-image>
                      <el-image v-if="scope.row.objectType === '11000'" style="width: 65%;" :src="`static/icon/wtype/hail${scope.row.gtype}.png`"></el-image>
                      <el-image v-if="scope.row.objectType === '11100'" style="width: 65%;" :src="`static/icon/wtype/snow${scope.row.gtype}.png`"></el-image>
                      <el-image v-if="scope.row.objectType === '11200'" style="width: 65%;" :src="`static/icon/wtype/fog${scope.row.gtype}.png`"></el-image>
                      <el-image v-if="scope.row.objectType === '11300'" style="width: 65%;" :src="`static/icon/wtype/sanddust${scope.row.gtype}.png`"></el-image>
                    </div>
                    <span  :title="scope.row.objectName"  style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden; ">{{scope.row.objectName}}</span>
                  </template>
                </el-table-column>
                <!-- 右侧 -->
                <el-table-column prop="name" class-name="table_cell2" style="overflow:hidden;" >
                  <template slot-scope="scope">

                    <p :title="scope.row.location"  style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;" >地点: {{scope.row.location}}</p>
                    <p v-if="scope.row.objectGrade === '10801'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 车辆泡水，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '10802'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 刹车缓顿，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '10803'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 视野受限，减速慢行</p>
                    <p v-if="scope.row.objectGrade === '10901'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 道路飓风，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '10902'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 道路强风，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '10903'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 道路横风，减速慢行</p>
                    <p v-if="scope.row.objectGrade === '11001'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 冰雹一级，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '11002'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 冰雹二级，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '11003'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 冰雹三级，减速慢行</p>
                    <p v-if="scope.row.objectGrade === '11101'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 强雪一级，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '11102'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 强雪二级，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '11103'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 强雪三级，减速慢行</p>
                    <!--大雾-->
                    <p v-if="scope.row.objectGrade === '11201'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 大雾一级，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '11202'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 大雾二级，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '11203'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 大雾三级，减速慢行</p>
                    <!--沙尘-->
                    <p v-if="scope.row.objectGrade === '11301'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 沙尘一级，挪车躲避</p>
                    <p v-if="scope.row.objectGrade === '11302'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 沙尘二级，停车躲避</p>
                    <p v-if="scope.row.objectGrade === '11303'" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">危险: 沙尘三级，减速慢行</p>
                    <p v-if="scope.row.timeDiff > 0" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">预计发生时间: {{scope.row.occurtime | _formatDate}}</p>
                    <p v-if="scope.row.timeDiff > 0" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">预计持续时间: 约{{scope.row.duration}}分钟</p>
                    <p v-if="scope.row.timeDiff <= 0" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">发生时间: {{scope.row.occurtime | _formatDate}}</p>
                    <p v-if="scope.row.timeDiff <= 0" style="text-overflow:ellipsis; white-space:nowrap;overflow:hidden;">已经持续时间: {{scope.row.timeDiff | _formatDate3}}</p>
                    <span class="shuy-hzy"></span>
                  </template>
                </el-table-column>

                <!-- <el-table-column width="5"></el-table-column> -->
              </el-table>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="position: fixed;z-index: 1000;display: none" id="label-box">
      <template v-for="(itm, idx) in realFromData">
        <div class="marker-win" style="position: absolute;cursor: pointer;width: auto;" @click="toLocation(itm)"
                @mouseenter="showPopup(idx)" @mouseleave="showPopup(idx)"
                :style="{'z-index': itm.wgid === checkWgid ?100:0, 'width': itm.timeDiff>0?'152px':'', 'border':borderfiter(itm.timeDiff)}">
          <div>
            <div style="width: 50px;padding: 0">
              <el-image v-if="itm.objectType === '10800'" style="width: 100%;" :src="`static/icon/wtype/rain${itm.gtype}.png`"></el-image>
              <el-image v-if="itm.objectType === '10900'" style="width: 100%;" :src="`static/icon/wtype/wind${itm.gtype}.png`"></el-image>
              <el-image v-if="itm.objectType === '11000'" style="width: 100%;" :src="`static/icon/wtype/hail${itm.gtype}.png`"></el-image>
              <el-image v-if="itm.objectType === '11100'" style="width: 100%;" :src="`static/icon/wtype/snow${itm.gtype}.png`"></el-image>
              <el-image v-if="itm.objectType === '11200'" style="width: 100%;" :src="`static/icon/wtype/fog${itm.gtype}.png`"></el-image>
              <el-image v-if="itm.objectType === '11300'" style="width: 100%;" :src="`static/icon/wtype/sanddust${itm.gtype}.png`"></el-image>
              <div v-if="itm.timeDiff > 0" style="width: 50px;text-align: center;color: rgb(125,125,125);">
                <p style="font-size: 12px;font-weight: 700;background-color: rgb(228,228,228);padding: 5px 0;border-radius: 11px">预警中</p>
              </div>
              <div v-else style="width: 50px;text-align: center;color: rgb(125,125,125);">
                <p style="font-size: 12px;font-weight: 700;background-color: rgb(228,228,228);padding: 5px 0;border-radius: 11px">发生中</p>
              </div>
            </div>
            <div v-if="itm.timeDiff > 0" style="width: 96px;text-align: center">
              <p style="font-weight: 700;font-size: 17px;padding: 7px 0"
                 :style="{'color': colorfiter(itm.timeDiff)}">{{itm.timeDiff | _formatDate2}}</p>
              <p style="font-size: 12px">距离发生时间还剩</p>
              <div style="width: 100%">
                <el-progress style="display: block" :percentage="(itm.timeDiff / itm.timeLate * 100) | _percentage"
                             :show-text="false" :color="colorfiter(itm.timeDiff)"></el-progress>
              </div>
            </div>
            <!--<div v-if="itm.timeDiff > 0" style="width: 100%">
              <el-progress style="display: block" :percentage="(itm.timeDiff / itm.timeLate * 100) | _percentage"
                           :show-text="false" :color="colorfiter(itm.timeDiff)"></el-progress>
            </div>-->
          </div>
        </div>
        <el-row class="popup-win" style="background-image: url('static/icon/context.png');position: absolute;width: 300px">
          <el-col class="popup-win-img" v-if="itm.objectType === '10800'"
                   :style="{'background-image': `url(static/icon/wtype/rain${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <el-col class="popup-win-img" v-if="itm.objectType === '10900'"
                   :style="{'background-image': `url(static/icon/wtype/wind${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <el-col class="popup-win-img" v-if="itm.objectType === '11000'"
                  :style="{'background-image': `url(static/icon/wtype/hail${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <el-col class="popup-win-img" v-if="itm.objectType === '11100'"
                  :style="{'background-image': `url(static/icon/wtype/snow${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <!--大雾-->
          <el-col class="popup-win-img" v-if="itm.objectType === '11200'"
                  :style="{'background-image': `url(static/icon/wtype/fog${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <!--沙尘-->
          <el-col class="popup-win-img" v-if="itm.objectType === '11300'"
                  :style="{'background-image': `url(static/icon/wtype/sanddust${itm.gtype}.png)`}">
            <span style="font-size: 12px">{{itm.objectName}}</span>
          </el-col>
          <el-col style="width: 220px;padding: 0 0 0 5px;font-size: 12px;white-space: nowrap;overflow: hidden">
            <p>地点: {{itm.location}}</p>
            <p v-if="itm.objectGrade === '10801'">危险: 车辆泡水，挪车躲避</p>
            <p v-if="itm.objectGrade === '10802'">危险: 刹车缓顿，停车躲避</p>
            <p v-if="itm.objectGrade === '10803'">危险: 视野受限，减速慢行</p>
            <p v-if="itm.objectGrade === '10901'">危险: 道路飓风，挪车躲避</p>
            <p v-if="itm.objectGrade === '10902'">危险: 道路强风，停车躲避</p>
            <p v-if="itm.objectGrade === '10903'">危险: 道路横风，减速慢行</p>
            <p v-if="itm.objectGrade === '11001'">危险: 冰雹一级，挪车躲避</p>
            <p v-if="itm.objectGrade === '11002'">危险: 冰雹二级，停车躲避</p>
            <p v-if="itm.objectGrade === '11003'">危险: 冰雹三级，减速慢行</p>
            <p v-if="itm.objectGrade === '11101'">危险: 强雪一级，挪车躲避</p>
            <p v-if="itm.objectGrade === '11102'">危险: 强雪二级，停车躲避</p>
            <p v-if="itm.objectGrade === '11103'">危险: 强雪三级，减速慢行</p>
            <!--大雾-->
            <p v-if="itm.objectGrade === '11201'">危险: 道路大雾，挪车躲避</p>
            <p v-if="itm.objectGrade === '11202'">危险: 大雾二级，停车躲避</p>
            <p v-if="itm.objectGrade === '11203'">危险: 大雾三级，减速慢行</p>
            <!--沙尘-->
            <p v-if="itm.objectGrade === '11301'">危险: 道路沙尘，挪车躲避</p>
            <p v-if="itm.objectGrade === '11302'">危险: 沙尘二级，停车躲避</p>
            <p v-if="itm.objectGrade === '11303'">危险: 沙尘三级，减速慢行</p>

            <p v-if="itm.timeDiff > 0">预计发生时间: {{itm.occurtime | _formatDate}}</p>
            <p v-if="itm.timeDiff > 0">预计持续时间: 约{{itm.duration}}分钟</p>
            <p v-if="itm.timeDiff <= 0">发生时间: {{itm.occurtime | _formatDate}}</p>
            <p v-if="itm.timeDiff <= 0">已经持续时间: {{itm.timeDiff | _formatDate3}}</p>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>
<script>
  import {sessionStorage} from 'src/assets/js/storage';
  import ElImage from 'element-ui/packages/image/src/main';
  import ElRadioGroup from 'element-ui/packages/radio/src/radio-group';
  import {formatDate} from 'src/api/data/showSystem/main';
  import cities from 'src/data/city_center2.json';
  import {map, loadMap, getFeature, getFeatureCity, togglePopup, showPolygon, clearMarkers, getTyphoon} from 'src/api/data/SweatherCarMain/hpsAdverse';
  import CitySelect from '../home/cityselect';

  export default {
    components: {
      CitySelect,
      ElRadioGroup,
      ElImage
    },
    created() {
      // this.checkAuth();
    },
    data() {
      return {
        colorList:["#FFB35A","#FFB35A","#FFB35A","#FFB35A","#FFB35A","#FFB35A","#FFB35A"],
        dd: null,
        // 台风
        typhoonFlag: true,
        checkList: [],
        rightFromData: [],
        realFromData: [],
        AutoUpdates: undefined,
        isdycupdate: false,
        menuRadio: ['1', '2', '3', '4', '5', '6', '7', '8'],
        isCollapsed: false,
        updatetime: '10:00:00',
        wCity: {
          'rain': [],
          'wind': [],
          'hail': [],
          'snow': [],
          'fog': [],
          'sanddust': [],
          'freeze': []
        },
        polygonData: [
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '暴雨', color: 'rgb(50,89,34)', img: 'bigrain'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '大风', color: 'rgb(147,102,52)', img: 'bigwind'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '冰雹', color: 'rgb(96,44,108)', img: 'hail'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '大雪', color: 'rgb(0,113,207)', img: 'bigsnow'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '大雾', color: 'rgb(0,122,117)', img: 'bigfog'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '沙尘', color: 'rgb(153,131,9)', img: 'sanddust'},
          {wgrade1Num: 0, wgrade2Num: 0, wgrade3Num: 0, polygonNum: 0, polygonName: '结冰', color: 'rgb(170,56,79)', img: 'freeze'}
        ],
        sideWeather: [
          {'type': 'rain', 'label': '强雨', 'img1': 'bigrain1.png', 'img2': 'bigrain2.jpg','img3': 'rain01.png','img4': 'rain02.png','img5': 'noMore.png','img6': 'noText.png',flag: true},
          {'type': 'wind', 'label': '强风', 'img1': 'bigwind1.png', 'img2': 'bigwind2.png','img3': 'wind01.png','img4': 'wind02.png','img5': 'noMore.png','img6': 'noText.png', flag: true},
          {'type': 'hail', 'label': '冰雹', 'img1': 'hail1.png', 'img2': 'hail2.png','img3': 'hail01.png','img4': 'hail02.png','img5': 'noMore.png','img6': 'noText.png',flag: true},
          {'type': 'snow', 'label': '强雪', 'img1': 'bigsnow1.png', 'img2': 'bigsnow2.png','img3': 'snow01.png','img4': 'snow02.png','img5': 'noMore.png','img6': 'noText.png',flag: true},
          {'type': 'fog', 'label': '大雾', 'img1': 'bigfog1.png', 'img2': 'bigfog2.png','img3': 'fog01.png','img4': 'fog02.png','img5': 'noMore.png','img6': 'noText.png',flag: true},
          {'type': 'sanddust', 'label': '沙尘', 'img1': 'sanddust1.png', 'img2': 'sanddust2.png','img3': 'dust01.png','img4': 'dust02.png','img5': 'noMore.png','img6': 'noText.png',flag: true},
          {'type': 'freeze', 'label': '道路结冰', 'img1': 'freeze1.png', 'img2': 'freeze2.png','img3': 'freeze01.png','img4': 'freeze02.png','img5': 'noMore.png','img6': 'noText.png',flag: true}
        ],
        // sumWeather: 10,
        tname: null,
        releaseTime: null,
        currtDate: null,
        currtTime: null,
        activeNames: 'rain',
        occurTime: true,
        alarmList: ['1', '2', '3'],
        checkCity: null,
        checkWgid: null,
        sideList: ['rain'],
        initMap: true,
        initMaps: [-1, -1, -1, -1, -1, -1],
        timer: null,
        value: [true, true, true, true, true, true],
        id: ['强雨', '强风', '冰雹', '强雪', '大雾', '沙尘'],
        currentTime: [],
        markers: [],
        // 台风等级数量
        typhoonData: {
          'typhoon1Num': 0, 'typhoon2Num': 0, 'typhoon3Num': 0, 'typhoonTotal': 0
        },
        tfName:[]
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
      this.initTime();
      this.init();
      this.timer = setInterval(this.initTime, 20000);
    },
    beforeDestroy() {
       clearInterval(this.timer);
    },
    methods: {
      // 获取当前时间
      getCurrentTiem() {
        let times = formatDate(new Date(), 'yyyyMMdd_hhmm');
        let year = times.split('_')[0];
        let m = times.split('_')[1];
        let timesStr = formatDate(new Date(), 'yyyyMMdd_hh');
        this.currentTime[0] = year
        if (m >= timesStr.split('_')[1] + 10) {
          this.currentTime[1] = timesStr.split('_')[1] + 10
        } else {
          let timesStr1 = formatDate(new Date(new Date().getTime() - 60 * 60 * 1000), 'yyyyMMdd_hh');
          this.currentTime[1] = timesStr1.split('_')[1] + 10
        }
      },
      // 点击控制台风状态
      changeTyphoonFlag() {
        // 说明选择
        if (this.typhoonFlag) {
          // 渲染台风数据
          getTyphoon(this);
        } else {
          // 清楚台风数据
          this.typhoonData.typhoonTotal = 0;
          this.typhoonData.typhoon1Num = 0;
          this.typhoonData.typhoon2Num = 0;
          this.typhoonData.typhoon3Num = 0;

          this.tfName.forEach((item,index)=>{
            // 去掉台风
            if (map.getLayer(item)) {
              map.removeLayer(item);
              map.removeSource(item);
            }
            // 删除台风jpg
            if (document.getElementById(item+'_div')!=undefined) {
              document.getElementById(item+'_div').remove();
            }
            // 未来线
            if (map.getLayer(item+'ForecastLine')) {
              map.removeLayer(item+'ForecastLine');
              map.removeSource(item+'ForecastLine');
            }
            // 发生的
            if (map.getLayer(item+'BeforeLine')) {
              map.removeLayer(item+'BeforeLine');
              map.removeSource(item+'BeforeLine');
            }
          });
        }
      },
      adverseChange(value, id) {
        switch (id) {
          case '强雨':
            if (value && id === '强雨') {
              this.value[0] = value;
              this.id[0] = id;
              getFeature(10800, this);
              getFeatureCity(10800, this);
              return
            } else {
              this.value[0] = '';
              this.id[0] = '';
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === '10800') {
                  delete this.rightFromData[i]
                }
              });
              if (map.getSource('rain')) {
                map.removeLayer('rain');
                map.removeLayer('rain' + 'icon');
                map.removeSource('rain');
              }
              if (map.hasImage('rain')) {
                map.removeImage('rain1');
                map.removeImage('rain2');
                map.removeImage('rain3');
              }
              this.polygonData[0].wgrade1Num = 0;
              this.polygonData[0].wgrade2Num = 0;
              this.polygonData[0].wgrade3Num = 0;
              this.polygonData[0].polygonNum = 0;
              return
            }
            break;
          case '强风':
            if (value && id === '强风') {
              getFeature(10900, this);
              getFeatureCity(10900, this);
              this.value[1] = value;
              this.id[1] = id;
              return
            } else {
              this.value[1] = '';
              this.id[1] = '';
              if (map.getSource('wind')) {
                map.removeLayer('wind');
                map.removeLayer('wind' + 'icon');
                map.removeSource('wind');
              }
              if (map.hasImage('wind1')) {
                map.removeImage('wind1');
                map.removeImage('wind2');
                map.removeImage('wind3')
              }
              this.polygonData[1].wgrade1Num = 0;
              this.polygonData[1].wgrade2Num = 0;
              this.polygonData[1].wgrade3Num = 0;
              this.polygonData[1].polygonNum = 0;
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === '10900') {
                  delete this.rightFromData[i]
                }
              });
              return
            }
            break;
          case '冰雹':
            if (value && id === '冰雹') {
              getFeature(11000, this);
              getFeatureCity(11000, this);
              this.value[2] = value;
              this.id[2] = id;
              return
            } else {
              this.value[2] = '';
              this.id[2] = '';
              if (map.getSource('hail')) {
                map.removeLayer('hail');
                map.removeLayer('hail' + 'icon');
                map.removeSource('hail');
              }
              if (map.hasImage('hail')) {
                map.removeImage('hail1');
                map.removeImage('hail2');
                map.removeImage('hail3');
              }
              this.polygonData[2].wgrade1Num = 0;
              this.polygonData[2].wgrade2Num = 0;
              this.polygonData[2].wgrade3Num = 0;
              this.polygonData[2].polygonNum = 0;
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === '11000') {
                  delete this.rightFromData[i]
                }
              });
              return
            }
            break;
          case '强雪':
            if (value && id === '强雪') {
              getFeature(11100, this);
              getFeatureCity(11100, this);
              this.value[3] = value;
              this.id[3] = id;
              return
            } else {
              this.value[3] = '';
              this.id[3] = '';
              if (map.getSource('snow')) {
                map.removeLayer('snow');
                map.removeLayer('snow' + 'icon');
                map.removeSource('snow');
              }
              if (map.hasImage('snow')) {
                map.removeImage('snow1');
                map.removeImage('snow2');
                map.removeImage('snow3');
              }
              this.polygonData[3].wgrade1Num = 0;
              this.polygonData[3].wgrade2Num = 0;
              this.polygonData[3].wgrade3Num = 0;
              this.polygonData[3].polygonNum = 0;
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === '11100') {
                  delete this.rightFromData[i]
                }
              });
              return
            }
            break;

          case '大雾':
            if (value && id === '大雾') {
              getFeature(11200, this);
              getFeatureCity(11200, this);
              this.value[4] = value;
              this.id[4] = id;
              return
            } else {
              this.value[4] = '';
              this.id[4] = '';
              if (map.getSource('fog')) {
                map.removeLayer('fog');
                map.removeLayer('fog' + 'icon');
                map.removeSource('fog');
              }
              if (map.hasImage('fog')) {
                map.removeImage('fog1');
                map.removeImage('fog2');
                map.removeImage('fog3');
              }
              this.polygonData[4].wgrade1Num = 0;
              this.polygonData[4].wgrade2Num = 0;
              this.polygonData[4].wgrade3Num = 0;
              this.polygonData[4].polygonNum = 0;
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === '11200') {
                  delete this.rightFromData[i]
                }
              });
              return
            }
            break;

          case '沙尘':
            if (value && id === '沙尘') {
              getFeature(11300, this);
              getFeatureCity(11300, this);
              this.value[5] = value;
              this.id[5] = id;
              return
            } else {
              this.value[5] = '';
              this.id[5] = '';
              if (map.getSource('sanddust')) {
                map.removeLayer('sanddust');
                map.removeLayer('sanddust' + 'icon');
                map.removeSource('sanddust');
              }
              if (map.hasImage('sanddust')) {
                map.removeImage('sanddust1');
                map.removeImage('sanddust2');
                map.removeImage('sanddust3');
              }
              this.polygonData[5].wgrade1Num = 0;
              this.polygonData[5].wgrade2Num = 0;
              this.polygonData[5].wgrade3Num = 0;
              this.polygonData[5].polygonNum = 0;
              this.rightFromData.forEach((v, i) => {
                if (v.objectType === '11300') {
                  delete this.rightFromData[i]
                }
              });
              return
            }
            break;
        }
      },
      init() {
        loadMap(this);
        this.getData();
      },
      initTime() {
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60;
        let rdd = new Date(time);
        this.updatetime = formatDate(rdd, 'hh:mm:ss');
        this.tname = formatDate(rdd, 'yyMMdd');
        this.tname = '190909';
        this.releaseTime = formatDate(date, 'yyyy-MM-dd hh:mm') + ':00';
        this.currtDate = formatDate(date, 'yyyy/MM/dd');
        this.currtTime = formatDate(date, 'hh:mm');
        this.dd = '星期' + '日一二三四五六'.charAt(date.getDay());
        this.releaseTime = '2019-09-09 13:40:00';
      },
      getData() {
        this.getCurrentTiem();
        this.rightFromData = [];
        getFeature(11000, this);
        getFeature(10900, this);
        getFeature(10800, this);
        getFeature(11100, this);
        getFeature(11200, this);
        getFeature(11300, this);
        // param.wtype = 10200;
        // getFeature(param, this);
        getFeatureCity(10800, this);
        getFeatureCity(10900, this);
        getFeatureCity(11000, this);
        getFeatureCity(11100, this);
        getFeatureCity(11200, this);
        getFeatureCity(11300, this);
        getTyphoon(this);
      },
      toLocation(row) {
        this.checkWgid = row.wgid;
        showPolygon(row.wgid, row.objectType);
      },
      checkAuth() {
        let token = this.$store.state.token || sessionStorage.getItem('token');
        if (!token) {
          this.$router.replace('/login');
        }
      },
      handleCommand(command) {
        // console.log(command);
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      orderOccurTime() {
        this.occurTime = !this.occurTime;
        if (this.occurTime) {
          for (let i = 0; i < this.rightFromData.length; i++) {
            for (let j = i + 1; j < this.rightFromData.length; j++) {
              let flag = this.rightFromData[i].occurtime > this.rightFromData[j].occurtime;
              if (flag) {
                let one = this.rightFromData[i];
                this.rightFromData[i] = this.rightFromData[j];
                this.rightFromData[j] = one;
              }
            }
          }
        } else {
          for (let i = 0; i < this.rightFromData.length; i++) {
            for (let j = i + 1; j < this.rightFromData.length; j++) {
              let flag = this.rightFromData[i].occurtime < this.rightFromData[j].occurtime;
              if (flag) {
                let one = this.rightFromData[i];
                this.rightFromData[i] = this.rightFromData[j];
                this.rightFromData[j] = one;
              }
            }
          }
        }
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.axios.get(`/aicLogin/aicLoginExit?userId=${this.$store.state.user.userId}`).then(res => {
              this.$store.commit('SET_TOKEN', null);
              this.$store.commit('SET_USER', null);
              this.$store.commit('SET_MENUCODE', null);
              this.$router.replace({path: '/login'});
              this.sessionStorage.removeItem('token');
            })
          })
          .catch(() => {
            return false;
          })
      },
      linkClick(data) {
        if (data.label === '全国') {
        } else {
          var code = data.id.toString();
        }
        if (data.label === '全国') {
          map.jumpTo({'center': [116.405285, 39.904989], 'zoom': 3});
        } else if (code.indexOf('-') === -1) {
          // 说明是省
          if (!data.pcode) return;
          this.alarmList = ['1', '2', '3'];
          data.pcode = parseInt(data.pcode);
          let id = JSON.stringify(data.pcode);
          this.checkCity = id;
          // map.jumpTo({'center': cities[id].center, 'zoom': 10});
          map.fitBounds(cities[id].center);
        } else {
          // 说明是市
          if (!data.districtId) return;
          this.alarmList = ['1', '2', '3'];
          let id = JSON.stringify(data.districtId);
          this.checkCity = id;
          // map.jumpTo({'center': cities[id].center, 'zoom': 10});
          map.fitBounds(cities[id].center);
        }
        // let nfromdata = [];
        // this.realFromData.forEach((itm, idx) => {
        //   if (id === itm.districtId) {
        //     nfromdata.push(itm);
        //   }
        // });
        // this.rightFromData = nfromdata;
      },
      tocity(e) {
        if (e.length < 3) {
          map.jumpTo({'center': e, 'zoom': 10});
        } else {
          map.jumpTo({'center': e.slice(0, 2), 'zoom': 3});
        }
      },
      sumWeather() {
        let sum = 0;
        this.polygonData.forEach((itm, idx) => {
          sum += itm.polygonNum;
        });
        return sum;
      },
      sumTyphoon() {
        let sum = 0;
        this.typhoonData.typhoonTotal =this.typhoonData.typhoon1Num+this.typhoonData.typhoon2Num+this.typhoonData.typhoon3Num;
        sum= this.typhoonData.typhoonTotal;
        return sum;
      },
      showPopup(id) {
        togglePopup(id);
      },
      changeGrade() {
        let all = ',' + this.alarmList.join(',') + ',';
        let nfromdata = [];
        this.realFromData.forEach((itm, idx) => {
          let grade = ',' + parseInt(itm.objectGrade) % 100 + ',';
          if (this.checkCity == null && all.indexOf(grade) > -1) {
            nfromdata.push(itm);
          } else if (this.checkCity === itm.districtId && all.indexOf(grade) > -1) {
            nfromdata.push(itm);
          }
        });
        // this.rightFromData = nfromdata;
      },
      isSideWeather(e) {
        let list = ',' + this.sideList.join(',') + ',';
        e = ',' + e + ',';
        if (list.indexOf(e) > -1) {
          return true;
        } else {
          return false;
        }
      },
      colorfiter(e) {
        e = Math.abs(e);
        let h = Math.floor(e / 1000 / 60 / 60);
        let m = Math.floor((e - h * 60 * 60 * 1000) / 1000 / 60);
        if (h > 0) {
          return 'rgb(0,153,255)';
        } else if (m < 60 && m > 29) {
          return 'orange';
        } else {
          return 'red'
        }
      },
      borderfiter(e) {
        if (e > 0) {
          let m = (e / 1000 / 60);
          if (m > 0 && m < 30) {
            return '5px solid red'
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      _filterRightData(e) {
        let all = ',' + this.alarmList.join(',') + ',';
        let nfromdata = [];
        e.forEach((itm, idx) => {
          let grade = ',' + parseInt(itm.objectGrade) % 100 + ',';
          if (all.indexOf(grade) > -1) {
            nfromdata.push(itm);
          }
        });
        return nfromdata;
      }
    },
    filters: {
      _formatDate(e) {
        return formatDate(new Date(e), 'hh:mm');
      },
      _formatDate2(e) {
        e = Math.abs(e);
        let h = Math.floor(e / 1000 / 60 / 60);
        let m = Math.floor((e - h * 60 * 60 * 1000) / 1000 / 60);
        let s = Math.floor((e - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
        return (h > 9 ? h : '0' + h) + ':' + (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s);
      },
      _formatDate3(e) {
        e = Math.abs(e);
        let h = Math.floor(e / 1000 / 60 / 60);
        let m = Math.floor((e - h * 60 * 60 * 1000) / 1000 / 60);
        let s = Math.floor((e - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
        if (h > 0) {
          return (h > 9 ? h : '0' + h) + 'h' + (m > 9 ? m : '0' + m) + '分钟';
        } else {
          return (m > 9 ? m : '0' + m) + '分钟';
        }
      },
      _percentage(e) {
        return Math.floor(e);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/styles/variable';
  // 实验
    .minHeight>>>.el-checkbox-button:last-child .el-checkbox-button__inner {
        border-radius: 0!important;
        padding: 0!important;
    }
    .minHeight>>>.el-checkbox-button__inner {
        padding: 0!important;
        border:0!important;
        width:14px!important;
        height:14px!important;
    }
    .Typhoon-hzy>>>.el-checkbox-button:last-child .el-checkbox-button__inner {
        border-radius: 0!important;
        padding: 0!important;
    }

  .Typhoon-hzy>>>.el-checkbox-group {
    // display: inline-block!important;
  }
  .Typhoon-hzy>>>.el-checkbox-button__inner {
    padding: 0!important;
        border:0!important;
        width:14px!important;
        height:14px!important;
  }
  //实验
  .minHeight>>>.el-collapse-item__header {
    background:#DCDCDC!important;
  }
  .minHeight>>>.el-collapse-item__wrap {
    background:#EEEEEE!important;
  }
  .minHeight>>>.el-tree-node__content {
    background:#EEEEEE!important;
  }
  .minHeight>>>.el-tree__empty-block {
    background:#EEEEEE!important;
  }
   .maxHeight>>>.el-collapse {
    border-top: 0px!important;
  }

  // .maxHeight>>>.el-checkbox__inner {
  //   background:#B150C5!important;
  // }

  .shuy-hzy {
    position: absolute;
    top: 10px;
    left: -5px;
    display: inline-block;
    width: 1px;
    height: 60px;

    background-color: silver;
  }
  .Typhoon-hzy {
    width:200px;
    height:48px;
    border-bottom: 1px solid #EBEEF5;
    font-size: 13px;
    font-weight: 500;
    line-height: 48px;
    position: relative;
    color: #303133;
    align-items: center;
    // text-align:center
  }
  .typhoon-img {
    position: absolute;
    top:0px;
    left:24px;
    color: rgba(0,0,0,0);
    width: 35px;
    height: 30px;
    margin: 10px 15px 5px 5px;
    background-size: contain;
    background-repeat: no-repeat;
    text-align: center;
    background-position: center center;
  }
  .siderbar-wrapper {
    margin-top: 4.2%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $siderbarWidth;
    z-index: 11;
    background-color: $siderbarBackgroundColor;
    transition: all 0.3s ease-in-out;

    .logo-wrapper {
      height: 40px;
      line-height: 40px;
      text-align: center;
      /*background-image: url('../../../static/bg.png');*/
    }

    .menu-wrapper {
      position: absolute;
      top: 72px;
      bottom: 0;
      width: 100%;
      border-right: none;
      transition: all 0.3s ease-in-out;

      &:not(.el-menu--collapse) {
        overflow-y: auto;
        overflow-x: hidden;
      }

      i {
        color: #FFFFFF;
      }

      .menu-item {

        &.is-active, &:hover {
          background-color: #353F4F !important;
          color: #65CEA7 !important;

          i {
            color: #65CEA7 !important;
          }
        }

      }

      .el-submenu__title:hover {
        color: #65CEA7 !important;

        i {
          color: #65CEA7 !important;
        }
      }

      .el-submenu, .el-menu-item {
        width: 100%;
      }
    }
  }

  .topbar-wrapper {
    margin-top: 4.2%;
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: 0;
    height: $topbarHeight;
    /*line-height: $topbarHeight;*/
    /*padding: 0 24px 0 0;*/
    background-color: $topbarBackgroundColor;
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
    transition: all 0.3s ease-in-out;
    z-index: 12;
    background-color: rgba(0, 51, 102, 0.5);

    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      text-align: center;
      cursor: pointer;

      i {
        transition: all 0.3s ease-in-out;
      }
    }

    .title {
      height: 100%;
      font-weight: bold;
      display: inline-block;
    }

    .menu-list {
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        height: 48px;
        text-align: center;
        font-size: 0px;

        &:hover {
          cursor: pointer;
          background-color: #F5F5F5;
        }

        .icon {
          vertical-align: middle;
          font-size: 24px;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 4px;
          font-size: 24px;
        }
      }
    }
  }

  .content-wrapper {
    margin-top: 4.2%;;
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: $topbarHeight;
    bottom: 0;
    padding: 0px 16px 10px 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;

    .content {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .top_div {
      height: 4.5%;
    }

    .map_color_pillars {
      width: 40px;
      height: 130px;
      background: linear-gradient(#0000FF, #B0C4DE);
      position: absolute;
      z-index: 9998;
      bottom: 30px;
      right: 20%;
      text-align: center;
    }

    .max {
      width: 100px;
      position: absolute;
      left: -80px;
      font-size: small;
      color: white;
    }

    .min {
      width: 100px;
      position: absolute;
      left: -80px;
      font-size: small;
      color: white;
      bottom: 0
    }
  }
</style>

<style scoped>
  @import "https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css";

  #w_type_id>>>.el-input__inner{background-color: rgba(0,0,0,0)!important;border: none;font-weight: bold;}
  #w_type_id>>>.el-select__caret{color: black!important;font-weight: bold;}
  #col_switch_id>>>.el-switch__label *{font-size: 18px}
  .div_layer_icon {
    float: right;
    color: rgba(0,0,0,0);
    width: 35px;
    height: 30px;
    margin: 5px 15px 5px 5px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: rgb(220, 220, 220);
  }
  .wgrade_lb{width: 70px; display: inline-block;text-align: center;padding: 2px 0;color: #606266;}
  .p_wgrade_lb{color: #606266;font-size: 13px;padding: 1.5px 0px}
  .top_card>>>.el-card__body{padding: 3px}
  .top_card{
    background-repeat: no-repeat;
    background-size: contain;
    height: 87px!important;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border: 1px solid #EBEEF5
  }
  .colorTest>>>.el-table tr {
    background: #ccc!important;
     /* width: 96%!important; */
    margin:0 10px!important;
  }
  .colorTest>>>.l-table__row {

  }
  >>>.table_cell1{
    border: 1px solid silver;
    border-right: 0;
    padding: 5px 0;
    font-size: 12px;
    margin: 10px 0;
    margin-left:10px;

  }

  >>>.el-table__row {


  }
  >>>.table_cell2{

    position: relative;
    border: 1px solid silver;
    padding: 5px 0;
    font-size: 14px;
    border-left: 0;
    width:auto;


  }
  >>>.table_cell2 .cell{
    line-height: 1.3;
  }
  >>>.el-table__body{
    border-spacing:0px 5px;

  }
  >>>.cell{
    white-space: nowrap!important;
  }
  .legend_box {
    background-color: rgba(0,0,0,0);
    border: none;
  }
  #dataList >>>.el-scrollbar__wrap {
    overflow-x: hidden!important;
  }
  >>>.mapboxgl-popup-close-button {
    display: none;
  }
  .colorTest>>>.el-table tbody tr:hover>td {
    background-color: #DCDCDC
    }
    .colorTest>>>.table_cell2 {

    }
  .marker-win {
    display: inline-block;
    background-color: white;
    padding: 7px;
    border: 1px solid;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font: 14px/1 sans-serif;
  }
  .marker-win div{
    display: inline-block;
  }
  .popup-win {
    display: inline-block;
    padding: 7px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 20px;
    font: 14px/1.8 sans-serif;
  }
  .popup-win-img {
    background-repeat: no-repeat;
    background-size: contain;
    white-space: nowrap;
    padding-top: 50px;
    width: 60px;
    height: 84px;
    overflow: hidden;
    line-height: 3;
    text-align: center;
    background-position-y: 10px;
  }
  >>>.mapboxgl-popup{
    position: inherit;
    background-color: rgba(0,0,0,0);
    z-index: 1000;
  }
  >>>.mapboxgl-popup-content{
    padding: 0;
  }
  >>>.mapboxgl-popup-tip{
    display: none;
    background-color: rgba(0,0,0,0);
  }
</style>

