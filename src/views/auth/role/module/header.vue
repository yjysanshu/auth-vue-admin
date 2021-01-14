<template>
  <div class="filter-container">
    <!-- 搜索 -->
    <el-select v-model="query.status" size="mini" class="filter-item" clearable placeholder="请选择角色状态" style="width: 150px">
      <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="query.type" size="mini" class="filter-item" clearable placeholder="请选择角色类型" style="width: 150px">
      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-input v-model="query.name" size="mini" class="filter-item" placeholder="角色名称" style="width: 200px;" @keyup.enter.native="toQuery" />

    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
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
        statusOptions: [
          {
            label: '正常',
            value: 0
          },
          {
            label: '停用',
            value: 1
          }
        ],
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
