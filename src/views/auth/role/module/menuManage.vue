<template>
  <el-dialog
    v-loading.body="menuLoading"
    :visible.sync="menuVisible"
    title="角色菜单管理"
    element-loading-text="玩命加载中"
  >
    <el-tree
      ref="tree"
      :data="menuData"
      :default-expanded-keys="expandedKeys"
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
      show-checkbox
      node-key="id"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="menuVisible = false">取 消</el-button>
      <el-button :loading="formMenuSubmiting" type="primary" @click="commitMenuForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      roleId: null,
      // 菜单表单
      menuLoading: false,
      menuVisible: false,
      formMenuSubmiting: false,
      // 菜单数据
      menuData: [],
      expandedKeys: [],
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    getRoleMenu(id) {
      this.menuVisible = true;
      this.menuLoading = true;
      this.roleId = id;
      this.$api.permission.role
        .getMenu(this.roleId)
        .then(response => {
          this.checkedKeys = response.data.checkedKeys;
          this.expandedKeys = response.data.expandedKeys;
          this.menuData = response.data.list;
          this.menuLoading = false;
        })
        .catch(error => {
          this.menuLoading = false;
          console.log(error);
        });
    },
    commitMenuForm() {
      this.formMenuSubmiting = true
      const keys = this.$refs.tree.getCheckedKeys()
      const halfKeys = this.$refs.tree.getHalfCheckedKeys()
      for (const i in halfKeys) {
        keys.push(halfKeys[i])
      }
      this.$api.permission.role
        .saveMenu({
          data: {
            id: this.roleId,
            menu_ids: keys
          }
        })
        .then(response => {
          this.formMenuSubmiting = false
          this.menuVisible = false
          this.$notify({ title: "成功", message: "保存成功", type: "success", duration: 1500 })
          console.log(response)
        })
        .catch(error => {
          this.formMenuSubmiting = false
          this.$notify({ title: "错误", message: error, type: "error", duration: 3000 })
          console.log(error)
        })
    }
  }
};
</script>
