import createAPI from '@/utils/request'

// 系统权限相关 API
const system = {

  systemConfig: {
    add: config => createAPI('/admin/configure', 'post', config),
    edit: config => createAPI('/admin/configure', 'put', config),
    del: id => createAPI('/admin/configure/' + id, 'delete', {}),

    queryByNames: config => createAPI('/admin/configure/query-names', 'post', config)
  },
  redis: {
    add: config => createAPI('/admin/redis', 'post', config),
    edit: config => createAPI('/admin/redis', 'put', config),
    del: key => createAPI('/admin/redis?key=' + key, 'delete', {}),
    delAll: config => createAPI('/admin/redis/all', 'delete', config)
  }
}

export default system
