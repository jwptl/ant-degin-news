<template>
  <div>
    <div class="header">
      <a-button type="primary" @click="$refs.viewmodel.open()"> 新增 </a-button>
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
          <a @click="deleClassItem(record.id)">删除</a>
        </span>
      </a-table>
    </div>
    <ViewModel ref="viewmodel" @handleOk="handleOk" />
  </div>
</template>

<script>
import ViewModel from "./components/viewModel";
import { getClassListCms, deleClassItemCms } from "@/api/system/newsList";
import columns from "./utils/dataSource";
import { getSortIndex,leaveTime} from "@/utils/utils";
export default {
  components: {
    ViewModel,
  },
  data() {
    return {
      columns: columns.itemize,
      dataSource: [],
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
      const res = await getClassListCms();
      if (res.data.code == 200 && res.data.data) {
        this.dataSource = getSortIndex(res.data.data)
        this.tbloading = false;
      }
    },
    pageChange(pagination) {
      this.pagination = pagination;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    handleOk() {
      this.getNewsList();
    },
    async deleClassItem(id) {
      const res = await deleClassItemCms({ id: id })
      if(res.data.code==200){
        this.$message.success(res.data.msg)
        this.getNewsList();
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