<template>
  <a-layout id="layout">
    <a-layout-sider
      class="left-menu"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo">今日热点</div>
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="[$route.path]"
        :selectedKeys="[$route.path]"
        :defaultOpenKeys="['sub1', 'sub2']"
      >
        <a-menu-item key="/">
          <router-link to="/" tag="div"
            ><a-icon type="home" />文章列表</router-link
          >
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="snippets" /><span>分类发布管理</span></span
          >
          <a-menu-item key="/releaseList">
            <router-link to="/releaseList" tag="div"
              ><a-icon type="snippets" />分类管理</router-link
            >
          </a-menu-item>
          <a-menu-item key="/actcleList">
            <router-link to="/actcleList" tag="div"
              ><a-icon type="snippets" />审核管理</router-link
            >
          </a-menu-item>
        </a-sub-menu>

        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="home" /><span>用户管理</span></span>
          <a-menu-item key="/userList">
            <router-link to="/userList" tag="div"
              ><a-icon type="home" />用户列表</router-link
            >
          </a-menu-item>
          <a-menu-item key="/userPower">
            <router-link to="/userPower" tag="div"
              ><a-icon type="home" />用户权限</router-link
            >
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="/userSet">
          <router-link to="/userSet" tag="div"
            ><a-icon type="home" />个人中心</router-link
          >
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        id="layout-header"
        style="background: #fff; padding: 20px"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <router-link  tag="a"  target="_blank" to="/index"  style="cursor:pointer">网站首页</router-link>
        <a-dropdown id="drop-menu">
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            个人中心<a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">修改密码</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="signOut">注销登录</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '100%',
        }"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    signOut() {
      this.$message.success("退出成功");
      setTimeout(() => {
        this.$router.push("/login");
      }, 1000);
      localStorage.clear();
    },
  },
};
</script>
<style lang="less" scoped>
#layout {
  height: 100vh;
  .logo {
    width: 100%;
    height: 100px;
    background: rgba(0, 0, 0, 0.65);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }
  #layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    #drop-menu {
      padding-right: 50px;
    }
  }
}
</style>
