<template>
  <a-modal
    title="Title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="分类名称">
        <a-input v-model="form.news_class_name" placeholder="请输入分类名称" />
      </a-form-item>
      <a-form-item label="分类简介">
        <a-textarea
          v-model="form.news_content"
          placeholder="请输入分类简介"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveClassListCms } from "@/api/system/newsList";
export default {
  data() {
    return {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      form: {
        news_class_name: "",
        news_content: "",
        user_id:localStorage.getItem("id")
      },
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    async handleOk(e) {
      this.ModalText = "添加分类";
      this.confirmLoading = true;
      const res = await saveClassListCms(this.form)
      if(res.data.code==200){
          this.$message.success(res.data.msg)
          this.$emit('handleOk')
          this.visible = false;
      }
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>

<style>
</style>