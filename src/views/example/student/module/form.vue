<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="70px">

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="dialog = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "form",
    props: {
      isAdd: {
        type: Boolean,
        required: true
      },
      sup_this: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        dialog: false,
        loading: false,
        form: {

        },
        rules: {

        }
      }
    },
    methods: {
      doSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.form.roles = this.roleIds
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          } else {
            return false
          }
        })
      },
      doAdd() {
        this.$api.aaaaaaaaaaa({
          data: this.form
        }).then(res => {
          this.resetForm()
          this.$notify({ title: '添加成功', type: 'success', duration: 2500 })
          this.loading = false
          this.$parent.$parent.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      doEdit() {
        this.$api.eeeeeeeeeeeee({
          data: this.form
        }).then(res => {
          this.resetForm()
          this.$notify({ title: '修改成功', type: 'success', duration: 2500 })
          this.loading = false
          this.sup_this.init()
        }).catch(err => {
          this.loading = false
          console.log(err.response.data.message)
        })
      },
      resetForm() {
        this.dialog = false
        this.$refs['form'].resetFields()
        this.form = {  }
      }
    }
  }
</script>

<style scoped>

</style>
