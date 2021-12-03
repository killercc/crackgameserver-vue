<template>
  <div>
    <Header/>
  </div>

  <div >
    <el-table  height="600" :data="historyEntity " align="center">
      <el-table-column align="center" prop="gname" label="游戏名(C)"  width="280px"/>
      <el-table-column align="center"  prop="gdescribe" label="游戏名(E)"    width="280px"/>
      <el-table-column align="center"  prop="gmmss" label="激活码"    width="280px"/>
      <el-table-column align="center"  prop="gbd" label="百度云地址"    width="280px"/>
      <el-table-column align="center"  prop="gty" label="天翼云地址"    width="280px"/>
    </el-table>
  </div>

  <div class="demo-pagination-block" style="margin: 0 auto;">
    <el-pagination
        style="text-align: center"
        v-model:currentPage="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
  <div style="width: 200px; font-size: medium; font-weight: bolder; color: red; height: 200px;margin: 0 auto;"> 只 保 留 近 7 天 数 据</div>


</template>

<script>
import req from "../utils/req";
import Header from "./Header";
export default {
  name: "DownloadHistory",
  components:{Header},
  data() {
    return {
      currentPage: '',
      pagesize: 10,
      total: 1,
      historyEntity:[],
      form: {
        index: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.getsavegames();
  },
  methods: {
    getsavegames(){
      req.requestGet("/api/web/getsavegames",{params:this.form}).then(res =>{
        if(res.data.code === 200){
          this.historyEntity = res.data.data.savegames
          this.total = res.data.data.nums * this.pagesize
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }
      })
    },
    handleCurrentChange(){
      this.form.index = this.currentPage;
      this.getsavegames()
    }
  }
}
</script>

<style scoped>

</style>