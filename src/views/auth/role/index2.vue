<template>
  <div class="app-container">
    <eHeader :permissions="permissions" :query="query"/>

    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="remark" label="描述"/>
      <el-table-column prop="created_at" label="创建日期" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']" :permissions="permissions" :data="scope.row" :sup_this="sup_this"/>
          <el-popconfirm v-permission="['ADMIN','ROLES_ALL','ROLES_DELETE']" title="确定删除本条数据吗？" @onConfirm="subDelete(scope.row.id)">
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
  import initData from '@/mixins/initData'
  import eHeader from './module/header'
  import edit from './module/edit'

  export default {
    components: { eHeader, edit },
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
        this.url = '/admin/role'
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
        this.$api.permission.role.del(id).then(res => {
          this.delLoading = false
          this.init()
          this.$notify({ title: '删除成功', type: 'success', duration: 2500 })
        }).catch(err => {
          this.delLoading = false
          console.log(err.response.data.message)
        })
      },
      getPermissions() {
        this.$api.permission.permission.getPermissionTree().then(res => {
          this.permissions = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
