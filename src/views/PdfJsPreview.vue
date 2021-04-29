<template>
  <div class="wrap">
    <div class="pdf-control">
      <div class="pdf-control-page">
        <van-icon class="icon-bigger" name="arrow-left" @click="prev" />
        <span class="page-number-container">
          <input v-model="pageNum" type="number" class="page-number-input" @blur="queueRenderPage(pageNum)">
          / {{ pageCount }}页
        </span>
        <van-icon class="icon-bigger" name="arrow" @click="next" />
      </div>
      <div class="pdf-control-zoom">
        <van-icon class="icon-bigger" name="minus" @click="minus" />
        <van-icon class="icon-bigger" name="plus" @click="plus" />
      </div>
    </div>
    <div class="pdf-container">
      <canvas ref="myCanvas" />
    </div>
    <float-close-button />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FloatCloseButton from '@/components/FloatCloseButton'
import pdfJS from 'pdfjs-dist' // 目前最好用的版本@2.2.228
pdfJS.disableWorker = true
export default {
  components: {
    FloatCloseButton
  },
  data() {
    return {
      pdfDoc: null, // pdfjs 生成的对象
      pageNum: 0, // 当前页数
      pageRendering: false,
      pageNumPending: null,
      scale: 1, // 放大倍数
      pageCount: 0, // 总页数
      maxscale: 5, // 最大放大倍数
      minscale: 0.3 // 最小放大倍数
    }
  },
  created() {
    this.loadPfd(this.$route.query.src)
  },
  methods: {
    ...mapActions({ toggleLoading: 'app/toggleLoading' }),
    loadPfd(url) {
      this.toggleLoading()
      pdfJS.getDocument({ url,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/',
        cMapPacked: true
      }).then(pdf => {
        this.toggleLoading()
        this.pdfDoc = pdf
        this.pageCount = this.pdfDoc.numPages
        this.pageNum = 1
        this.renderPage(this.pageNum)
      })
    },
    // 渲染pdf
    renderPage(num) {
      this.pageRendering = true
      const canvas = this.$refs.myCanvas
      this.pdfDoc.getPage(num).then(page => {
        var viewport = page.getViewport(this.scale)
        canvas.height = viewport.height
        canvas.width = viewport.width
        canvas.style.width = viewport.width * 0.6 + 'px' // 画布的框架大小
        canvas.style.height = viewport.height * 0.6 + 'px'
        const ctx = canvas.getContext('2d')
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        var renderTask = page.render(renderContext)
        renderTask.promise.then(() => {
          this.pageRendering = false
          if (this.pageNumPending !== null) {
            this.renderPage(this.pageNumPending)
            this.pageNumPending = null
          }
        })
      })
    },
    plus() {
      if (this.scale >= this.maxscale) {
        return
      }
      this.scale += 0.1
      this.queueRenderPage(this.pageNum)
    },
    minus() {
      if (this.scale <= this.minscale) {
        return
      }
      this.scale -= 0.1
      this.queueRenderPage(this.pageNum)
    },
    prev() {
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
    },
    next() {
      if (this.pageNum >= this.pageCount) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    },
    queueRenderPage(num) {
      var number = Number(num)
      if (this.pageRendering) {
        this.pageNumPending = number
      } else {
        this.renderPage(number)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  background-color: #fff !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  .pdf-container {
    flex: 1;
    overflow: auto;
    text-align: center;
    padding-top: 0.375rem;
    background-color: rgba(0,0,0,0.2);
  }
  .pdf-control {
    display: flex;
    padding: 0 0.75rem;
    height: 2.5rem;
    align-items: center;
    background: #676767;
    justify-content: space-between;
    color: #ffffff;
    .pdf-control-page {
      height: 100%;
      width: 9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .page-number-input {
        width: 2.5rem;
        height: 1.5rem;
        text-align: center;
        background-color: #363636;
        border: none;
        border-radius: 0.25rem;
        box-sizing: border-box;
        color: #fff;
      }
    }
    .pdf-control-zoom {
      width: 4.75rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
