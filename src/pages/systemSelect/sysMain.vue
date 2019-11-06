<template>
  <div id="root" class="root" style="overflow-x: hidden">
    <div class="top_div">
      <el-row>
        <div id="header-hzy" style=" height:80px ;width: 100%;background-color:rgba(22,22,30,0.5);">
          <el-col :span="3">
            <el-image
              style="width: 145px; display: inline-block;padding-left:30px"
              src="static/logo.png"
            ></el-image>
          </el-col>
          <el-col :span="12">
            <span style="font-size: 26px ;color: white ;line-height: 80px;position: absolute; left:50%;transform: translateX(-50%);">四维智联创新应用中心高精短时气象预警平台</span>
          </el-col>
          <el-col :span="21">
            <ul v-if="user" style="display: inline-block;float: right;margin: 0 35px;color:#fff;font-size:26px">
              <li @click="exit" class="user-icon" style="padding: 0;cursor:pointer;">
                <el-dropdown
                  :show-timeout="10"
                  :hide-timeout="10"
                  
                  style="padding: 28px;color:#fff;">
                  <div class="dropdown-content el-dropdown-link">
                    <i class="icon el-icon-adm-usersetup" style="font-size:22px;margin-right:5px;"></i>
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
            <div v-else style="float: right;color: white; margin-right: 5%; line-height: 80px; font-size: 22px; ">
                <span @click="login()" style="cursor:Pointer">登录</span>&nbsp;|&nbsp;<span style="cursor:Pointer">注册</span>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div>
      <el-image style="width: 100%; height:350px; margin-top: -3px" src="static/banner_01.jpg"></el-image>
    </div>
    <div class="menu-height-hzy">
      <div class="menu-nav-hzy">
        <span>高精短时<i style="color: red;font-style:normal">恶劣</i>天气预警系统</span>
        <el-button style="height:30px;padding:0 20px;background-color: #F5F5F5;color:#409EFF" @click="checkAuth(100002)" type="primary" size="medium" round>进入系统</el-button>
      </div>
      <div class="menu-nav-hzy">
        <span>高精短时<i style="color: red;font-style:normal">极端</i>天气预警系统</span>
        <el-button style="height:30px;padding:0 20px;background-color: #F5F5F5;color:#409EFF" @click="checkAuth(100001)" type="primary" size="medium" round>进入系统</el-button>
      </div>
      <div class="menu-nav-hzy">
        <span>极端天气车辆预警系统</span>
        <el-button style="height:30px;padding:0 20px;background-color: #F5F5F5;color:#409EFF" @click="checkAuth(100003)" type="primary" size="medium" round>进入系统</el-button>
      </div>
      <div class="menu-nav-hzy">
        <span style="border: 0px;">气象基础数据可视化系统</span>
        <el-button style="height:30px;padding:0 20px;background-color: #F5F5F5;color:#409EFF" @click="checkButh(100200)" type="primary" size="medium" round>进入系统</el-button>
      </div>
    </div>
    <div class="main-hzy">
      <!-- 恶劣 -->
        <div class="main-first-hzy"> 
          <div class="first-left-hzy">
            <h3>高精短时恶劣天气预警系统</h3>
            <div>恶劣天气是指由强降雨、强风、强雪、高温、低温、道路结冰、冻雨等天气因素引起，能对生产生活带来不安全因素的恶劣天气状况。</div>
            <div>四维智联短时高精天气预警平台支持对上述恶劣天气类型进行分钟级预报和在公里级精度范围内预警。</div>
            <div>本平台目前支持强雨、强雪、强风和冰雹等恶劣天气类型，后续更多天气类型正在开发中......</div>
            <div>本平台支持接口调用和数据推送两种服务提供方式。</div>
            <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="checkAuth(100002)" type="primary" size="medium" round>进入系统</el-button>
          </div>
          <div class="first-right-hzy">
            <img src="static/02.jpg" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

          </div>
        </div>
        <!-- 极端 -->
        <div class="main-tow-hzy">
          <div class="two-left-hzy" >
            <img src="static/01.jpg" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: -30px -30px 0px 0px rgba(207,208,210,2),-60px -60px 0px 0px rgba(226,227,229,1);">
          </div>
          <div class="two-right-hzy">
            <h3>高精短时极端天气预警系统</h3>
            <div>极端天气是指由热浪、寒潮、暴雨、暴雪、冰雹、台风、洪水、结冰、冻雨等天气因素引起，能对生产生活带来重大不安全因素的极端天气状况。</div>
            <div>四维智联短时高精天气预警平台支持对上述恶劣天气类型进行分钟级预报和在公里级精度范围内预警。</div>
            <div>本平台目前支持强雨、强雪、强风和冰雹等恶劣天气类型，后续更多天气类型正在开发中......</div>
            <div>本平台支持接口调用和数据推送两种服务提供方式。</div>
            <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="checkAuth(100001)" type="primary" size="medium" round>进入系统</el-button>
          </div>
          
        </div>
        <!-- 汽车 -->
        <div class="main-tow-hzy" style="background:#fff">
          <div class="first-left-hzy">
            <h3>极端天气车辆预警系统</h3>
            <div>本系统是高精短时天气预警平台发布的极端天气对象事件在车联网平台中的典型应用示范。</div>
            <div>本应用示范工程展示了车辆实时在极端天气对象事件范围内的分布和一键预警功能。</div>
            
            <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="checkAuth(100003)" type="primary" size="medium" round>进入系统</el-button>
          </div>
          <div class="first-right-hzy">
            <img src="static/03.jpg" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: 30px -30px 0px 0px rgba(182,206,232,2),60px -60px 0px 0px rgba(210,222,238,1);">

          </div>
        </div>
        <!-- 八大页 -->
        <div class="main-tow-hzy" >
          <div class="two-left-hzy">
            <img src="static/04.jpg" alt="" style="width:500px;position:relative;top:80px;left:23px;margin:0;box-shadow: -30px -30px 0px 0px rgba(182,206,232,2),-60px -60px 0px 0px rgba(210,222,238,1);">

          </div>
          <div class="two-right-hzy">
            <h3>气象基础数据可视化系统</h3>
            <div>本系统为内部应用系统，提供对内部支撑的基础数据进行可视化展示。</div>
            
            <el-button style="height:30px;padding:0 20px;background-color: #3E6EFF;color:#F8F9FE" @click="checkButh(100200)" type="primary" size="medium" round>进入系统</el-button>
          </div>
          
        </div>
    </div>
    <footer style="border-top: solid #A0A0A0 1px;background-color: #2D3037;color: #BEBDC1;">
      <div class="footer-title-hzy">
        <span style="cursor:Pointer" @click="checkAuth(100002)">高精短时恶劣天气预警系统</span>
        <span style="cursor:Pointer" @click="checkAuth(100001)">高精短时极端天气预警系统</span>
        <span style="cursor:Pointer" @click="checkAuth(100003)">极端天气车辆预警系统</span>
        <span style="cursor:Pointer;border-right:0" @click="checkButh(100200)">气象基础数据可视化系统</span>
      </div>
       <div class="footer-hzy">
          &copy;2017-2019&nbsp;北京四维智联科技有限公司 版权所有 京ICP备08100418号-10 公网安备 11010802028057号
          
          
       </div>
      </footer>
  </div>
