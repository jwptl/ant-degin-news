<template>
  <div class="content">
    <div class="news-list">
      <div
        class="list-item"
        @click="toUrl(item.id)"
        v-for="(item, index) in newList"
      >
        <div class="title">{{ item.new_title }}</div>
        <div class="item-info">
          <span>{{ item.new_author }}</span
          >/
          <span>{{ returnTime(item.create_time) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leaveTime} from "@/utils/utils";
export default {
  props: ["newList"],
  data() {
    return {};
  },
  methods: {
    toUrl(id) {
      const { href } = this.$router.resolve({
        path: "/detail",
        query: { id: id }
      })
      window.open(href, "_blank")
    },
     returnTime(value){
        return leaveTime(value)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .news-list {
    .list-item {
      padding: 15px 0;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;
      .title {
        color: #333;
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .item-info {
        font-size: 14px;
        color: #777;
      }
    }
  }
}
</style>