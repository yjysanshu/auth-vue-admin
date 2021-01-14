<template>
  <div class="app-container">
    <eHeader :query="query"/>

    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="配置名称" />
      <el-table-column prop="value" show-overflow-tooltip label="配置值" />
      <el-table-column prop="description" label="配置描述" />
      <el-table-column prop="created_at" label="创建时间" />
      <el-table-column prop="updated_at" label="修改时间" />
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-permission="['ADMIN']" :data="scope.row" :sup_this="sup_this"/>
          <el-popconfirm v-permission="['ADMIN']" title="确定删除本条数据吗？" @onConfirm="subDelete(scope.row.id)">
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
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    beforeInit() {
      this.url = '/admin/configure'
      this.params = { page: this.page, limit: this.limit }
      const query = this.query
      for (const k in query) {
        console.log(query)
        if (query[k]) { this.params[k] = query[k] }
      }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      this.$api.system.systemConfig
        .del(id)
        .then(res => {
          this.delLoading = false
          this.init()
          this.$notify({ title: '删除成功', type: 'success', duration: 2500 })
        }).catch(err => {
          this.delLoading = false
          console.log(err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
