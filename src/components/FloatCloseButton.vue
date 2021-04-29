<template>
  <div class="btn-close bold center" @click="$router.go(-1)">
    <van-icon name="revoke" style="line-height: 4rem" size="2rem" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btn-close{
  right: 2rem;
  position: fixed;
  bottom: 8rem;
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  color: #fff;
  background-color: #909399;
  box-shadow: 0 0.2rem 0.75rem 0 rgba(0,0,0,.1);
  z-index: 1000;
}
</style>
