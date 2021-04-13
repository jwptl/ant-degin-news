<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="分类名称">
        <a-radio-group v-model="form.status">
          <a-radio value="1"> 通过 </a-radio>
          <a-radio value="-1"> 不通过 </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="审核意见">
        <a-textarea
          v-model="form.content"
          placeholder="请输入审核意见"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { editNewStatusCms } from "@/api/system/newsList";
export default {
  data() {
    return {
      title: "审核",
      visible: false,
      confirmLoading: false,
      form: {
        status: "1",
        content: "",
        id: "",
      },
    };
  },
  methods: {
    open(id) {
      this.visible = true;
      this.form.id = id
    },
    async handleOk(e) {
      let res = await editNewStatusCms(this.form);
      if (res.data.code == 200) {
        this.$message.success('提交成功');
        this.visible = false;
        this.$emit('handleOk')
      }
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
};
</script>

<style>
</style>