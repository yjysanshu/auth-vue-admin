<template>
  <div class="filter-container">
    <!-- 搜索 -->
    <el-input v-model="query.name" class="filter-item" size="mini" clearable placeholder="输入名称搜索" style="width: 200px;" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 5px;">
      <el-button
        v-permission="['ADMIN','MENU_ALL','MENU_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :roles="roles" :menus="menus" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import eForm from './form'
export default {
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    menus: {
      type: Array,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      console.log(this.query)
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
