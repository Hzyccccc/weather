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
  <div style='width: 100%; height: 100%'>
  
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
              style="width: 145px; height: 60px;display: inline-block; cursor: pointer"
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
            <div v-else style="float: right;color: white; margin-right: 10%; line-height: 60px; font-size: 24px; ">
                <span @click="login()" style="cursor:Pointer">登录</span>&nbsp;|&nbsp;<span style="cursor:Pointer">注册</span>
            </div>
          </el-col>
        </div>
      </el-row>
        
       
      </div>
      
        <div id="body_layout">

      
        <el-row style="height: 50%" :gutter="20" id="main-hzy">
          <el-col :span="6" v-for="(itm, i) in data1" :key="itm.id" class="mian-hzy">
            <el-card :body-style="{ padding: '0px' }" class="btn_card" @click.native="toShowPages(itm.id)">
              <img :src="'static/showimg/' + i + '.png'" class="image">
              <div style="padding: 14px;">
                <span>{{itm.title}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- <el-row style="height: 50%" :gutter="20">
          <el-col :span="6" style="padding: 30px" v-for="itm in data2" :key="itm.id">
            <el-card :body-style="{ padding: '0px' }" class="btn_card" @click.native="toShowPages(itm.id)">
              <img :src="'static/showimg/' + itm.id + '.png'" class="image">
              <div style="padding: 14px;">
                <span>{{itm.title}}</span>
              </div>
            </el-card>
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
    data() {
      return {
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
        console.log(token)
        if (!token) {
          this.$router.replace('/login');
          // this.$router.push({name: 'login', params: {id: id}})
        } else {

          // 权限判断
          this.axios.post('/aicUserSelectSystemRole/selectSystemRoleByUserId',{
            userId: this.user.userId,
            sysModId:id
          }).then(res =>{
            console.log(res);
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
      toIndex() {
        this.$router.push('/sysMain');
      }
    }
  }
</script>

<style scoped>
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
.mian-hzy {
  padding: 0 10px 30px 10px;
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
 
  padding: 2%;
  display: flex;
   flex-wrap: wrap;
}
  .head_img:hover, .btn_card:hover{cursor: pointer}
 
  #body_layout {
    margin: 50px 2% 70px 2%;
  }
  #body_layout>>>.el-col{
    
    height: 100%;
    text-align: center;
  }
</style>
