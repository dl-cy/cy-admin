<template>
  <div>
    <h1>Pseudo Class</h1>
    <el-tabs tab-position="left">
      <el-tab-pane label="动态伪类选择器" class="pc-1">
        <a href="">visited|hover|active|link</a>
      </el-tab-pane>
      <el-tab-pane label="UI元素状态伪类选择器" class="pc-2">
        <input type="text"><br>
        <input type="text" disabled>
      </el-tab-pane>
      <el-tab-pane label="结构伪类选择器" class="pc-3">
        <ul>
          <li><a href="">1</a></li>
          <li><a href="">2</a></li>
          <li><a href="">3</a></li>
          <li><a href="">4</a></li>
          <li><a href="">5</a></li>
          <li><a href="">6</a></li>
          <li><a href="">7</a></li>
          <li><a href="">8</a></li>
          <li><a href="">9</a></li>
          <li><a href="">10</a></li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="伪元素" class="pc-4">
        <div>First letter: The scale transform can be emulated in IE &lt; 9 using Microsoft's "zoom" extension, others are (not easily) possible using the MS Matrix filter. Does not support CSS transforms on SVG elements (transform attribute can be used instead)</div>
        <div>Before:</div>
        <div>After:</div>
      </el-tab-pane>
      <el-tab-pane label="作业" class="pc-5">
        <div class="demo">Hello, Han Mei</div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.pc-1{
  a:link {
    color: yellow;
  }
  a:visited {
    color: red;
  }
  a:hover {
    color: black;
  }
  a:active {
    color: green
  }
}
.pc-2{
  input:enabled {
    background: #f09b57;
    color: #fff;
  }
  input:disabled {
    background: #bbb;
  }
}
.pc-3{
  ul {
    width: 400px;
    border: 1px solid #bbb;
    padding: 20px;
    li{
      list-style: none;
      display: inline-block;
      padding: 3px;
      border: 1px solid #bbb;
      margin: 0 2px;
      width: 28px;
      height: 28px;
      a {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #f36;
        display: block;
        text-align: center;
        line-height: 20px;
      }
    }
    li:first-child{
      background: #0f0;
    }
    li:nth-child(2n){
      background: #bbb
    }
    li:nth-last-child(2n){
      background: #bbb
    }
    li:nth-last-of-type(){
      background: #bbb
    }
    li:nth-of-type(){
      background: #bbb
    }
    li:only-child{
      background: #bbb
    }
    li:only-of-type{
      background: #bbb
    }
  }
}
.pc-4 {
  div:first-child{
    border: 1px solid #bbb;
    padding: 10px;
    margin-bottom: 10px;
    clear: both;
    &::first-letter{
      font-size: 28px;
      font-weight: 700;
      float: left;
    }
    &::first-line{
      color: #00f;
    }
  }
  div:nth-child(2n){
    border: 1px solid #bbb;
    padding: 10px;
    margin-bottom: 10px;
    clear: both;
    &::before{
      content: url(../../../assets/images/loading.gif);
    }
  }
  div:last-child{
    border: 1px solid #bbb;
    padding: 10px;
    margin-bottom: 10px;
    clear: both;
    &::after{
      content: url(../../../assets/images/loading.gif);
    }
  }
}
.pc-5{
  .demo {
    height: 36px;
    width: 200px;
    line-height: 36px;
    padding: 0 10px;
    border-radius: 6px;
    background-color: #6a6;
    margin-left: 20px;
    color: #fff;
    position: relative;
    &::before {
      content: '';
      border-top: 10px solid transparent;
      border-right: 10px solid #6a6;
      border-bottom: 10px solid transparent;
      border-left: 0px solid #6a6;
      position: absolute;
      left: -10px;
      top: 8px;
    }
  }
}
</style>
