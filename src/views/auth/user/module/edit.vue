<template>
  <div>
    <el-button :disabled="data.id === 1" size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false" />
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
      }
    },
    methods: {
      to(id) {
        const _this = this.$refs.form
        _this.form = {
          id: this.data.id,
          name: this.data.name,
          username: this.data.username,
          phone: this.data.phone,
          email: this.data.email,
          enabled: this.data.enabled.toString(),
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
