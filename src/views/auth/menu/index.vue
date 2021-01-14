<template>
  <div class="app-container">
    <eHeader :roles="roles" :menus="menus" :query="query" />

    <!--表格渲染-->
    <el-table v-loading="loading" ref="table" :data="data" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="icon" label="图标" align="center" width="80px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" width="100px" label="排序">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sort }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="path" label="链接地址" />
      <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
      <el-table-column prop="iframe" width="100px" label="内部菜单">
        <template slot-scope="scope">
          <span v-if="!scope.row.iframe">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建日期"></el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit
            v-permission="['ADMIN','MENU_ALL','MENU_DELETE']"
            :roles="roles"
            :menus="menus"
            :data="scope.row"
            :sup_this="sup_this"
          />
          <el-popconfirm v-permission="['ADMIN','MENU_ALL','MENU_DELETE']" title="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！" @onConfirm="subDelete(scope.row.id)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
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
        menus: [],
        roles: []
      }
    },
    created() {
      this.getRoles()
      this.getMenus()
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      beforeInit() {
        this.url = '/admin/menu'
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
        if (+id <= 14) {
          this.$notify({ title: '预置的菜单，不能删除', type: 'error', duration: 2500 })
          return
        }
        this.delLoading = true
        this.$api.permission.menu
          .del(id)
          .then(res => {
            this.delLoading = false
            this.init()
            this.$notify({ title: '删除成功', type: 'success', duration: 2500 })
          })
          .catch(err => {
            this.delLoading = false
            console.log(err.response.data.message)
          })
      },
      getMenus() {
        this.$api.permission.menu.getMenusTree({}).then(res => {
          this.menus = []
          const menu = { id: 0, label: '顶级类目', children: [] }
          menu.children = res.data
          this.menus.push(menu)
        })
      },
      getRoles() {
        this.roles = []
        this.$api.permission.role.getRoleTree({}).then(res => {
          this.roles = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
