<template>
  <div class="app-container">
    <eHeader :query="query"/>

    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column label="ID" prop="id" align="center" width="100px"></el-table-column>
      <el-table-column label="用户名" prop="name" align="center" width="160px"></el-table-column>
      <el-table-column label="手机号" prop="phone" align="center" width="160px"></el-table-column>
      <el-table-column label="邮箱" prop="email" align="center"></el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span v-for="(role, index) in scope.row.roles" :key="index">
            <el-tag type="gray" style="margin-left: 5px;"> {{ role.name }} </el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="用户状态" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.enabled | statusFilter">{{scope.row.enabled | statusMap}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" align="center"></el-table-column>
      <el-table-column label="修改时间" prop="updated_at" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="250px">
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
        query: {

        },
        delLoading: false,
        sup_this: this
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          '0': 'danger',
          '1': 'primary',
        };
        return statusMap[status]
      },
      statusMap(status) {
        const statusMap = {
          '0': '锁定',
          '1': '激活',
        };
        return statusMap[status]
      }
    },
    created() {
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      beforeInit() {
        this.url = '/admin/users'
        this.params = {page: this.page, limit: this.limit}
        const query = this.query
        for (const k in query) {
          if (query[k]) {
            this.params[k] = query[k]
          }
        }
        return true
      },
      subDelete(id) {
        if (+id === 1) {
          this.$notify({ title: '超级管理员不能删除', type: 'error', duration: 2500 })
          return
        }
        this.delLoading = true
        this.$api.permission.user
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
  };
</script>
