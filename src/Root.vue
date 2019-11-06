<template>
  <div id="root" class="root">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'root',
    created() {
      // this.$router.replace('/sysMain')
    },
    mounted() {
      // 在页面加载时读取sessionStorage里的状态信息
      // console.log(sessionStorage.getItem('store'))
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
        sessionStorage.removeItem('store');
      }

      // 在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    },
    methods: {
      offLine() {
        if (this.$store.state.user === undefined || this.$store.state.user === null) {
          this.$confirm('登录已经过期，请重新登录！', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {
              this.$router.replace({path: '/login'});
            })
            .catch(() => {
              return false;
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .root{
    width: 100%;
    height: 100%;
  }
</style>
