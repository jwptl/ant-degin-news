<template>
  <div class="container">
    <div class="cont-box">
      <div class="cont-title">信息管理后台-登录</div>
      <div class="cont-form">
        <a-form :form="form">
          <a-form-item style="margin-top: 20px">
            <a-input v-model="form.username" placeholder="请输入用户名">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
            >
              <a-icon slot="prefix" type="unlock" />
            </a-input>
          </a-form-item>
        </a-form>
        <div class="confirm-btn">
          <a-button type="primary" @click="login()"> 登录 </a-button>
        </div>
        <div class="tips">
            <router-link  to="/sign" tag="span">没有账号？注册</router-link>
            <router-link  to="/forget" tag="span">忘记密码</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginCms } from "@/api/system/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
       
      },
    };
  },
  methods: {
    async login() {
      if (this.form.username == "") {
        this.$message.error("请输入用户名");
        return false;
      }
      if (this.form.password == "") {
        this.$message.error("请输入密码");
        return false;
      }
      const res = await loginCms(this.form);
      if (res.data && res.data.code == 200) {
        this.$message.success(res.data.msg);
        localStorage.setItem('id',res.data.data.user_id)
        localStorage.setItem('token',res.data.data.token)
        this.$router.push('/')
      }
      else{
          this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 10px;
}
.container {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  position: relative;
  .cont-box {
    width: 400px;
    background: #fff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.9);
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    .cont-title {
      color: #333;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    .cont-form {
      .phone-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .send-code {
          width: 150px;
          margin-left: 20px;
        }
      }
      .confirm-btn{
        width: 100%;
        margin-top: 30px;
        button{
          width: 100%;
          height: 40px;
        }
      }
      .tips{
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span{
            cursor: pointer;
            font-size: 12px;
            color: #666;
          }
      }
    }
  }
}
</style>