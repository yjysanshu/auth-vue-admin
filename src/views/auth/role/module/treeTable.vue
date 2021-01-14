<template>
  <el-table
    v-loading.body="tableLoading"
    :data="tableData"
    element-loading-text="拼命加载中"
    border
    fit
    highlight-current-row
  >
    <el-table-column label="角色名称" align="left">
      <template slot-scope="scope">
        <span v-for="index in scope.row.level" :key="index" class="tree-indent" />
        <template v-if="scope.row.isParent">
          <span v-if="scope.row.isExpand" class="expand-icon" @click="foldTable(scope.row.id)">
            <i class="el-icon el-icon-arrow-down" />
          </span>
          <span v-else class="expand-icon" @click="expandTable(scope.row.id)">
            <i class="el-icon el-icon-arrow-right" />
          </span>
        </template>
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <!-- <el-table-column label="ID" prop="id" align="center" /> -->
    <el-table-column label="角色说明" prop="remark" align="center" />
    <el-table-column label="角色状态" align="center" width="100px">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | statusMap }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="角色类型" align="center" width="100px">
      <template slot-scope="scope">
        <el-tag :type="scope.row.type | typeFilter">{{ scope.row.type | typeMap }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center" width="500px">
      <template slot-scope="scope">
        <edit v-if="checkPermission(['ADMIN','ROLES_ALL','ROLES_EDIT'])" :data="scope.row" :sup_this="sup_this" />
        <el-button
          size="mini"
          type="info"
          style="margin-left: 10px;"
          @click="emitRoleManage(scope.row.id, 'user')"
        >用户</el-button>
        <el-button
          v-if="scope.row.level"
          size="mini"
          type="warning"
          icon="setting"
          @click="emitRoleManage(scope.row.id, 'menu')"
        >菜单</el-button>
        <el-button
          v-if="scope.row.level"
          size="mini"
          type="success"
          @click="emitRoleManage(scope.row.id, 'resource')"
        >资源</el-button>
        <el-button
          v-if="scope.row.level"
          size="mini"
          type="danger"
          @click="emitRoleDelete(scope.row.id)"
        >删除</el-button>
        <!-- <el-button
          v-if="scope.row.type"
          size="mini"
          type="success"
          @click="emitRoleCreate(scope.row.id)"
        >角色</el-button> -->
        <div v-if="scope.row.type" style="display: inline-block;margin-left: 10px;">
          <el-button
            v-if="checkPermission(['ADMIN','ROLES_ALL','ROLES_CREATE'])"
            class="filter-item"
            size="mini"
            type="success"
            @click="$refs.form.dialog = true">角色</el-button>
          <eForm ref="form" :is-add="true" :pid="scope.row.id" />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import checkPermission from '@/utils/permission'
import edit from './edit'
import eForm from './form'

export default {
  name: "TreeTable",
  components: {
    edit, eForm
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        "0": "success",
        "1": "danger"
      };
      return statusMap[status];
    },
    statusMap(status) {
      const statusMap = {
        "0": "正常",
        "1": "停用"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      const typeMap = {
        "0": "gray",
        "1": "primary"
      };
      return typeMap[type];
    },
    typeMap(type) {
      const typeMap = {
        "0": "成员",
        "1": "群组"
      };
      return typeMap[type];
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {
      sup_this: this
    }
  },
  computed: {
    tableLoading() {
      if (this.tableData == null) {
        return true;
      }
      return false;
    }
  },
  methods: {
    checkPermission,
    expandTable(id) {
      const indexList = this.tableData.map(item => item.id);
      const index = indexList.indexOf(id);

      this.tableData[index].isExpand = true;
      if (index + 1 === indexList.length) {
        this.tableData[index].nextId = -1;
      } else {
        this.tableData[index].nextId = this.tableData[index + 1].id;
      }

      this.tableData.splice(index + 1, 0, ...this.tableData[index].children);
    },
    foldTable(id) {
      const indexList = this.tableData.map(item => item.id);
      const index = indexList.indexOf(id);

      this.tableData[index].isExpand = false;
      if (this.tableData[index].nextId === -1) {
        this.tableData.splice(index + 1);
      } else {
        const nextIndex = indexList.indexOf(this.tableData[index].nextId);
        this.tableData.splice(index + 1, nextIndex - index - 1);
      }
    },
    emitRoleManage(id, type) {
      this.$emit("manage", id, type);
    },
    emitRoleUpdate(row) {
      this.$emit("update", row);
    },
    emitRoleDelete(id) {
      this.$emit("delete", id);
    },
    emitRoleCreate(id) {
      this.$emit("create", id);
    }
  }
};
</script>

<style>
.tree-indent {
  display: inline-block;
  width: 16px;
  height: 25px;
  vertical-align: top;
  overflow: hidden;
}

.expand-icon {
  position: relative;
  cursor: pointer;
  color: #666;
  transition: transform 0.2s ease-in-out;
  width: 16px;
  height: 25px;
}

.el-table__expanded-cell {
  padding: 0px 0px 0px 49px !important;
}
</style>
