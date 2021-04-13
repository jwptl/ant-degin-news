<template>
  <div class="nav">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <ul class="menu-list">
      <li
        v-for="(item, index) in dataList"
        @click="change(index,item.id)"
        :key="index"
        :class="{'active':current==index}"
      >
        {{ item.news_class_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getClassListCms } from "@/api/system/newsList";
export default {
  data() {
    return {
      dataList: [],
      current: 0
    };
  },
  mounted() {
    this.getClassList();
  },
  methods: {
    async getClassList() {
      const res = await getClassListCms();
      if (res.data.code == 200) {
        this.dataList = res.data.data
        this.$emit('handleOk',this.dataList[0].id)
      }
    },
    change(index,id) {
      this.current = index;
      this.$emit('handleOk',id)
    },
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
.nav {
  position: fixed;
  top: 60px;
  .logo {
    width: 120px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .menu-list {
    margin-top: 20px;
    li {
      overflow: hidden;
      display: block;
      width: 110px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      color: #444;
      border-radius: 4px;
      margin-bottom: 2px;
      cursor: pointer;
    }
    .active {
      background-color: #ed4040;
      color: #fff;
    }
  }
}
</style>