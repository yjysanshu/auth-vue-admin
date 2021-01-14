<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
  import eForm from './form'
  import { isJson } from '@/utils'

  export default {
    components: { eForm },
    props: {
      data: {
        type: Object,
        required: true
      },
      sup_this: {
        type: Object,
        required: true
      }
    },
    methods: {
      to() {
        const _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          name: this.data.name,
          value: this.data.value,
          description: this.data.description
        }
        if (isJson(this.data.value)) {
          _this.jsonEditor = true
          _this.form.value = JSON.parse(this.data.value)
        }
        _this.dialog = true
      }
    }
  }
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
