<template>
  <div class="app-container">
    <eHeader :query="query"/>

    <el-table v-loading="loading" ref="table" :data="data" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="角色名称" prop="name" align="left" />
      <el-table-column label="角色说明" prop="remark" align="center" />
      <el-table-column label="角色状态" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusMap }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色类型" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type | typeFilter">{{ scope.row.type | typeMap }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="500px">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this" />
          <!-- 角色授权给用户 -->
          <el-button :key="scope.row.id + '1'" size="mini" type="info" style="margin-left: 10px;" @click="displayManage(scope.row.id, 'user')">用户</el-button>
          <!-- 角色选择菜单权限 -->
          <el-button v-if="scope.row.level" :key="scope.row.id + '2'" size="mini" type="warning" @click="displayManage(scope.row.id, 'menu')">菜单</el-button>
          <!-- 角色选择资源权限 -->
          <!-- <el-button v-if="scope.row.level" size="mini" type="success" @click="displayManage(scope.row.id, 'resource')">资源</el-button> -->
          <!-- 角色删除 -->
          <el-popconfirm v-if="scope.row.level" title="确定删除本条数据吗？" style="margin-left: 10px;" @onConfirm="subDelete(scope.row.id)">
            <el-button slot="reference" :key="scope.row.id + '3'" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
          <!-- 新增下级角色 -->
          <add v-if="scope.row.type" :pid="scope.row.id" :sup_this="sup_this" />
        </template>
      </el-table-column>
    </el-table>

    <menu-manage ref="menuManage" />

    <action-manage ref="actionManage" />

    <user-manage ref="userManage"/>
  </div>
</template>

<script>
  import initData from '@/mixins/initData'
  import MenuManage from './module/menuManage'
  import ActionManage from './module/actionManage'
  import UserManage from './module/userManage'
  import TreeTable from './module/treeTable'
  import edit from './module/edit'
  import add from './module/add'
  import eForm from './module/form'
  import eHeader from './module/header'

  export default {
    components: {
      MenuManage,
      ActionManage,
      UserManage,
      TreeTable,
      edit, eForm, add, eHeader
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          "0": "success",
          "1": "danger"
        };
        return statusMap[status];
      },
      statusMap(status) {
        const statusMap = {
          "0": "正常",
          "1": "停用"
        };
        return statusMap[status];
      },
      typeFilter(type) {
        const typeMap = {
          "0": "gray",
          "1": "primary"
        };
        return typeMap[type];
      },
      typeMap(type) {
        const typeMap = {
          "0": "成员",
          "1": "群组"
        };
        return typeMap[type];
      }
    },
    mixins: [initData],
    data() {
      return {
        query: {

        },
        sup_this: this,
        delLoading: false,
      }
    },
    created() {
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
          if (query[k] !== false) {
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
      displayManage(id, type) {
        this.$nextTick(() => {
          switch (type) {
            case 'menu':
              this.$refs.menuManage.getRoleMenu(id)
              break
            case 'resource':
              this.$refs.actionManage.getRoleResource(id)
              break
            case 'user':
              this.$refs.userManage.getRoleUser(id)
              break
            default: break
          }
        });
      },
    }
  }
</script>
