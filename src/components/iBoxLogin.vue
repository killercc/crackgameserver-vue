<template>

  <div style="width: 14%; text-align: center; margin: 150px auto;">
    <el-form ref="form" :model="form" size="normal" >
      <div style="text-align: center;color: aqua;font-size: 30px;margin-bottom: 10px;">登录界面</div>
      <el-form-item prop="phoneCode" class="pr">
        <el-input style="width:350px;" placeholder="输入手机号" v-model="form.phonenum"></el-input>
        <button @click.prevent="getCode()" class="code-btn" :disabled="!show">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </button>
      </el-form-item>
      <el-form-item>
        <el-input style="width:350px;" placeholder="输入验证码" v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 25%; float: right;" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import req from "../utils/req";

export default {
  name: "iBoxLogin",
  components :{

  },
  data () {
    return {
      form:{},
      data:{},
      show: 'false',
      count: '',
    }
  },
//方法
  methods: {
    // 获取短信验证码
    getCode() {
      //axios请求
      req.requestGet("/api/spider/sendMsg?phonenum="+this.form.phonenum).then(res => {

        if(res.data.code === 200){
          this.$message({
            type:"success",
            message:"发送成功",

          })
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }


      })
      console.log(this.form.phone);
      // 验证码倒计时
      if (!this.timer) {
        this.count = 60;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= 60) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },onSubmit(){
      req.requestPost("/api/spider/loginibox",this.form).then(res => {
        if(res.data.code === 200){
          this.$message({
            type:"success",
            message:"登录成功",

          })
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }


      })
    }}
}


</script>

<style scoped>
.code-btn {
  width: 100px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 222;
  color: #409EFF;
  font-size: 14px;
  border: none;
  border-left: 1px solid #bababa;
  padding-left: 10px;
  background-color: #fff;

  cursor: pointer;
}
</style>