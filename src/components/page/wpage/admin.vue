<template>
      <div>
      <div class="crumbs">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item>
      <i class="el-icon-lx-cascades">
      </i>用户信息列表</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="container">
         <div class="handle-box">
        <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">
        <el-input v-model="Name" placeholder="用户名" class="handle-input mr10"  clearable>
        </el-input></div></el-col>
        <el-col :span="1"><div class="grid-content bg-purple"> </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"> 
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div></el-col>
         <el-col :span="11"><div class="grid-content bg-purple"> </div></el-col>
        </el-row>
         
     
       </div>
      <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" >    
      </el-table-column>
       <el-table-column prop="userId"  label="用户Id" align="center">    
      </el-table-column>
      <el-table-column prop="userName"  label="用户名" align="center">    
      </el-table-column>
      <el-table-column prop="password" label="密码" align="center">
      </el-table-column>
      <el-table-column prop="phone"  label="电话" align="center"> 
      </el-table-column>
      <el-table-column prop="department" label="部门" align="center">         
      </el-table-column>
      <el-table-column label="角色" align="center" >   
           <template slot-scope="scope"> 
                   {{  scope.row.rank|dengji}}
                </template>
      </el-table-column>
      <el-table-column label="身份" align="center" >   
           <template slot-scope="scope"> 
                   {{  scope.row.status|shenfen}}
                </template>
      </el-table-column>
      <el-table-column label="超级管理员" align="center" width="200">
            <template slot-scope="scope"> 
       <el-button type="primary"  @click="appoint(scope.row)">任命</el-button>
        <el-button  size="mini" type="success" @click="cancel(scope.row)">撤销</el-button>
          </template>
      </el-table-column>
      </el-table>
    <div class="pagination">
                  <el-pagination
                      background
                      layout="total, prev, pager, next"
                      :current-page="query.pageIndex"
                      :page-size="query.pageSize"
                      :total="pageTotal"
                      @current-change="handlePageChange"
                  ></el-pagination>
              </div>

      <!-- <el-dialog title="申请详情" :visible.sync="dialogFormVisible"   width="70%" align="center">
            <el-row :gutter="24">
            <el-table :data="form" border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" >           </el-table-column>
              <el-table-column prop="name" label="商品名" align="center" >          </el-table-column>
              <el-table-column prop="number" label="数量" align="center">           </el-table-column>
              <el-table-column  label="状态" align="center">  
                  <template slot-scope="scope"> 
                  <el-tag :type="scope.row.status===2?'success':(scope.row.status===1?'danger':'')">
                    {{  scope.row.status | state}}
                    </el-tag>
                </template>   
                </el-table-column>
                <el-table-column label="紧急程度" align="center"> 
                  <template slot-scope="scope"> 
                  <el-tag :type="scope.row.importance===1?'success':(scope.row.importance===2?'danger':'')">
                    {{  scope.row.importance | import}}
                    </el-tag>
                </template>      </el-table-column>
              <el-table-column label="备注" align="center" prop="remake">    
                    </el-table-column>
              <el-table-column prop="dealPeople"  label="处理人" align="center">    </el-table-column>
              <el-table-column prop="dealTime" label="处理时间" align="center">      </el-table-column>
              </el-table>
            </el-row>
    </el-dialog> -->

          </div>
      </div>
  </template>

  <script>
  import { fetchData } from '../../../api/index';
  import request from '../../../utils/request';
    export default {
      data() {
        return {
          dialogFormVisible: false,
          dialogVisible :false,
          query: {
                  currentPage:1,
                  pageSize: 10,
              },
              pageTotal: 0,
          form:[],
          dealPeople:'',
          formLabelWidth: '80px',
          tableData:[],
          Name:'',
        }
      },
        filters: {
          dengji: function (value) {
              if (value==1) return '普通用户'
              else if (value==2) return '管理员'
          },
          shenfen: function (value) {
              if (value==1) return '正式员工'
              else if (value==2) return '实习生'
          },
      },
      created() { this.getData();},
    methods: {
        getData() {
            //var userName = localStorage.getItem('ms_username');
            var currentPage=this.query.currentPage;
            var   pageSize= this.query.pageSize;
              request({
                        url: '/api/v1/user/list',
                        method: 'post',
                        data:{currentPage,pageSize},
                      }).then(res=>{
                  var b=res.responseData;
                  //console.log(b);
                  var c=res.responseData.data;
                  this.tableData=c;
                    this.pageTotal = res.responseData.page.totalSize || 0;
              })
          },
          //任命
      appoint(row){
          let role=row.rank;
          if(role==2){
              this.$message.error('该用户已经是管理员！');
          }
          else{
           let rank=2;
           let userId=row.userId;
            request({
                        url: '/api/v1/user/update/rank',
                        method: 'post',
                        data:{rank,userId},
                      }).then(res=>{
                 console.log(res);
                  this.$message.success('任命为管理员成功！');
                  row.rank=2;
              })
            //console.log(rank,id); 
            
      }
      },
      cancel(row){
          let role=row.rank;
          if(role==1){
              this.$message.error('该用户已不是管理员！');
          }
          else{
           let rank=1;
           let userId=row.userId;
            request({
                        url: '/api/v1/user/update/rank',
                        method: 'post',
                        data:{rank,userId},
                      }).then(res=>{
                  this.$message.success('撤销管理员成功！');
                 row.rank=1;
                
            })
         //   console.log(rank);
              }
      },
        // 分页导航
          handlePageChange(val) {
              this.$set(this.query, 'currentPage', val);
              this.getData();
          },
           // 触发搜索按钮
          
        handleSearch() {
            var name = this.Name;
            var currentPage=this.query.currentPage;
            var   pageSize= this.query.pageSize;
              request({
                        url: '/api/v1/user/list',
                        method: 'post',
                        data:{currentPage,pageSize,name},
                      }).then(res=>{
                         // console.log(res);
                  var b=res.responseData.data;
                 // console.log(b);
                 // var c=res.responseData.data;
                this.tableData=b;
                this.pageTotal = res.responseData.page.totalSize || 0;
              })
           
        },
      }
    }
  </script>

  <style scoped>
    .el-row {
      margin-bottom: 20px;
    
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    /* .bg-purple {
      background: #d3dce6;
    } */
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .dialog-footer{
      margin-left: 30%;
    }
    .footer{
      margin-left:50%;
    }
  </style>
