<template>
  <div>
    <h2>transition</h2>
    <el-tabs tab-position="left">
      <el-tab-pane label="变形过渡" class="pc-container">
        <div class="demo1">变形</div>
      </el-tab-pane>
      <el-tab-pane label="平行四边形" class="pc-container">
        <div class="parallelogram"><span>skew</span></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.pc-container{
  height: 400px;
  .demo1 {
    height: 150px;
    width: 150px;
    background-color: #f36;
    cursor: pointer;
    transition: all 1s .2s ease;
    -moz-transition: all 1s .2s ease;
    -o-transition: all 1s .2s ease;
    -webkit-transition: all 1s .2s ease;
    -ms-transition: all 1s .2s ease;
    text-align: center;
    line-height: 150px;
    border: none;

    &:hover{
      width: 275px;
      height: 200px;
      line-height: 200px;
      background-color: sandybrown;
      border-radius: 8px;
    }
  }
}
</style>
