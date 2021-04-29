<template>
  <div class="loading">
    <img :src="$images.loading">
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin: 5rem auto;
    width: 200px;
    z-index: 1000;
  }
}
</style>
