<template>
  <div>
    <h1>变形</h1>
    <el-tabs tab-position="left">
      <el-tab-pane label="菱形" class="pc-container">
        <div class="diamond"><span>rotate</span></div>
      </el-tab-pane>
      <el-tab-pane label="平行四边形" class="pc-container">
        <div class="parallelogram"><span>skew</span></div>
      </el-tab-pane>
      <el-tab-pane label="五角星" class="pc-container">
        <div class="star-five" />
      </el-tab-pane>
      <el-tab-pane label="六角星" class="pc-container">
        <div class="star-six" />
      </el-tab-pane>
      <el-tab-pane label="等边五边形" class="pc-container">
        <div class="border-five" />
      </el-tab-pane>
      <el-tab-pane label="等边六边形" class="pc-container">
        <div class="border-six" />
      </el-tab-pane>
      <el-tab-pane label="心形" class="pc-container">
        <div class="heart" />
      </el-tab-pane>
      <el-tab-pane label="鸡蛋" class="pc-container">
        <div class="egg" />
      </el-tab-pane>
      <el-tab-pane label="太极图" class="pc-container">
        <div class="tai-chi" />
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
  padding: 75px 0 0 150px;
  .diamond {
    height: 150px;
    width: 150px;
    background-color: #f36;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    text-align: center;
    line-height: 150px;
    span{
      display: block;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
    }
  }

  .parallelogram {
    height: 100px;
    width: 200px;
    text-align: center;
    line-height: 100px;
    background-color: #f36;
    transform:skew(30deg);
    -webkit-transform: skew(30deg);
    -moz-transform: skew(30deg);
    -ms-transform: skew(30deg);
    -o-transform: skew(30deg);
    span{
      display: block;
      transform: skew(-30deg);
      -webkit-transform: skew(-30deg);
      -moz-transform: skew(-30deg);
      -ms-transform: skew(-30deg);
      -o-transform: skew(-30deg);
    }
  }

  .star-five{
    height: 0;
    width: 0;
    border-bottom: 70px solid #f36;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-top: 0px solid #f36;
    transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
    -moz-transform: rotate(35deg);
    -ms-transform: rotate(35deg);
    -o-transform: rotate(35deg);
    position: relative;
    &::before {
      content: '';
      border-bottom: 70px solid #f36;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      border-top: 0px solid #f36;
      transform: rotate(-70deg);
      -webkit-transform: rotate(-70deg);
      -moz-transform: rotate(-70deg);
      -ms-transform: rotate(-70deg);
      -o-transform: rotate(-70deg);
      position:absolute;
      left: -105px
    }
    &::after {
      content: '';
      border-bottom: 80px solid #f36;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-top: 0px solid #f36;
      transform: rotate(-35deg);
      -webkit-transform: rotate(-35deg);
      -moz-transform: rotate(-35deg);
      -ms-transform: rotate(-35deg);
      -o-transform: rotate(-35deg);
      position:absolute;
      left: -65px;
      top: -46px;
    }
  }

  .star-six{
    height: 0;
    width: 0;
    border-bottom: 173px solid #f36;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
    border-top: 0px solid #f36;
    position: relative;
    &::before {
      content: '';
      border-top: 173px solid #f36;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      border-bottom: 0px solid #f36;
      position:absolute;
      top: 60px;
      left: -100px;
    }
  }

  .border-five{
    width: 162px;
    border-top: 95px solid #f36;
    border-left: 31px solid transparent;
    border-right: 31px solid transparent;
    border-bottom: 0px solid #f36;
    position: relative;

    &::before {
      content: '';
      border-top: 0px solid #f36;
      border-left: 81px solid transparent;
      border-right: 81px solid transparent;
      border-bottom: 59px solid #f36;
      position: absolute;
      top: -154px;
      left: -31px;
    }
  }

  .border-six{
    height: 100px;
    width: 173.2px;
    background-color: #f36;
    position: relative;

    &::before {
      content: '';
      border-left: 86.6px solid transparent;
      border-right: 86.6px solid transparent;
      border-bottom: 50px solid #f36;
      position: absolute;
      top: -50px;
    }
    &::after {
      content: '';
      border-left: 86.6px solid transparent;
      border-right: 86.6px solid transparent;
      border-top: 50px solid #f36;
      position: absolute;
      top: 100px;
    }
  }

  .heart{
    height: 100px;
    width: 100px;
    background-color: transparent;
    position: relative;

    &::before {
      content: '';
      height: 80px;
      width: 50px;
      background-color: #f36;
      border-radius: 25px 25px 0 0;
      position: absolute;
      transform-origin: 100% 100%;
      -webkit-transform-origin: 100% 100%;
      -moz-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
    }
    &::after {
      content: '';
      height: 80px;
      width: 50px;
      background-color: #f36;
      border-radius: 25px 25px 0 0;
      position: absolute;
      left: 50px;
      transform-origin: 0 100%;
      -webkit-transform-origin: 0 100%;
      -moz-transform-origin: 0 100%;
      -ms-transform-origin: 0 100%;
      -o-transform-origin: 0 100%;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
    }
  }

  .egg{
    height: 160px;
    width: 126px;
    background-color: #f3af79;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }

  .tai-chi {
    height: 300px;
    width: 300px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: #ccc 0 1px 8px 1px;
    border-left: 150px solid #000;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: -75px;
      top: 0;
      width: 150px;
      height: 150px;
      background-color: #fff;
      border-radius: 50%;
      border: 50px solid #000;
    }
    &::after {
      content: '';
      position: absolute;
      left: -75px;
      bottom:0;
      width: 150px;
      height: 150px;
      background-color: #000;
      border-radius: 50%;
      border: 50px solid #fff;
    }
  }
}
</style>
