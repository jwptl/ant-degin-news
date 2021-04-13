<template>
  <div class="container">
    <div class="header" @click="returnBack">返回</div>
    <a-form :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="标题">
        <a-input v-model="form.new_title" />
      </a-form-item>
      <a-form-item label="分类">
        <a-select v-model="form.news_class_id" style="width: 100%">
          <a-select-option :value="String(item.id)" v-for="item in list">
            {{ item.news_class_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="来源">
        <a-select v-model="form.type" style="width: 100%">
          <a-select-option value="1"> 原创 </a-select-option>
          <a-select-option value="0"> 转载 </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="内容">
        <div id="edit"></div>
      </a-form-item>
    </a-form>
    <div class="btn">
      <a-button class="btn-confirm" type="primary" @click="handleOk">
        保存 </a-button
      ><a-button> 取消 </a-button>
    </div>
  </div>
</template>
<script>
import {
  addNewsItemCms,
  editNewsItemCms,
  queryNewsItemCms,
  getClassListCms,
} from "@/api/system/newsList";
import E from "wangeditor";
export default {
  data() {
    return {
      ifEdit: false,
      id: "",
      title: "添加新闻",
      form: {
        new_title: "",
        new_content: "",
        type: "1",
        news_class_id: "",
        user_id: localStorage.getItem("id"),
      },
      list: [],
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.ifEdit = this.$route.query.ifEdit;
    this.getClassList();
    if (this.ifEdit) {
      this.queryNews();
    }
    const editor = new E("#edit");
    editor.config.height = 500;
    editor.create();
    this.editor = editor;
  },
  methods: {
    async handleOk() {
      if (this.ifEdit) {
        let msg = this.editor.txt.html();
        this.form.new_content = msg;
        let res = await editNewsItemCms(this.form);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.$router.push("/");
        } else {
          this.$message.error(res.data.msg);
          return;
        }
      } else {
        let msg = this.editor.txt.html();
        this.form.new_content = msg;
        let res = await addNewsItemCms(this.form);
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.$router.push("/");
        } else {
          this.$message.error(res.data.msg);
          return;
        }
      }
    },
    async queryNews() {
      let res = await queryNewsItemCms({
        id: this.id,
      });
      this.form = res.data.data;
      this.editor.txt.html(res.data.data.new_content);
    },
    returnBack() {
      this.$router.push("/");
    },
    async getClassList() {
      const res = await getClassListCms();
      if (res.data.code == 200 && res.data.data) {
        this.list = res.data.data;
      }
    },
  },
};
</script>
<style >
.ant-select-dropdown {
  z-index: 99999 !important;
}
</style>
<style lang="less" scoped>
.container {
  height: 100%;
  padding-bottom: 100x;
  .header {
    font-size: 14px;
    color: #1890ff;
    cursor: pointer;
  }
  .btn {
    margin-top: 20px;
    text-align: center;
    .btn-confirm {
      margin-right: 50px;
    }
  }
}
</style>