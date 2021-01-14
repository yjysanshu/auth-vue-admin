<template>
  <el-dialog
    v-loading.body="userLoading"
    :visible.sync="userVisible"
    title="角色用户管理"
    element-loading-text="玩命加载中"
    width="800px"
  >
    <el-transfer
      v-model="userModel"
      :data="userData"
      :left-default-checked="[]"
      :right-default-checked="[]"
      :titles="['未分配用户', '已分配用户']"
      :button-texts="['到左边', '到右边']"
      filterable
      style="margin-left: 35px;"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="userVisible = false">取 消</el-button>
      <el-button :loading="formUserSubmiting" type="primary" @click="commitUserForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      roleId: null,

      // 用户表单
      userLoading: false,
      userVisible: false,
      formUserSubmiting: false,

      // 用户数据
      userData: [],
      userModel: []
    };
  },
  methods: {
    getRoleUser(id) {
      this.userData = []
      this.userModel = []
      this.userLoading = true
      this.roleId = id
      this.$api.permission.role
        .getUser(this.roleId)
        .then(response => {
          var all = response.data.all;
          for (var key in all) {
            this.userData.push({
              key: parseInt(all[key].id),
              label: all[key].name
            });
          }
          var rightList = response.data.right;
          for (var rightKey in rightList) {
            this.userModel.push(parseInt(rightList[rightKey].id));
          }
          this.userVisible = true
          this.userLoading = false
        })
        .catch(error => {
          this.userLoading = false
          console.log(error)
        })
    },
    commitUserForm() {
      this.formUserSubmiting = true
      this.$api.permission.role
        .saveUser({
          data: {
            id: this.roleId,
            list: this.userModel
          }
        })
        .then(response => {
          this.formUserSubmiting = false
          this.userVisible = false
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success",
            duration: 1500
          });
          console.log(response)
        })
        .catch(error => {
          this.formUserSubmiting = false
          this.$notify({
            title: "错误",
            message: error,
            type: "error",
            duration: 3000
          });
          console.log(error);
        });
    }
  }
};
</script>
