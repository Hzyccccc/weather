<template>
  <!--<div id="root" class="root">
    <el-button @click="toShowPages(1)">NC实时全量数据可视化</el-button>
    <el-button @click="toShowPages(2)">NC历史索引数据可视化</el-button>
    <el-button @click="toShowPages(3)">实时强对流数据可视化</el-button>
    <el-button @click="toShowPages(4)">历史强对流数据可视化</el-button>
    <el-button @click="toShowPages(5)">GRB2实时全量数据可视化</el-button>
    <el-button @click="toShowPages(6)">GRB2实历史索引数据可视化</el-button>
    <el-button @click="toShowPages(7)">台风数据可视化</el-button>
    <el-button @click="toShowPages(8)">站点72小时数据可视化</el-button>
  </div>--> 
  <div style='width: 100%; height: 100%; background:#fff'>
  
      <div style="padding:0;">
        <el-row class="top-hzy">
            <el-image
              style="width: 100%; height: 100%;display: inline-block;"
              src="static/login.jpg"
            ></el-image>
        </el-row>
        <!-- <el-row class="login-hzy width:100%">
          <el-image class="head_img" style="height: 80px; " src="static/bg.png" @click="toIndex"></el-image>
        </el-row> -->
        <!-- <el-row style="background-color: #0277BD">
          <span style="color: white;font-size: 36px">气象数据源基础数据可视化系统</span>
        </el-row> -->
        <el-row>
        <div id="header-hzy" style=" width: 100%;background-color:rgba(22,22,30,0.5)">
          <el-col :span="3">
            <el-image
            @click="toIndex"
              style="width: 145px; display: inline-block; cursor: pointer;padding-left:30px"
              src="static/logo.png"
            ></el-image>
          </el-col>
          <el-col :span="12">
            <span style="font-size: 26px ;color: white ;line-height: 80px;position: absolute; left:50%;transform: translateX(-50%);">四维智联创新应用中心高精短时气象预警平台
