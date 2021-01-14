<!--
 * @Description:
 * @Version: 1.0
 * @Author: Yuanjy
 * @Date: 2020-03-09 20:41:17
 * @LastEditors: Yuanjy
 * @LastEditTime: 2020-04-26 19:27:02
 -->
<template>
  <div class="app-container">
    <eHeader :permissions="permissions" :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" ref="table" :data="data" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column prop="alias" label="名称" />
      <el-table-column prop="name" label="权限名称" />
      <el-table-column prop="created_at" label="创建日期" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','PERMISSION_ALL','PERMISSION_DELETE']" :permissions="permissions" :data="scope.row" :sup_this="sup_this"/>
          <el-popconfirm v-permission="['ADMIN','PERMISSION_ALL','PERMISSION_DELETE']" title="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！" @onConfirm="subDelete(scope.row.id)">
             <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import initData from '@/mixins/initData'
  import treeTable from '@/components/TreeTable'
  import eHeader from './module/header'
  import edit from './module/edit'

  export default {
    components: { eHeader, edit, treeTable },
    mixins: [initData],
    data() {
      return {
        delLoading: false,
        sup_this: this,
        permissions: []
      }
    },
    created() {
      this.getPermissions()
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      beforeInit() {
        this.url = '/admin/permission'
        const query = this.query
        this.params = { page: this.page, limit: this.limit }
        for (const k in query) {
          if (query[k]) {
            this.params[k] = query[k]
          }
        }
        return true
      },
      subDelete(id) {
        this.delLoading = true
        this.$api.permission.permission.del(id).then(res => {
          this.delLoading = false
          this.init()
          this.$notify({ title: '删除成功', type: 'success', duration: 2500 })
        }).catch(err => {
          this.delLoading = false
          console.log(err.response.data.message)
        })
      },
      getPermissions() {
        this.$api.permission.permission.getPermissionTree({}).then(res => {
          this.permissions = []
          const permission = { id: 0, label: '顶级类目', children: [] }
          permission.children = res.data
          this.permissions.push(permission)
        })
      }
    }
  }
</script>

<style scoped>

</style>
