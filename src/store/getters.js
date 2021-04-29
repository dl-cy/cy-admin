const getters = {
  loading: state => state.app.loading,
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  menus: state => state.user.menus,
  functions: state => state.user.functions,
  permissionRoutes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
