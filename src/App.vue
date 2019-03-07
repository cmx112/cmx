<template>
  <div id="app">
    <headerbox></headerbox>
    <Loading></Loading>
    <router-view/>
    <totop></totop>
  </div>
</template>

<script>
import headerbox from "@/components/header-box"
import Loading from "@/components/Loading"
import totop from "@/components/scollToTop"
export default {
  name: 'App',
  components: {
    headerbox,Loading,totop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
