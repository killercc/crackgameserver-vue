<template>
  <div style="width: 15%; text-align: center; margin: 150px auto;">
    <el-form ref="form" :model="form" size="normal" >
      <div style="text-align: center;color: aqua;font-size: 30px;margin-bottom: 10px;">登录界面</div>
      <el-form-item >
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
            v-model="form.code"
            placeholder="验证码"
            prefix-icon="lj-icon-yanzhengma"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            maxlength="5"
            style="float: left; width: 122px;"
        >
        </el-input>
        <div class="captcha_code">
          <img :src="ccode"  @click="changeCode()">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 25%; float: right; margin-left: 5px" type="primary" @click="jumpregist">注册</el-button>
        <el-button style="width: 25%; float: right;" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import req from "../utils/req";


export default {
  name: "Login",
  components :{

  },
  mounted() {
    this.changeCode();
  },
  data () {
    return {
      ccode:"",
      form:{
        username: "",
        password: "",
        codeuuid: "",
        code: ""
      },
      data:{},
      headers:{}
    }
  },methods:{
    onSubmit(){
      req.requestPost("/api/user/login",this.form).then(res => {

        if(res.data.code === 200){
          localStorage.setItem("auth",res.headers.auth)
          // console.log(res.headers.auth)
          //bus.$emit('levTimes',res.data.levtimes)
          //console.log(res.data.data.levtimes)
          //VueEvent.emit("levTimes",res.data.data.levtimes)
          this.$message({
            type:"success",
            message:"登录成功",

          })
          this.$router.push("/gamesearch")
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
          this.changeCode();
        }


      })
    },
    jumpregist(){
      this.$router.push("/regist")
    },
    changeCode(){
      req.requestQuickGet("/api/user/captcha").then(res => {
        if(res.data.code === 200){
          this.form.codeuuid = res.data.data.id;
          this.ccode = res.data.data.image
        }else{
          this.$message({
            type:"error",
            message:res.data.message
          })



        }


      })

    }
  }
}

</script>

<style scoped>

</style>