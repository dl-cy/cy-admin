// import { deleteRequest, getRequest, postRequest, putRequest } from '@/utils/request'
const user = {
  id: 1,
  username: 'rootman',
  name: 'root',
  phone: '18888888888',
  avatar: 'handsome.png',
  password: '123456',
  roleId: 1
}

const role = {
  id: 1,
  name: 'root',
  menuIds: [1, 2, 3],
  functions: [1, 2, 3],
  desc: '没有人比我更懂操作'
}
/**
 * 1. 如果菜单需要重定向，则设定重定向路径，否则设定功能
 * 2. 只有一级菜单可在meta中设置图标, path带‘/’
 */
const menus = [
  {
    id: 1,
    parentId: null,
    level: 1,
    order: 1,
    type: 'NCP',
    path: '/permission',
    name: 'Permission',
    redirect: '/permission/user',
    component: 'layout',
    hidden: false,
    meta: {
      title: '权限管理',
      icon: 'el-icon-key'
    }
  },
  {
    id: 2,
    parentId: 1,
    level: 2,
    order: 2,
    type: 'CP',
    path: 'user',
    name: 'User',
    redirect: '',
    component: 'user',
    hidden: false,
    meta: {
      title: '人员管理'
    }
  },
  {
    id: 3,
    parentId: 1,
    level: 2,
    order: 3,
    type: 'CP',
    path: 'role',
    name: 'Role',
    redirect: '',
    component: 'role',
    hidden: false,
    meta: {
      title: '角色管理'
    }
  },
  {
    id: 4,
    parentId: 1,
    level: 2,
    order: 4,
    type: 'CP',
    path: 'menu',
    name: 'Menu',
    redirect: '',
    component: 'menu',
    hidden: false,
    meta: {
      title: '菜单管理'
    }
  },
  {
    id: 5,
    parentId: null,
    level: 1,
    order: 5,
    type: 'NCP',
    path: '/system',
    name: 'System',
    redirect: '/system/biz-const',
    component: 'layout',
    hidden: false,
    meta: {
      title: '系统配置',
      icon: 'el-icon-setting'
    }
  },
  {
    id: 6,
    parentId: 5,
    level: 2,
    order: 6,
    type: 'CP',
    path: 'biz-const',
    name: 'Bussiness const',
    redirect: '',
    component: 'system/biz-const',
    hidden: false,
    meta: {
      title: '业务常量'
    }
  },
  {
    id: 7,
    parentId: 5,
    level: 2,
    order: 7,
    type: 'CP',
    path: 'error-notice',
    name: 'Error notice',
    redirect: '',
    component: 'system/error-notice',
    hidden: false,
    meta: {
      title: '异常提醒'
    }
  },
  {
    id: 8,
    parentId: null,
    level: 1,
    order: 8,
    type: 'CP',
    path: '/profile',
    name: 'Profile',
    redirect: '',
    component: 'profile',
    hidden: true,
    meta: {
      title: '纲领本纲'
    }
  }
]
/**
 * 将获取的menu数据按照父子关系生成类Router树
 * @param {*} menus 按照order顺升序返回的菜单列表
 * @param {*} tree 父级树
 */
function treeMenus(menus, tree = []) {
  tree.forEach(p => {
    const children = menus.filter(child => child.parentId === p.id)
    if (children && children.length > 0) {
      treeMenus(menus, children)
      p.children = children
    }
  })
}
const rootMenus = menus.filter(menu => !menu.parentId)
const childMenus = menus.filter(menu => menu.parentId)
treeMenus(childMenus, rootMenus)
const functions = [
  {
    id: 1,
    name: '查询用户',
    key: 'user-query',
    menuId: 2
  }
]
export function login(payload) {
  // postRequest('', payload)
  return new Promise((resolve) => {
    resolve({ data: { token: 'caoyeadmin' }})
  })
}

export function getUserInfo(params) {
  // getRequest('', params)
  return new Promise((resolve) => {
    resolve({
      data: {
        menus: rootMenus,
        functions,
        user
      }
    })
  })
}

export function logout(payload) {
  // postRequest('', payload)
  return new Promise((resolve) => {
    resolve()
  })
}

export function deleteUser(id) {
  // deleteRequest('' + id)
}

export function updateUser(data) {
  // putRequest('', data)
}

export function getRoles(data) {
  // putRequest('', data)
  return new Promise((resolve) => {
    resolve([role])
  })
}
