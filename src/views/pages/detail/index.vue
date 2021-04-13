<template>
  <div class="container">
    <h2>{{ detail.new_title }}</h2>
    <div class="info">
      <span class="name">作者：{{ detail.new_author }}</span>
      <span>发表时间：{{ returnTime(detail.create_time) }}</span>
    </div>
    <div class="cont">
      <div class="cont-datael" v-html="detail.new_content"></div>
    </div>
  </div>
</template>

<script>
import { queryNewsItemCms } from "@/api/system/newsList";
import { leaveTime} from "@/utils/utils";
export default {
  data() {
    return {
      id: "",
      detail: "",
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getListInfo(this.id);
  },
  methods: {
    async getListInfo(id) {
      const res = await queryNewsItemCms({ id: id });
      if (res.data.code == 200) {
        this.detail = res.data.data;
      }
    },
    returnTime(value){
        return leaveTime(value)
    }
  },
};
</script>
<style lang="less" scoped>
img {
  text-align: center !important;
}
.container {
  width: 900px;
  margin: 0 auto;
  height: 100vh;
  h2 {
    text-align: center;
    color: #000;
    font-size: 45px;
    font-weight: bold;
    padding: 20px 0;
  }
  .info {
    font-size: 18px;
    color: #999;
    display: block;
    margin-bottom: 10px;
    .name {
      margin-right: 20px;
    }
  }
  .cont {
    .cont-datael {
      font-size: 18px;
      color: #777;
      line-height: 1.7;
      text-align: justify;
    }
  }
}
</style>