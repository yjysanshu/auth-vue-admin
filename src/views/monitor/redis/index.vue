<template>
  <div class="app-container">
    <eHeader :query="query"/>

    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <div>{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="key" label="KEY" width="300">
        <template slot-scope="scope">
          <div style="word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            {{ scope.row.key }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="VALUE">
        <template slot-scope="scope">
          <div style="word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            {{ scope.row.value }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN','REDIS_ALL','REDIS_DELETE']" :data="scope.row" :sup_this="sup_this"/>
          <el-popconfirm v-permission="['ADMIN','REDIS_ALL','REDIS_DELETE']" title="确定删除本条数据吗？" @onConfirm="subDelete(scope.row.id)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
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
        this.url = '/admin/redis'
        const query = this.query
        const value = query.value
        this.params = { page: this.page, limit: this.limit }
        if (value) {
          this.params['key'] = value
        } else {
          this.params['key'] = '*'
        }
        return true
      },
      subDelete(index, row) {
        this.delLoading = true
        this.$api.system.redis.del(row.key)
          .then(res => {
            this.delLoading = false
            this.init()
            this.$notify({ title: '删除成功', type: 'success', duration: 2500 })
          }).catch(err => {
            this.delLoading = false
            console.log(err.response.data.message)
          })
      },
      getPermissions() {
        this.$api.permission.permission.getPermissionTree()
          .then(res => {
            this.permissions = res
          })
      }
    }
  }
</script>

<style scoped>

</style>
