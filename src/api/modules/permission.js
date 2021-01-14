import createAPI from '@/utils/request'

const permission = {

  // 授权信息相关
  auth: {
    login: config => createAPI('/admin/auth/login', 'POST', config),
    getInfo: config => createAPI('/admin/auth/info', 'GET', config),
    logout: config => createAPI('/admin/auth/logout', 'GET', config),
    //构建菜单
    buildMenus: () => createAPI('/admin/auth/menus', 'GET', {}),
  },

  // 管理员用户相关
  user: {
    add: config => createAPI('/admin/users', 'POST', config),
    edit: config => createAPI('/admin/users', 'PUT', config),
    del: id => createAPI('/admin/users/' + id, 'DELETE', {}),

    //获取用户的信息
    getUserInfo: () => createAPI('/admin/users/info', 'GET', {}),

    //验证密码
    validPass: pass => createAPI('/admin/users/valid-pass?pass=' + pass, 'GET', {}),
    //修改密码
    updatePass: config => createAPI('/admin/users/update-pass', 'PUT', config),
    //修改手机号
    updatePhone: config => createAPI('/admin/users/update-phone', 'PUT', config),
    //修改用户信息
    updateUser: config => createAPI('/admin/users/update-user', 'PUT', config),
    //修改头像信息
    updateAvatar: config => createAPI('/admin/users/update-avatar', 'PUT', config),
  },

  // 角色管理
  role: {
    add: config => createAPI('/admin/role', 'POST', config),
    edit: config => createAPI('/admin/role', 'PUT', config),
    del: id => createAPI('/admin/role/' + id, 'DELETE', {}),

    // 获取角色的用户信息
    getUser: roleId => createAPI('/admin/role/get-user?role_id=' + roleId, 'GET', {}),
    // 保存角色的用户信息
    saveUser: config => createAPI('/admin/role/save-user', 'POST', config),
    // 获取角色的菜单信息
    getMenu: roleId => createAPI('/admin/role/get-menu?role_id=' + roleId, 'GET', {}),
    // 保存角色的菜单信息
    saveMenu: config => createAPI('/admin/role/save-menu', 'POST', config),

    getRoleTree: config => createAPI('/admin/role/tree', 'get', config),
  },

  // 用户基本权限操作
  permission: {
    add: config => createAPI('/admin/permission', 'POST', config),
    edit: config => createAPI('/admin/permission', 'PUT', config),
    del: id => createAPI('/admin/permission/' + id, 'DELETE', {}),
    getPermissionTree: config => createAPI('/admin/permission/tree', 'GET', config)
  },

  // 菜单管理
  menu: {
    add: config => createAPI('/admin/menu', 'POST', config),
    edit: config => createAPI('/admin/menu', 'PUT', config),
    del: id => createAPI('/admin/menu/' + id, 'DELETE', {}),

    getMenusTree: config => createAPI('/admin/menu/tree', 'GET', config)
  },

  // 配置项管理
  config: {
    list: config => createAPI('/admin/book/list', 'POST', config),
    save: config => createAPI('/admin/book/save', 'POST', config),
    delete: config => createAPI('/admin/book/del', 'DELETE', config),

    getParamValue: config => createAPI('/admin/book/param-value', 'POST', config)
  },
}

export default permission
