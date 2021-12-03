<template>
  <div class="regist" >
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
      <el-form-item class="form-group" prop="username">
        <el-input placeholder="账号" v-model.number="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item class="form-group" prop="password">
        <el-input
            placeholder="密码"
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
        ></el-input>
      </el-form-item>
       <el-form-item>
        <el-input
            v-model="ruleForm.code"
            placeholder="验证码"
            prefix-icon="lj-icon-yanzhengma"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            maxlength="5"
            style="float: left; width: 122px;"
        >
        </el-input>
        <div style="margin-left: 200px;" class="captcha_code">
          <img alt="加载失败" :src="ccode"  @click="changeCode()">
        </div>
      </el-form-item>
<!--      <el-form-item class="form-group" prop="checkPass">-->
<!--        <el-input-->
<!--            placeholder="确认密码"-->
<!--            v-model="ruleForm.checkPass"-->
<!--            type="password"-->
<!--            autocomplete="off"-->
<!--        ></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item class="form-group" prop="regCode">-->
<!--        <el-input-->
<!--            placeholder="输入激活码"-->
<!--            v-model="ruleForm.regCode"-->
<!--            autocomplete="off"-->
<!--        >-->

<!--        </el-input>-->
<!--      </el-form-item>-->


      <el-form-item class="form-group" >
        <el-button type="primary" @click="submitForm('ruleForm')"
        >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>

</template>


<script>
import req from "../utils/req";
export default {
  name: "Regist",
  mounted() {
    this.changeCode();
  },
  data() {
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }
      var reg = /^[A-Za-z0-9]{1,15}$/;
      setTimeout(() => {
        if(!reg.test(value)){
          return callback(new Error('字母或数字组成且长度不大于15'))
        }else{
          callback()
        }
      }, 500)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'))
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次密码不匹配"))
    //   } else {
    //     callback()
    //   }
    // }
    // const checkregCode = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入激活码'))
    //   }else{
    //     callback()
    //   }
    // }
    return {
      ccode: '',
      ruleForm: {
        password: '',
        //checkPass: '',
        username: '',
        code: '',
        codeuuid: "",
        //regCode: ''
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        //checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        username: [{ validator: checkAccount, trigger: 'blur' }],
        //regCode: [{ validator: checkregCode, trigger: 'blur' }]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) =>{
        if (valid) {
          req.requestPost('/api/user/register',this.ruleForm).then(res => {
            if(res.data.code === 200){
              this.$message({
                type:"success",
                message:"注册成功",
              })
              this.$router.push("/login")
            }else {
              this.$message({
                type:"error",
                message:res.data.message
              })
            }
          })
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    changeCode(){
      req.requestQuickGet("/api/user/captcha").then(res => {
        if(res.data.code === 200){
          this.ruleForm.codeuuid = res.data.data.id;
          this.ccode = res.data.data.image
        }else{
          this.$message({
            type:"error",
            message:res.data.message
          })
        }
      })

    }
  },

}
</script>

<style scoped>
.demo-ruleForm{
  margin: 0;
  padding: 0;
}
.regist{

  width: 980px;
  margin:0 auto;
  padding: 60px 0;
}

.form-group{
  width: 480px;
  margin-top: 1px;

}
</style>