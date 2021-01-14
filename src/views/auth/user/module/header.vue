<template>
  <div class="filter-container">
    <!-- 搜索 -->
    <el-input v-model="query.name" class="filter-item" size="mini" clearable placeholder="输入用户名搜索" style="width: 200px;" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.phone" class="filter-item" size="mini" clearable placeholder="输入手机号搜索" style="width: 200px;" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>

    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 5px;">
      <el-button
        v-permission="['ADMIN']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
  </div>
</template>

<script>
  import eForm from './form'

  export default {
    components: { eForm },
    props: {
      query: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    methods: {
      toQuery() {
        this.$parent.page = 0
        this.$parent.init()
      }
    }
  }
</script>

<style scoped>

</style>
