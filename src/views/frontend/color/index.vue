<template>
  <div>
    <h1>渐变</h1>
    <el-tabs tab-position="left">
      <el-tab-pane label="透明背景层" class="pc-container">
        <div class="bg-layer"><div class="content">opacity</div></div>
        <div class="rgba"><h3>RGBA【红/绿/蓝/透明度】</h3></div>
        <div class="hsla"><h3>HSLA【色调/饱和度/亮度/透明度】</h3></div>
        opacity：仅适用于背景透明，弊端一切皆透明，包括文字<br>
        颜色模式： 适用于任何使用色值的属性的透明操作，比如边框，背景，文本
      </el-tab-pane>
      <el-tab-pane label="线性渐变" class="pc-container">
        <div class="linear">linear-gradient：US IE9</div>
      </el-tab-pane>
      <el-tab-pane label="径向渐变" class="pc-container">
        <div class="radial circle">radial-gradient：circle</div>
        <div class="radial ellipse">radial-gradient：ellipse</div>
      </el-tab-pane>
      <el-tab-pane label="线性重复渐变" class="pc-container">
        <div class="repeat-linear">repeat-linear</div>
      </el-tab-pane>
      <el-tab-pane label="径向重复渐变" class="pc-container">
        <div class="repeat-radial">repeat-radial</div>
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
  padding: 10px;
  .bg-layer{
    height: 200px;
    width: 300px;
    background-color: #f36;
    position: relative;
    .content {
      position: absolute;
      height: 120px;
      width: 200px;
      margin-left: -100px;
      left: 50%;
      top: 10px;
      text-align: center;
      padding: 10px;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 2px 3px 6px 0 #888;
      opacity: 0.4;
    }
  }
  .linear{
    height: 200px;
    width: 300px;
    border: 1px solid #bbb;
    border-radius: 6px;
    background-image: linear-gradient(45deg,#fff, #f36);
    background-image: -moz-linear-gradient(45deg,#fff, #f36);
    background-image: -o-linear-gradient(45deg,#fff, #f36);
    background-image: -ms-linear-gradient(45deg,#fff, #f36);
    background-image: -webkit-linear-gradient(45deg,#fff, #f36);
    text-align: center;
    line-height: 200px;
    font-weight: 700;
  }
  .radial{
    height: 200px;
    width: 200px;
    border: 1px solid #bbb;
    border-radius: 50%;
    text-align: center;
    line-height: 200px;
    font-weight: 700;
    float: left;
  }
  .circle{
    background-image: radial-gradient(100px circle at center, #fff, #f36);
  }
  .ellipse{
    background-image: radial-gradient(160px 80px ellipse at right, #fff, #f36, #f09b57);
  }
  .repeat-linear{
    height: 200px;
    width: 300px;
    border: 1px solid #bbb;
    border-radius: 6px;
    background-image: repeating-linear-gradient(45deg,#fff 0px, #f36 30px, #f90 60px);
    background-image: -moz-repeating-linear-gradient(45deg,#fff 0px, #f36 30px, #f90 60px);
    background-image: -o-repeating-linear-gradient(45deg,#fff 0px, #f36 30px, #f90 60px);
    background-image: -ms-repeating-linear-gradient(45deg,#fff 0px, #f36 30px, #f90 60px);
    background-image: -webkit-repeating-linear-gradient(45deg,#fff 0px, #f36 30px, #f90 60px);
    text-align: center;
    line-height: 200px;
    font-weight: 700;
  }
  .repeat-radial{
    height: 250px;
    width: 250px;
    border: 1px solid #bbb;
    border-radius: 50%;
    text-align: center;
    line-height: 250px;
    font-weight: 700;
    float: left;
    background-image: repeating-radial-gradient(100px circle at center, #fff 0px, #f36 30px, #f90 60px);
  }
}
</style>
