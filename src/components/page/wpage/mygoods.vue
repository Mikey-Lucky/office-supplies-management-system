<template>
      <div>
      <div class="crumbs">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 我的商品</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="container">
      <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" >       </el-table-column>
      <el-table-column prop="department"  label="部门" align="center">      </el-table-column>
      <el-table-column prop="userName"  label="用户名" align="center">  </el-table-column>
      <el-table-column prop="name"  label="商品名" align="center">      </el-table-column>
      <el-table-column prop="number"  label="商品数量" align="center">  </el-table-column>
   </el-table>
      </div>
      </div>
  </template>

  <script>
  import { fetchData } from '../../../api/index';
  import request from '../../../utils/request';
    export default {
      data() {
        return {
          formLabelWidth: '80px',
          tableData:[],
        }
      },
        filters: {
          state: function (value) {
              if (value==1) return '未处理'
              else if (value==2) return '已处理'
          },
          import: function (value) {
              if (value==1) return '普通'
              else if (value==2) return '紧急'
          },
         
      },
      created() { this.getData();},
    methods: {
        getData() {
            var userName = sessionStorage.getItem('ms_username');
          
              request({
                        url: '/api/v1/apply/goods/people/statistic',
                        method: 'get',
                        
                      }).then(res=>{
                  var b=res.responseData;
                   this.tableData=b;
                  
                  console.log(b);
                  
              })
          },
         
          },
         

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
