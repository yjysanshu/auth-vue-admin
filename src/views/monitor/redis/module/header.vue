<template>
  <div class="filter-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" class="filter-item" size="mini" clearable placeholder="输入用户名搜索" style="width: 200px;" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>

    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 5px;">
      <el-button
        v-if="checkPermission(['ADMIN','REDIS_ALL','REDIS_CREATE'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
    <!-- 清空缓存 -->
    <el-button v-if="checkPermission(['ADMIN','REDIS_ALL','REDIS_DELETE'])" :loading="deleteAllLoading" type="warning" size="mini" class="filter-item" icon="el-icon-delete" @click="deleteAll">清空缓存</el-button>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import eForm from './form'
// 查询条件
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
      deleteAllLoading: false
    }
  },
  methods: {
    checkPermission,
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    deleteAll() {
      this.deleteAllLoading = true
      this.$api.system.redis.delAll().then(res => {
        this.$parent.page = 0
        this.$parent.init()
        this.deleteAllLoading = false
      })
    }
  }
}
</script>
