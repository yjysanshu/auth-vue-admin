<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :permissions="permissions" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
  import eForm from './form'

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
      },
      permissions: {
        type: Array,
        required: true
      }
    },
    methods: {
      to() {
        const _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          name: this.data.name,
          alias: this.data.alias,
          pid: this.data.pid
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
