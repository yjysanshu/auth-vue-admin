<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="登录账号" prop="username">
        <el-input :disabled="!isAdd" v-model="form.username" placeholder="请填写登录账号" />
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" placeholder="请填写用户名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input name="phone" v-model="form.phone" autoComplete="on" placeholder="请填写手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input name="email" v-model="form.email" autoComplete="on" placeholder="请填写邮箱" />
      </el-form-item>
      <el-form-item label="用户状态" prop="enabled">
        <el-radio v-model="form.enabled" label="1">激活</el-radio>
        <el-radio v-model="form.enabled" label="0" >锁定</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="dialog = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {validEmail, validPhone} from "@/utils/validate"

  export default {
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
      const validateEmail = (rule, value, callback) => {
        if (!validEmail(value)) {
          callback(new Error('请输入正确的合法邮箱'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!validPhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }

      return {
        dialog: false,
        loading: false,
        form: {
          name: '',
          username: '',
          phone: '',
          email: '',
          enabled: '',
        },
        rules: {
          name: [
            { required: true, message: '用户名必须输入', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '登录账号必须输入', trigger: 'blur' }
          ],
          email: [
            { required: false, trigger: 'blur', validator: validateEmail }
          ],
          phone: [
            { required: false, trigger: 'blur', validator: validatePhone }
          ],
          enabled: [
            { required: true, message: '账户状态必须选择', trigger: 'change' }
          ]
        },
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
        this.$api.permission.user
          .add({
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
        this.$api.permission.user
          .edit({
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
        this.form = {
          name: '',
          username: '',
          phone: '',
          email: '',
          enabled: '',
        }
      }
    }
  }
</script>

<style scoped>

</style>