</template>
<script>
  export default {
    name: 'root',
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    mounted() {
    },
    methods: {
      login() {
        this.$router.replace('/login');
      },
      checkButh(id) {
        let token = this.$store.state.token;
        if (!token) {
          this.$router.replace('/login');
          // this.$router.push({name: 'login', params: {id: id}})
        } else {
           this.toShowcd()
        }
      },
      checkAuth(id) {
        // || sessionStorage.getItem('token')
        let token = this.$store.state.token;
        
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
                case 100001:
                  this.toHPSWeather()
                  break
                case 100003:
                  this.toSWeatherCar()
                  break
                  case 100002:
                  this.toAdverse()
                  break          
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
      toHPSWeather() {
        this.$router.replace('/HPSWeatherMain');
      },
      toSWeatherCar() {
        this.$router.replace('/SWeatherCarMain');
      },
      // toShowSystem() {
      //   this.$router.replace('/HPSWeatherMain2');
      // },
      toShowcd() {
        this.$router.replace('/showMain');
      },
      toAdverse() {
        this.$router.replace('/HPSAdverseMain');
      }
    }
  }
</script>

<style lang="scss" scoped>
.footer-title-hzy {
  display: flex;
  justify-content: center;
  padding: 50px 0;
  
  align-items: center;
  span {
    flex: 1 1 auto;
    text-align: center;
    border-right: 3px solid #BEBDC1;
  }
}
.two-right-hzy {
 
  float: right;
  height: 400px;
  width: 600px;
  
  h3 {
    padding-top: 40px;
    margin: 0;
    padding-bottom: 40px;
    font-weight: 500;
    font-size: 30px;
  }
  div {
    color: #6E6E6E;
    padding-bottom: 30px;
    width: 450px;
  }
}
.two-left-hzy {
    float: left;
    margin-right:50px;
    height: 400px;
    width: 600px;
    
    
    text-decoration: none;
}
.menu-height-hzy {
  width: 100%;
  height: 200px;
  margin-top: -3px;
  box-shadow: 5px 5px 3px #ccc;
  display: flex;
  justify-content: center; 
  .menu-nav-hzy {
    text-align: center;
    width: 380px;
    span {
      display: inline-block;
      width: 100%;
      height: 24px;
      border-right: 3px solid #2D78D1;
      color: #040404;
      font-weight:500;
      font-size: 22px;
      margin: 50px 0;
      
    }  
  } 
}
.main-hzy {
  width: 100%;
  background-color: #fff;
  
  margin-top: 10px;
  h1 {
      text-align: center;
      padding-top: 40px;
      font-weight: 500;
      color: #2D77D2;
      font-size: 24px;
      
    }
  .main-first-hzy {
    height: 450px;
    padding: 0 150px;
    padding-top:50px;
    display: flex;
  justify-content: center;
    
    .first-left-hzy {
      background-color: #fff;
      margin-right:50px;
      float: left;
      height: 300px;
      width: 600px;
      
      h3 {
        padding-top: 40px;
        margin: 0;
        padding-bottom: 40px;
        font-weight: 500;
        font-size: 30px;
      }
      div {
        color: #6E6E6E;
        padding-bottom: 30px;
        width: 450px;
      }
    }
    .first-right-hzy {
      
      float: right;
      height: 400px;
      width: 600px;
      
    }
  }
}
.main-tow-hzy {
  height: 500px;
  padding: 0 150px;
  background-color: #F2F2F2;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  .first-left-hzy {
      margin-right:50px;
      float: left;
      height: 400px;
      width: 600px;
      
      h3 {
        padding-top: 40px;
        margin: 0;
        padding-bottom: 40px;
        font-weight: 500;
        font-size: 30px;
      }
      div {
        color: #6E6E6E;
        padding-bottom: 30px;
        width: 450px;
      }
    }
    .first-right-hzy {
      
      float: right;
      height: 400px;
      width: 600px;
    
    }
}

.footer-hzy {
  border-top: 1px solid #545558;
  text-align: center;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  color: #545558;
  
}
.footer-hzy span {
  margin-right: 75px;
  margin-left: 75px;
  position: relative;
  }
  .root {
    width: 100%;
    height: 100%;
    font-family: '微软雅黑';
   
  }

  .top_div {
    height: 4.5%;
  }
  #header-hzy {
    z-index: 100;
    position:fixed;
    left: 0;
    top: 0;
  }
  
</style>
