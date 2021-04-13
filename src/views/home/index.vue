<template>
  <div>
    <div class="header">
      <a-button type="primary" @click="toUrl"> 新增 </a-button>
      <div class="reflash" @click="getNewsList">
        <a-icon class="reicon" type="reload" /><span>刷新</span>
      </div>
    </div>
    <MyLine></MyLine>
    <div class="mytable">
      <a-table
        bordered
        :columns="columns"
        :data-source="dataSource"
        :loading="tbloading"
        :pagination="pagination"
        :rowKey="(record,index)=>{return index}"
        @change="pageChange"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
      >
        <span slot="status" slot-scope="text, record">
          {{ returnState(record.status) }}
        </span>
         <span slot="create_time" slot-scope="text, record">
          {{ returnTime(record.create_time) }}
        </span>
        <span slot="type" slot-scope="text, record">
          {{ record.type == 1 ? "原创" : "转载" }}
        </span>
        <span slot="action" class="spanitem" slot-scope="text, record">
          <a v-if="record.status==0" @click="editNews(record.id)">编辑</a>
          <a @click="deleNews(record.id)">删除</a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getNewsListCms, deleNewsItemCms } from "@/api/system/newsList"
import columns from "./utils/dataSource"
import { getSortIndex,leaveTime} from "@/utils/utils"
export default {
  data() {
    return {
      columns,
      dataSource: [],
      rowKey:"",
      selectedRowKeys: [],
      tbloading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: 0,
      },
    };
  },
  mounted() {
    this.getNewsList();
  },
  methods: {
    async getNewsList() {
      this.tbloading = true;
      const res = await getNewsListCms();
      if (res.data.code == 200) {
        this.dataSource = getSortIndex(res.data.data)
        this.tbloading = false;
      }
    },
    openModel() {
      this.$refs.operaModel.open();
    },
    pageChange(pagination) {
      this.pagination = pagination;
    },
    toUrl() {
      this.$router.push("/addNews");
    },
    async deleNews(id) {
      let res = await deleNewsItemCms({
        id: id,
      });
      if (res.data.code == 200) {
        this.$message.success(res.data.msg);
        this.getNewsList();
      } else {
        this.$message.success(res.data.msg);
      }
    },
    editNews(id) {
      this.$router.push({
        path: "/addNews",
        query: {
          id: id,
          ifEdit: true,
        },
      });
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    returnState(state) {
      switch (state) {
        case -1:
          return "审核未通过";
          break;
        case 0:
          return "未审核";
          break;
        case 1:
          return "已审核";
          break;
        case 2:
          return "已发布";
          break;
        default:
          return "已撤回";
      }
    },
    returnTime(value){
        return leaveTime(value)
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .reflash {
    color: cornflowerblue;
    font-size: 18px;
    cursor: pointer;
    .reicon {
      margin-right: 5px;
    }
  }
}
.mytable {
  .spanitem {
    a {
      margin-right: 10px;
    }
  }
}
</style>