<template>
    <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex">
      <div style="flex: 1"></div>
      <div style="width: 100px">

        <el-dropdown>
          <span class="el-dropdown-link">
           个人信息<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>积分:{{levTimes}}</el-dropdown-item>
              <el-dropdown-item @click="dialogFormVisible=true">充值</el-dropdown-item>
              <el-dropdown-item @click="jumphistory">下载记录</el-dropdown-item>



              <el-dropdown-item @click = "logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
          <div>
            <el-dialog title="充值页面" v-model="dialogFormVisible">
              <el-form :data="charform">
                <el-form-item label="激活码" :label-width="80">
                  <el-input v-model="charform.regCode" autocomplete="off"></el-input>
                </el-form-item>

              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="chargereq()"
                  >充值</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </div>
        </el-dropdown>

      </div>
    </div>

</template>

<script>
import req from "../utils/req";


//console.log(localStorage.getItem("auth"))
export default {
  name: "Header",
  data() {
    return {
      dialogFormVisible: false,
      charform: {
        regCode:''
      },
      levTimes: '',
      params: {}
    }
  },
  mounted() {
    this.getInfo();
    // VueEvent.on("levTimes",(value)=>{
    //   this.levTimes = value
    // })
  },
  methods : {
    logout(){
      req.requestQuickGet("/api/user/logout").then(res =>{
        localStorage.removeItem("auth")
        if(res.data.code === 200){
          this.$message({
            type:"success",
            message:"登出成功",
          })
          this.$router.push("/login")
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }
      })
    },
    getInfo(){
      req.requestQuickGet("/api/web/getinfo").then(res =>{
        if(res.data.code === 200){
          this.levTimes = res.data.data.levTimes
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }
      })
    },
    chargereq(){
      if(this.charform.regCode === ''){
        this.$message({
          type:"error",
          message:"激活码不能为空"
        })
      }else{
        req.requestGet("/api/web/charge",{params:this.charform}).then(res => {

          if(res.data.code === 200){

            this.$message({
              type:"success",
              message:res.data.message,

            })
            this.dialogFormVisible = false;
            this.getInfo()
          }else {
            this.$message({
              type:"error",
              message:res.data.message
            })
          }


        })
      }

    },
    jumphistory(){
      this.$router.push('/history')
    }


  }

}
</script>

<style scoped>

</style>