<template>
  <el-drawer
    :title="title"
    :before-close="handleClose"
    :visible.sync="visible"
    :show-close="false"
    direction="rtl"
  >
    <div class="drawer-container">
      <div class="drawer-content">
        <slot name="content" />
      </div>
      <div class="drawer-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    handleClose: {
      type: Function,
      default() {
        return () => {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Drawer'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    comfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.drawer-content {
  flex: 1;
  padding-right: 2.5rem;
}

.drawer-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5rem;
  height: 4rem;
  padding: 1rem 2.5rem;
}
</style>