</span>
          </el-col>
          <el-col :span="21">
            <ul v-if="user" style="display: inline-block;float: right;margin: 0 35px;color:#fff;font-size:26px">
              <li @click="exit" class="user-icon" style="padding: 0;cursor:pointer;">
                <el-dropdown
                  :show-timeout="10"
                  :hide-timeout="10"
                  
                  style="padding: 28px;color:#fff;">
                  <div class="dropdown-content el-dropdown-link">
                    <i class="icon el-icon-adm-usersetup" style="font-size:22px"></i>
                    <span class="text" style="font-size:22px;margin-left:5px">{{user.userName}}</span>
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
            <div v-else style="float: right;color: white; margin-right: 5%; line-height: 80px; font-size: 22px; ">
                <span @click="login()" style="cursor:Pointer">登录</span>&nbsp;|&nbsp;<span style="cursor:Pointer">注册</span>
            </div>
          </el-col>
        </div>
      </el-row>
        
       
      </div>
      
        <div id="body_layout">
          <div class="body-first">
            <div class="body-title" @click="toShowPages(100201)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px;" src="static/showimg/01.png"></el-image>
              <div style="text-align:center;margin-top:20px">NC实时全量数据可视化系统</div>
            </div>
           <div class="body-title" @click="toShowPages(100202)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px;" src="static/showimg/02.png"></el-image>
              <div style="text-align:center;margin-top:20px">NC历史索引数据可视化系统</div>
            </div>
            <div class="body-title" @click="toShowPages(100203)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px" src="static/showimg/03-1.png"></el-image>
              <div style="text-align:center;margin-top:20px">实时强对流数据可视化系统</div>
            </div>
            <div class="body-title" @click="toShowPages(100204)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px" src="static/showimg/04-1.png"></el-image>
              <div style="text-align:center;margin-top:20px">历史强对流数据可视化系统</div>
            </div>
          </div>
          <div class="body-first">
            <div class="body-title" @click="toShowPages(100205)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px" src="static/showimg/05.png"></el-image>
              <div style="text-align:center;margin-top:20px">GRB2实时全量数据可视化系统</div>
            </div>
           <div class="body-title" @click="toShowPages(100206)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px" src="static/showimg/06.png"></el-image>
              <div style="text-align:center;margin-top:20px">GRB2历史索引数据可视化系统</div>
            </div>
            <div class="body-title" @click="toShowPages(100207)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px" src="static/showimg/07.png"></el-image>
              <div style="text-align:center;margin-top:20px">台风数据可视化系统</div>
            </div>
            <div class="body-title" @click="toShowPages(100208)">
              <el-image style="width: 100px;height:100px;margin-left: 120px;margin-top:10px" src="static/showimg/08.png"></el-image>
              <div style="text-align:center;margin-top:20px">站点72小时数据可视化系统</div>
            </div>
          </div>
          
       </div>
       <div class="tabs">
         <h2 style="text-align:center;font-weight: 400;color: #162029;font-size: 34px;padding-top:60px;margin-bottom: 40px;text-align: center;">气象基础数据可视化系统</h2>
         <div class="tabs-main">
           <el-tabs :tab-position="tabPosition" @tab-click="tabClick" style="height: 400px;">
            <el-tab-pane label="NC实时全量数据可视化系统">
              <div class="first-left-hzy">
                <h3>NC实时全量数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看最近的NC数据内指定时刻的源数据内容,包括降雨量、风分量、形态和雷达反射强度等。</div>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持查看相邻的NC数据（2小时内)。</div>
                
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100201)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/0.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="NC历史索引数据可视化系统">
              <div class="first-left-hzy">
                <h3>NC历史索引数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看指定时间的NC数据源索引数据内容(v0)，包括降雨量、风分量、形态和雷达等；</div>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>并支持1小时内的其它NC数据源的索引数据(v0)。</div>
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100202)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/1.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="实时强对流数据可视化系统">
              <div class="first-left-hzy">
                <h3>实时强对流数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看最近的强对流数据中的源数据内容，包括短时强降雨、雷雨大风、冰雹、短时强降雨和雷雨大风、短时强降雨和冰雹、雷雨大风和冰雹、以及短时强降雨、雷雨大风和冰雹等。</div>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持查看最近的SCW数据（1小时内)。</div>
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100203)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/2.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="历史强对流数据可视化系统">
              <div class="first-left-hzy">
                <h3>历史强对流数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看指定时间段（1小时内）的强对流数据中的源数据内容，包括短时强降雨、雷雨大风、冰雹、短时强降雨和雷雨大风、短时强降雨和冰雹、雷雨大风和冰雹、以及短时强降雨、雷雨大风和冰雹等。</div>
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100204)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/3.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="GRB2实时全量数据可视化系统">
              <div class="first-left-hzy">
                <h3>GRB2实时全量数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看最近的GRB2数据内指定时刻的源数据内容，包括降雨量、风分量和温度等。</div>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持查看相邻的GRB2数据源内容（1天内)。</div>
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100205)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/4.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="GRB2历史索引数据可视化系统">
              <div class="first-left-hzy">
                <h3>GRB2历史索引数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看指定GRB2数据内源数据索引内容(v0|v1|v2|v3)，包括降雨量、风分量和温度等。</div>                
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100206)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/5.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="台风数据可视化系统">
              <div class="first-left-hzy">
                <h3>台风数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看最近的台风在指定时刻的预测状态，包括位置、大小和强度等。</div>                               
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持历史台风数据的路径和大小等。</div>                               
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100207)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/6.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
            <el-tab-pane label="站点72小时数据可视化系统">
              <div class="first-left-hzy">
                <h3>站点72小时数据可视化系统</h3>
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持在地图上查看最近的站点72小时发布数据，包括温度、风向、风量、降雨和云量等。</div>                                               
                <div style="position:relative;padding-left:20px"><span style="position:absolute;top:8px;left:0;width:10px;height:10px;margin-bottom:1px;background:#3E6EFF;display:inline-block;"></span>支持省会、地市显示控制。</div>                                               
                <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="toShowPages(100208)" type="primary" size="medium" round>进入系统</el-button>
              </div>
              <div class="first-right-hzy">
                <img src="static/showimg/7.png" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

              </div>
            </el-tab-pane>
          </el-tabs>
         </div>
       </div>
      <footer style="border-top: solid #A0A0A0 1px;background-color: #2D3037;color: #BEBDC1;padding-top:0px;">
      <div class="footer-title-hzy" style="padding-bottom:0">
        <span style="cursor:Pointer" @click="toShowPages(100201)">NC实时全量数据可视化系统</span>
        <span style="cursor:Pointer" @click="toShowPages(100202)">NC历史索引数据可视化系统</span>
        <span style="cursor:Pointer" @click="toShowPages(100203)">实时强对流数据可视化系统</span>
        <span style="cursor:Pointer;border-right:0" @click="toShowPages(100204)">历史强对流数据可视化系统</span>
      </div>
      <div class="footer-title-hzy">
        <span style="cursor:Pointer" @click="toShowPages(100205)">GRB2实时全量数据可视化系统</span>
        <span style="cursor:Pointer" @click="toShowPages(100206)">GRB2历史索引数据可视化系统</span>
        <span style="cursor:Pointer" @click="toShowPages(100207)">台风数据可视化系统</span>
        <span style="cursor:Pointer;border-right:0" @click="toShowPages(100208)">站点72小时数据可视化系统</span>
      </div>
       <div class="footer-hzy">
          &copy;2017-2019&nbsp;北京四维智联科技有限公司 版权所有 京ICP备08100418号-10 公网安备 11010802028057号
          
          
       </div>
      </footer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
         tabPosition: 'left',
        data1: [
          {id: 100201, title: 'NC实时全量数据可视化'},
          {id: 100202, title: 'NC历史索引数据可视化'},
          {id: 100203, title: '实时强对流数据可视化'},
          {id: 100204, title: '历史强对流数据可视化'},
          {id: 100205, title: 'GRB2实时全量数据可视化'},
          {id: 100206, title: 'GRB2实历史索引数据可视化'},
          {id: 100207, title: '台风数据可视化'},
          {id: 100208, title: '站点72小时数据可视化'}
        ],
        data2: [
         
        ]
      }
    },
    mounted() {
    },
    computed: {
      
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      tabClick(tab, event) {
        
         
        
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
             this.axios.get(`/aicLogin/aicLoginExit?userId=${this.$store.state.user.userId}`).then(res =>{
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
      login() {
        this.$router.replace('/login');
      },
      // 权限
      toShowPages(id) {

        var token = this.$store.state.token;
       
        if (!token) {
          this.$router.replace('/login');
          // this.$router.push({name: 'login', params: {id: id}})
        } else {

          // 权限判断
          this.axios.post('/aicUserSelectSystemRole/selectSystemRoleByUserId',{
            userId: this.user.userId,
            sysModId:id
          }).then(res =>{
           
            if(res.status === 620) {
              // 成功
              switch (id) {
                case 100201:
                  this.$router.push('/ncRealtimeView');
                  break;
                case 100202:
                  this.$router.push('/ncHisView');
                  break;
                case 100203:
                  this.$router.push('/scwRealtimeView');
                  break;
                case 100204:
                  this.$router.push('/scwHisView');
                  break;
                case 100205:
                  this.$router.push('/grb2RealtimeView');
                  break;
                case 100206:
                  this.$router.push('/grb2HisView');
                  break;
                case 100207:
                  this.$router.push('/tplf');
                  break;
                case 100208:
                this.$router.push('/n72f');
                break;
              }   
            }else if(res.status === 600){
              this.$message({message: '该模块已停用', type: 'error',duration:1000});              
            }else if(res.status === 610){
              this.$message({message: '该模块已删除', type: 'error',duration:1000});              
            }else if(res.status === 650){
              this.$message({message: '该模块不存在', type: 'error',duration:1000});              
            }else if(res.status === 630){
              this.$message({message: '该用户无权限进入', type: 'error',duration:1000});              
            }
          
          }).catch(req =>{

          })
          
        }
        
      },
      toIndex() {
        this.$router.push('/sysMain');
      }
    }
  }
</script>

<style lang="scss" scoped>
.footer-hzy {
  border-top: 1px solid #545558;
  text-align: center;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  color: #545558;
  
}
.footer-title-hzy {
   display: flex;
  justify-content: center;
  padding: 50px 0;
  
  align-items: center;
  span {
    display: inline-block;
    width:50px;
    flex: 1 0 auto;
    text-align: center;
    border-right: 3px solid #BEBDC1;
  }
}
.first-left-hzy {
      background-color: #fff;
      margin-left:70px;
      float: left;
      height: 300px;
      width: 500px;
      line-height: 25px;
      
      h3 {
        padding-top: 60px;
        margin: 0;
        padding-bottom: 35px;
        font-weight: 500;
        font-size: 24px;
      }
      div {
        color: #6E6E6E;
        padding-bottom: 25px;
        width: 450px;
      }
    }
    .first-right-hzy {
      
      float: left;
      height: 400px;
      width: 600px;
      
    }
.tabs {
  width: 100%;
  height: 700px;
  box-sizing: border-box;
  
  
  // padding: 0px 180px 50px 180px;
  
  .tabs-main {
  display: flex;
  justify-content: center;
  }
}
.body-first {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  .body-title {
    
    width: 340px;
    height: 200px;
    background-color: #fff;
    cursor: pointer;
    transition: all .3s linear;
  }
  .body-title:hover {
    position: relative;
    top: -5px;
    box-shadow: 0px 4px 4px rgba(111, 111, 114, 0.4);
    
    // box-shadow: 0 2px 2px rgba(10, 16, 20, .24);
    // transition: all .4s linear;
  }
}

.footer-hzy {
  
  display: flex;
  justify-content: center;
 
}
.footer-hzy span {
  margin-right: 75px;
  margin-left: 75px;
   position: relative;
  }
.mian-hzy {
  padding: 0 10px 30px 10px;
  background-color: #fff;
}
.image {
  width: 100%;
}
.top-hzy {
  width: 100%;
  height: 350px;
  position: relative;
  top: 0%;
  left: 0%;
  
}
#header-hzy {
 z-index: 100;
    position:fixed;
    left: 0;
    top: 0;
   
}
.login-hzy {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
}
#main-hzy {
  background-color: #fff;
  padding: 2%;
  display: flex;
   flex-wrap: wrap;
}
  .head_img:hover, .btn_card:hover{cursor: pointer}
 
  #body_layout {
    margin-top: 40px;
    width: 100%;
    height:400px;
    padding-bottom: 100px;
     box-shadow: 1px 8px 4px rgba(221,220,225, .8);
  }
  #body_layout>>>.el-col{
    
    height: 100%;
    text-align: center;
    
  }
</style>
