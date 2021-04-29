<template>
  <div id="app">
    <loading v-if="loading" />
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from '@/components/Loading'
export default {
  name: 'App',
  components: {
    Loading
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
