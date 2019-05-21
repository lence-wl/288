<template>
  <div id="app">
    <div class="layoutBox">
      <Head></Head>
      <router-view/>
    </div>
  </div>
</template>
<script>
    import Head from './components/head'

  export default {
      components:{
          Head
      }

  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}

</style>
