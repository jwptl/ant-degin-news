<template>
  <div>
    <div class="header">
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
        @change="pageChange"
        :rowKey="
          (record, index) => {
            return index;
          }
        "
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
          <a @click="$refs.examineModel.open(record.id)" v-if="record.status == 0">审核</a>
          <a
            @click="editStatus(2, record.id)"
            v-if="record.status == 1 || record.status == 3"
            >发布</a
          >
          <a @click="editStatus(3, record.id)" v-if="record.status == 2"
            >撤回</a
          >
        </span>
      </a-table>
    </div>
    <ExamineModel ref="examineModel" @handleOk="handleOk" />
  </div>
</template>

<script>
import ExamineModel from "./components/examineModel";
import { getNewsListCms, editNewStatusCms } from "@/api/system/newsList";
import columns from "./utils/dataSource";
import { getSortIndex,leaveTime} from "@/utils/utils";
export default {
  components: {
    ExamineModel,
  },
  data() {
    return {
      columns: columns.index,
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
      const res = await getNewsListCms();
      if (res.data.code == 200) {
        this.dataSource = getSortIndex(res.data.data);
        this.tbloading = false;
      }
    },
    async editStatus(status, id) {
      let res = await editNewStatusCms({
        status: status,
        id: id,
      });
      if (res.data.code == 200) {
        var msg;
        if (status == 1) {
          msg = "审核成功";
        } else if (status == 2) {
          msg = "发布成功";
        } else {
          msg = "撤回成功";
        }
        this.$message.success(msg);
        this.getNewsList();
      }
    },
    pageChange(pagination) {
      this.pagination = pagination;
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
    handleOk(){
      console.log(123)
      this.getNewsList()
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