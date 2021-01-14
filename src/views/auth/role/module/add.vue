<!--
 * @Description: 
 * @Version: 1.0
 * @Author: Yuanjy
 * @Date: 2020-05-25 21:55:39
 * @LastEditors: Yuanjy
 * @LastEditTime: 2020-10-28 10:25:58
-->
<template>
  <div>
    <el-button size="mini" type="success" @click="to">新增子角色</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    pid: {
      type: Number,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      this.$refs.form.dialog = true
      this.$refs.form.form.pid = this.pid
    }
  }
}
</script>

<style scoped>
  div {
    display: inline-block;
    margin-left: 10px;
  }
</style>
