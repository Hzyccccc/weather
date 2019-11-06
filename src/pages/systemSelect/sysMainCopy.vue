<template>
  <div id="root" class="root" style="overflow-x: hidden">
    <div class="top_div">
      <el-row>
        <div id="header-hzy" style=" height:60px ;width: 100%;background-color:rgba(22,22,30,0.5)">
          <el-col :span="3">
            <el-image
              style="width: 145px; height: 60px;display: inline-block;"
              src="static/logo.png"
            ></el-image>
          </el-col>
          <el-col :span="12">
            <span style="font-size: 26px ;color: white ;line-height: 60px;">四维智联创新应用展示中心</span>
          </el-col>
          <el-col :span="9">
            <ul v-if="user" style="display: inline-block;float: right;margin: 0 35px;color:#fff;font-size:26px">
              <li @click="exit" class="user-icon" style="padding: 0;cursor:pointer;">
                <el-dropdown
                  :show-timeout="10"
                  :hide-timeout="10"
                  
                  style="padding: 15px 15px;color:#fff;">
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
            <div v-else style="float: right;color: white; margin-right: 10%; line-height: 60px; font-size: 24px; ">
                <span @click="login()" style="cursor:Pointer">登录</span>&nbsp;|&nbsp;<span style="cursor:Pointer">注册</span>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div>
      <el-image style="width: 100%; height:350px; margin-top: -3px" src="static/banner_01.jpg"></el-image>
    </div>
    <div class="menu_div">
        <el-card>
            <div class="menu-div-hzy">
              <img src="static/1.png" />
              <div >高精短时极端天气预警系统</div>
            </div>
            <div class="menu-img-hzy">
              <img src="static/weather1.png" />
            </div>
            <div style="padding-top:5px">
              <el-link type="primary" @click="checkAuth(100010)" style="float: right;font-size: 16px">进入系统<i class="el-icon-caret-right"></i></el-link>
            </div>
        </el-card>
        <el-card>
            <div class="menu-div-hzy">
              <img src="static/1.png" />
              <div >高精短时恶劣天气预警系统</div>
            </div>
            <div class="menu-img-hzy">
              <img src="static/weather1.png" />
            </div>
            <div style="padding-top:5px">
              <el-link type="primary" @click="checkAuth(100301)" style="float: right;font-size: 16px">进入系统<i class="el-icon-caret-right"></i></el-link>
            </div>
        </el-card>
          <el-card>
            <div class="menu-div-hzy">
              <img src="static/2.png" />
              <div>极端天气车辆预警系统</div>
            </div>
            <div  class="menu-img-hzy">
              <img src="static/weather2.png" />
            </div>
            <div style="padding-top:5px">
              <el-link type="primary" @click="checkAuth(100101)" style="float: right;font-size: 16px">进入系统<i class="el-icon-caret-right"></i></el-link>
            </div>
          </el-card>
           <!-- <el-card>
            <div class="menu-div-hzy">
              <img src="static/3.png" />
              <div >台风利奇马极端天气展示系统</div>
            </div>
            <div  class="menu-img-hzy">
              <img src="static/weather3.png" />
            </div>
            <div style="padding-top:5px">
              <el-link type="primary" style="float: right;font-size: 16px" @click="checkAuth(3)">进入系统<i class="el-icon-caret-right"></i></el-link>
            </div>
          </el-card> -->
          <el-card>
            <div class="menu-div-hzy">
              <img src="static/3.png" />
              <div >气象数据可视化系统</div>
            </div>
            <div  class="menu-img-hzy">
              <img src="static/weather3.png" />
            </div>
            <div style="padding-top:5px">
              <el-link type="primary" style="float: right;font-size: 16px" @click="checkAuth(100299)">进入系统<i class="el-icon-caret-right"></i></el-link>
            </div>
        </el-card>
          
      <!-- <el-row :gutter="30">
        <el-col :span="7">
         
        </el-col>
        <el-col :span="7">
          
        </el-col>
        <el-col :span="7">
         
        </el-col>
      </el-row> -->
    </div>
    <footer style="border-top: solid #A0A0A0 1px;">
       <div class="footer-hzy">
          <span>	&copy;2017-2019&nbsp;北京四维智联科技有限公司</span>
          
          <span>
            <div class="flooticon-hzy">
              <img src="static/title3.png" alt="" style="width:15px;height:15px">
            </div>
            京ICP备08100418号-10
          </span>
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
      checkAuth(id) {
        // || sessionStorage.getItem('token')
        var token = this.$store.state.token;
        console.log(token)
        if (!token) {
          this.$router.replace('/login');
          // this.$router.push({name: 'login', params: {id: id}})
        } else {
          console.log(1111212);
          console.log('===');
          
          console.log(this.user.userId);
          console.log(id);
          console.log('===');

          // 权限判断
          this.axios.post('/aicUserSelectSystemRole/selectSystemRoleByUserId',{
            userId: this.user.userId,
            sysModId:id
          }).then(res =>{
            console.log(res);
            if(res.status === 620) {
              // 成功
              switch (id) {
                case 100010:
                  this.toHPSWeather()
                  break
                case 100101:
                  this.toSWeatherCar()
                  break
                  case 100301:
                  this.toAdverse()
                  break
                case 3:
                  this.toShowSystem()
                  break
                case 100299:
                  this.toShowcd()
                  break
                }   
            }else if(res.status === 600){
              this.$message({message: '该模块已停用', type: 'error'});              
            }else if(res.status === 610){
              this.$message({message: '该模块已删除', type: 'error'});              
            }else if(res.status === 650){
              this.$message({message: '该模块不存在', type: 'error'});              
            }else if(res.status === 630){
              this.$message({message: '该用户无权限进入', type: 'error'});              
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
.flooticon-hzy {
  width: 5px;
  height: 5px;
  position: absolute;
  top: 1px;
  left: -18px;
}
.footer-hzy {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  height: 150px;
  
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
  .menu_div {

    margin: 3.5%;
    // margin-left: 12%;
    // width: 100%;
    display:flex;
     flex-wrap:wrap;
    justify-content: center;
   .el-card {
     margin: 30px 30px 0 30px;
   }
    .menu-div-hzy {
 
      display: flex;
      justify-content: flex-start;
   
      div {
        line-height: 40px;
        
       
      
      }
    }
     .menu-img-hzy {
      width: 323px;
      height: 194px;
      img {
        width: 100%;
        height: 100%;
      }
  }
  }
</style>
