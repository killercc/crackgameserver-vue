<template>
  <Header/>
  <div class="search" style="margin: 5%">

    <div class="searchBox" >
      <el-input  @keyup.enter="handleClick()"  v-model="form.gamename" placeholder="输入游戏关键字" style="margin-left: 30%;width: 20%;"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="handleClick()">查找游戏</el-button>
    </div>

    <div >
      <el-table  height="600" :data="tableData " align="center">
        <el-table-column align="center" prop="gname" label="游戏名(C)"  width="280px"/>
        <el-table-column align="center"  prop="gdescribe" label="游戏名(E)"    width="280px"/>
        <el-table-column align="center"  prop="grlzz" label="容量"    width="280px"/>
        <el-table-column align="center"  label="操作"   width="280px">
          <template  #default="scope">

            <el-button  type="primary"  size="mini" @click="download(scope.row.gcode);">
              下载
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="demo-pagination-block" style="margin-left: 150px;margin-top: 10px;">
    <el-pagination
        style="text-align: center"
        v-model:currentPage="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>

  </div>
</template>

<script>
import req from "../utils/req";
import Header from "./Header";
import useClipboard from 'vue-clipboard3'

export default {
  name: "GameSearch",
  components: {Header},
  data() {
    return {
      currentPage: '',
      pagesize: 10,
      total: 1,
      downloadparams: {
        gcode: ''
      },
      form: {
        gamename: '',
        index: 1,
        size: 10
      },
      tableData: [

      ]
    }
  },
  methods: {
    handleCurrentChange(){
      this.form.index = this.currentPage;
      this.handleClick()
    },
    handleClick() {
      req.requestGet("/api/web/getgame",{params:this.form}).then(res => {

        if(res.data.code === 200){
          this.tableData = res.data.data.gamelist
          this.total = res.data.data.nums * this.pagesize
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }


      })
    },
    download(gcode){
      req.requestQuickGet("/api/web/download?gcode="+gcode).then(res => {

        if(res.data.code === 200){
          //console.log(res.data.data.downloadlist)
          let data = res.data.data.downloadlist
          let gameinfo = "百度云:" + data.gbd + "\n天翼云:" + data.gty + "\n游戏名:" + data.gname + "\n激活码:" + data.gmmss
          this.copy(gameinfo)
          //console.log(gameinfo)
        }else {
          this.$message({
            type:"error",
            message:res.data.message
          })
        }


      })
    },

    async copy (gameinfo){
      const { toClipboard } = useClipboard()
      try {
        //复制
        await toClipboard(gameinfo)
        this.$message({
          type:"success",
          message:"已复制到粘贴板"
        })
        //下面可以设置复制成功的提示框等操作
        //...
      } catch (e) {
        //复制失败
        this.$message({
          type:"error",
          message:"复制失败"
        })
      }
    }
  },
}
</script>

<style scoped>



</style>