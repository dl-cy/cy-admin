<template>
  <div>
    <h2>animation</h2>
    <div id="remark">animationanimationanimationanimationanimationanimationanimationanimationanimationanimation</div>
    <el-tabs tab-position="left">
      <el-tab-pane label="spinner" class="pc-container">
        <div class="spinner">
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </el-tab-pane>
      <el-tab-pane label="loading" class="pc-container">
        <div class="loading">
          <div />
          <div />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#remark {
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.pc-container{
  height: 400px;
  .spinner {
    height: 40px;
    width: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 10px;

    div{
      background-color: #f36;
      height: 100%;
      width: 6px;
      display: inline-block;
      margin: 2px;
      animation: spinner 1.2s infinite ease-in-out;
    }
    div:nth-child(2){
      animation-delay: -1.1s;
    }
    div:nth-child(3){
      animation-delay: -1s;
    }
    div:nth-child(4){
      animation-delay: -0.9s;
    }
    div:nth-child(5){
      animation-delay: -0.8s;
    }
    @keyframes spinner {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }
      20%, 60% {
        transform: scaleY(1);
      }
    }
  }

  .loading {
    height: 80px;
    width: 80px;
    position: relative;

    div{
      background-color: #f36;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.6;
      animation: loading 2s infinite ease-in-out;
    }
    div:nth-child(2){
      animation-delay: -1s;
    }
    @keyframes loading {
      0%, 100% {
        transform: scale(0);
      }
     50% {
        transform: scale(1);
      }
    }
  }
}
</style>
