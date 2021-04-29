<template>
  <div>
    <div class="pdf-btn">
      <van-button size="small" type="primary" color="#f09b57" :disabled="currentPage==1" @click="changePdfPage(0)">上一页</van-button>
      <span style="margin: 0 0.375rem" class="bold">{{ currentPage }} / {{ pageCount }}</span>
      <van-button size="small" type="primary" color="#f09b57" :disabled="currentPage===pageCount" @click="changePdfPage(1)">下一页</van-button>
    </div>
    <pdf
      :src="src"
      :page="currentPage"
      @num-pages="pageCount=$event || 0"
      @page-loaded="currentPage=$event"
      @loaded="loadPdfHandler"
    />
    <float-close-button />
  </div>
</template>
<script>
import pdf from 'vue-pdf-signature' // 替换vue-pdf组件, 解决签章不显示，重复加载不显示问题
import CMapReaderFactory from 'vue-pdf-signature/src/CMapReaderFactory.js' // 兼容中文
import { mapActions } from 'vuex'
import FloatCloseButton from '@/components/FloatCloseButton'
export default {
  components: {
    pdf,
    FloatCloseButton
  },
  data() {
    return {
      src: null,
      pageCount: 0,
      currentPage: 0
    }
  },
  created() {
    this.src = pdf.createLoadingTask({
      url: this.$route.query.src,
      CMapReaderFactory
    })

    this.toggleLoading()
    this.src.promise.then(pdf => {
      this.toggleLoading()
    })
  },
  methods: {
    ...mapActions({ toggleLoading: 'app/toggleLoading' }),
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    loadPdfHandler(e) {
      this.currentPage = 1
    }
  }
}
</script>
<style lang="scss">
.pdf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-bottom: 2px solid #e0e0e0;
}
</style>
