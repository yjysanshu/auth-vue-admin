<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="700px">
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="配置名称">
        <el-input v-model="form.name" style="width:85%" />
      </el-form-item>
      <el-form-item label="配置描述">
        <el-input v-model="form.description" :rows="2" type="textarea" style="width:85%" />
      </el-form-item>
      <el-form-item label="配置类型">
        <el-switch v-model="jsonEditor" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949" active-text="JSON" inactive-text="文案" />
      </el-form-item>

      <el-form-item label="配置值">
        <template v-if="jsonEditor">
          <json-editor ref="jsonEditor" v-model="form.value" style="line-height: 16px !important;" />
        </template>
        <template v-else>
          <el-input :rows="3" v-model="form.value" type="textarea" placeholder="请填写配置值" style="width:85%" />
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import jsonEditor from '@/views/components/jsonEditor'
// import JsonEditor from '@/components/JsonEditor'

export default {
  components: { jsonEditor },
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
      loading: false, dialog: false,
      form: {
        id: '',
        name: '',
        value: '',
        description: ''
      },
      jsonEditor: false
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      if (typeof this.form.value === 'object') {
        this.form.value = JSON.stringify(this.form.value)
      }
      this.$api.system.systemConfig
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
      if (typeof this.form.value === 'object') {
        this.form.value = JSON.stringify(this.form.value)
      }
      this.$api.system.systemConfig
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
        id: '',
        name: '',
        value: '',
        description: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
