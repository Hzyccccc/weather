<template>
  <div class="home">

  </div>
</template>
<script>
  export default {
    mounted () {
//      this.$store.commit('setBreadlist', [{path: '/home', meta: {title: '首页'}}]);
    },
    created() {
      this.$router.replace('/sysMain')
    }
  }
</script>
<style lang="scss" scoped>
  .home{

  }
</style>
