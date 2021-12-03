<template>
<div>
  <el-form>
    <el-form-item :data="chargeform">
      <el-input v-model="chargeform.nums" placeholder="数量"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="chargeform.times" placeholder="下载数"></el-input>
    </el-form-item>
    <el-button type="primary" @click="subCharge()">生成</el-button>
  </el-form>
</div>
  <div >
    <el-table  height="600" :data="tableData " align="center">
      <el-table-column align="center" prop="regkey" label="激活码"  width="300px"/>
      <el-table-column align="center"  prop="times" label="次数"    width="280px"/>
    </el-table>
  </div>
</template>

<script>
import req from "../utils/req";

export default {
  name: "Charge",
  data(){
    return{
      chargeform:{},
      tableData:[]
    }
  },
  methods: {
    subCharge(){
      req.requestPost("/api/piggyin301/generatekey",this.chargeform).then(res => {
        if(res.data.code === 200){
          this.$message({
            type:"success",
            message:"生成成功"
          })
          this.tableData = res.data.data.keys
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