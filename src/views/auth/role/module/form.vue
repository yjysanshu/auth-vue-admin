<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item style="margin-top: -10px;" label="描述">
        <el-input v-model="form.remark" style="width: 370px;" rows="5" />
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch v-model="form.status" :inactive-value="1" :active-value="0" active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="角色类型">
        <el-select v-model="form.type" clearable placeholder="请选择角色类型">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    pid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: { name: '', remark: '', status: '', type: '', pid: '' },
      typeOptions: [
        {
          label: '成员',
          value: 0
        },
        {
          label: '群组',
          value: 1
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.form.pid = this.pid
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      this.$api.permission.role.add({
        data: this.form
      }).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      this.$api.permission.role.edit({
        data: this.form
      }).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
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
      this.permissionIds = []
      this.form = { name: '', permissions: [], remark: '' }
    }
  }
}
</script>

<style scoped>

</style>
