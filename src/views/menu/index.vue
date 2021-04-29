<template>
  <div>
    <el-tree
      :data="menus"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <div slot-scope="{ node, data }" class="menu-tree-node">
        <div class="menu-tree-node-info">
          <span>{{ data.meta.title }}</span>
          <el-tag>{{ data.path }}</el-tag>
          <el-tag>{{ data.type === 'CP' ? '内容页' : '非内容页' }}</el-tag>
          <el-tag>{{ data.hidden ? '隐藏' : '显示' }}</el-tag>
        </div>
        <div class="menu-tree-node-btn">
          <el-button
            type="text"
            size="mini"
            @click="() => appendBrother(data)"
          >
            添加同级菜单
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => appendChild(data)"
          >
            添加子菜单
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(data)"
          >
            修改菜单
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >
            移除菜单
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => setFunction(data)"
          >
            功能
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => setApi(data)"
          >
            接口
          </el-button>
        </div>
      </div>
    </el-tree>
    <cy-drawer
      ref="myDrawer"
      :visible="drawer.visible"
      :title="drawer.title"
      :handle-close="handleClose"
      @confirm="doConfirmAction('menuForm')"
      @cancel="$refs.myDrawer.$children[0].closeDrawer()"
    >
      <template slot="content">
        <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="33%">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="menuForm.type">
              <el-radio label="CP">页面</el-radio>
              <el-radio label="NCP">菜单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="menuForm.name" />
          </el-form-item>
          <el-form-item label="路径" prop="path">
            <el-input v-model="menuForm.path" />
          </el-form-item>
          <el-form-item label="重定向路径" prop="redirect">
            <template slot="label"><span :class="{withStar: menuForm.type === 'NCP'}">重定向路径</span></template>
            <el-input v-model="menuForm.redirect" />
          </el-form-item>
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="menuForm.component" />
          </el-form-item>
          <el-form-item label="隐藏菜单" prop="hidden">
            <el-switch v-model="menuForm.hidden" />
          </el-form-item>
          <el-form-item label="标题" prop="meta.title">
            <el-input v-model="menuForm.meta.title" />
          </el-form-item>
          <el-form-item label="图标" prop="meta.icon">
            <template slot="label"><span :class="{withStar: menuForm.type === 'NCP'}">图标</span></template>
            <el-input v-model="menuForm.meta.icon" />
          </el-form-item>
        </el-form>
      </template>
    </cy-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CyDrawer from '@/components/cy-drawer'
export default {
  components: {
    CyDrawer
  },
  data() {
    const redirectPathValidator = (rule, value, callback) => {
      if (this.menuForm.type === 'NCP' && !value) {
        callback(false)
      } else {
        callback()
      }
    }
    const iconValidator = (rule, value, callback) => {
      if (this.menuForm.type === 'NCP' && !value) {
        callback(false)
      } else {
        callback()
      }
    }
    return {
      drawer: {
        visible: false,
        title: ''
      },
      menuForm: {
        id: '',
        parentId: '',
        type: 'CP',
        path: '',
        name: '',
        redirect: '',
        component: '',
        hidden: false,
        meta: {
          title: '',
          icon: ''
        }
      },
      rules: {
        type: [
          { required: true, message: '请选择路由类型', trigger: 'change' }
        ],
        path: [
          { required: true, message: '请填写路由路径', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请填写路由名字', trigger: 'change' }
        ],
        redirect: [
          { validator: redirectPathValidator, message: '请填写路由重定向路径', trigger: 'change' }
        ],
        component: [
          { required: true, message: '请填写路由组件名', trigger: 'change' }
        ],
        hidden: [
          { required: true, message: '请选择路由是否隐藏', trigger: 'change' }
        ],
        'meta.title': [
          { required: true, message: '请填写路由标题', trigger: 'change' }
        ],
        'meta.icon': [
          { validator: iconValidator, message: '请填写路由图标名', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['menus', 'loading'])
  },
  methods: {
    ...mapActions(['toggleLoading']),
    doConfirmAction(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.drawer.visible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose() {
      if (this.loading) {
        return
      }
      this.$confirm('表单内容未保存，确定要关闭吗？')
        .then(() => {
          this.drawer.visible = false
          this.$refs['menuForm'].resetFields()
        })
        .catch(_ => {})
    },
    appendBrother(data) {
      console.log(data)
      this.drawer.visible = true
      this.drawer.title = '新增菜单'
    },
    edit(data) {
      this.drawer.visible = true
      this.drawer.title = '编辑菜单'
      this.menuForm = { ...data }
    },
    appendChild(data) {
      this.drawer.visible = true
      this.drawer.title = '新增菜单'
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    remove(node, data) {
      console.log(node)
      console.log(data)
      // const parent = node.parent
      // const children = parent.data.children || parent.data
      // const index = children.findIndex(d => d.id === data.id)
      // children.splice(index, 1)
    },
    setFunction(data) {
      // TODO
    },
    setApi(data) {
      // TODO
    }
  }
}
</script>
<style lang="scss">
.el-tree-node__content {
  margin: 0.25rem 0;
}
</style>
<style lang="scss" scopped>
.withStar{
  &:before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
}
.menu-tree-node{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .menu-tree-node-info {
    flex: 1;
    span{
      padding-right: 1rem;
    }
    .el-tag {
      margin-right: 1rem;
    }
  }
  .menu-tree-node-btn {
    width: 22rem;
  }
}
</style>
