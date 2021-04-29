<template>
  <div class="login-container">
    <canvas id="canvas" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">✕ 系统支撑平台</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <i slot="suffix" class="el-input__icon el-icon-user" />
        </el-input>
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          >
            <i slot="suffix" class="el-input__icon" :class="passwordType ? 'el-icon-view' : 'el-icon-aim'" @click="showPwd" />
          </el-input>
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      canvas: null,
      ctx: null,
      centerX: 0,
      centerY: 0,
      mousedown: false,
      mouseover: false,
      posX: 0,
      posY: 0,
      points: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    // window.addEventListener('resize', this.size.bind(this))
    window.addEventListener('mousemove', function(e) {
      this.posX = e.clientX
      this.posY = e.clientY
    })
    window.addEventListener('mousedown', function() {
      this.mousedown = true
    })
    window.addEventListener('mouseup', function() {
      this.mousedown = false
    })
    window.addEventListener('mouseover', function() {
      this.mouseover = true
    })
    window.addEventListener('mouseout', function() {
      this.mouseover = false
    })
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    this.drawCavans()
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    drawCavans() {
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      let centerX, centerY
      const partNum = 3000
      let mousedown = false
      let X, Y
      const P = []
      class Part {
        constructor(x, y, vx, vy, r, red, green, blue, alpha, col) {
          this.x = x
          this.y = y
          this.vx = vx
          this.vy = vy
          this.r = r
          this.red = red
          this.green = green
          this.blue = blue
          this.alpha = alpha
          this.col = col
        }
      }

      function rand(min, max) {
        return Math.random() * (max - min) + min
      }

      function size() {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        centerX = canvas.width / 2
        centerY = canvas.height / 2
      }
      size()
      X = centerX
      Y = centerY

      function init() {
        let x, y, vx, vy, r, red, green, blue, alpha, col
        for (let i = 0; i < partNum; i++) {
          x = rand(0, canvas.width)
          y = rand(0, canvas.height)
          vx = rand(-1, 1)
          vy = rand(-1, 1)
          r = rand(1, 3)
          red = Math.round(rand(100, 200))
          green = Math.round(rand(100, 150))
          blue = Math.round(rand(100, 150))
          alpha = 1
          col = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')'

          P.push(new Part(x, y, vx, vy, r, red, green, blue, alpha, col))
        }
      }

      function bg() {
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      function bounce(b) {
        if (b.x < b.r) {
          b.x = b.r
          b.vx *= -1
        }
        if (b.x > canvas.width - b.r) {
          b.x = canvas.width - b.r
          b.vx *= -1
        }

        if (b.y - b.r < 0) {
          b.y = b.r
          b.vy *= -1
        }
        if (b.y > canvas.height - b.r) {
          b.y = canvas.height - b.r
          b.vy *= -1
        }
      }

      function attract(p) {
        const dx = (p.x - X)
        const dy = (p.y - Y)
        const dist = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx)

        if (dist > 10 && dist < 300) {
          if (!mousedown) {
            p.vx -= (20 / (p.r * dist)) * Math.cos(angle)
            p.vy -= (20 / (p.r * dist)) * Math.sin(angle)
          } else if (mousedown) {
            p.vx += (250 / (p.r * dist)) * Math.cos(angle)
            p.vy += (250 / (p.r * dist)) * Math.sin(angle)
          }
        }
      }

      function draw() {
        let p
        for (let i = 0; i < P.length; i++) {
          p = P[i]

          if (mouseover) attract(p)
          bounce(p)

          p.x += p.vx
          p.y += p.vy

          p.vx *= 0.975
          p.vy *= 0.975

          ctx.fillStyle = p.col
          ctx.fillRect(p.x, p.y, p.r, p.r)
        }
      }

      function loop() {
        // bg()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw()

        window.requestAnimationFrame(loop)
      }

      window.onresize = size

      window.onmousemove = function(e) {
        X = e.clientX
        Y = e.clientY
      }

      window.onmousedown = function() {
        mousedown = true
      }

      window.onmouseup = function() {
        mousedown = false
      }

      let mouseover = false

      window.onmouseover = function() {
        mouseover = true
      }

      window.onmouseout = function() {
        mouseover = false
      }

      init()
      loop()
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 100%;
    .el-input__icon{
      font-size: 20px;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 10px 20px;
      color: $light_gray;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    box-shadow: #454545 0 0 4px 2px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    &:hover {
      box-shadow: #f3af79 0 0 4px 2px;
    }
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  height: 100%;
  width: 100%;
  background-image: url('../../assets/images/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;

  .login-form {
    position:fixed;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    margin:0 auto;
    width: 520px;
    padding: 200px 35px 0;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
