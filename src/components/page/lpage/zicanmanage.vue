<template>
    <div>
         <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 部门已申购商品总览
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="userName"
            label="申请人姓名"
           >
            </el-table-column>
            <el-table-column label="已申请商品信息">
                <el-table-column
                    label="商品名"
                    >
                     <template slot-scope="scope" >
                         <div :key="index" v-for="(item,index)  in scope.row.beanList"  :class="index===scope.row.beanList.length-1 ? 'lastitem':'border'">
                             {{item.name}}
                         </div>
                    </template>
                </el-table-column>
                <el-table-column 
                    label="数量"
                    >
                    <template slot-scope="scope">
                         <div  :key="index" v-for="(item,index) in scope.row.beanList" :class="index===scope.row.beanList.length-1 ? 'lastitem':'border'">
                             {{item.number}}
                         </div>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<style scoped>
.border {
 border-bottom: 1px solid #EBEEF5;
 margin: 10px;
}
.lastitem {
 margin: 10px 10px 0px;
}
</style>
<script>
import request from '../../../utils/request';
export default {
    data(){
        return {
            tableData:[],
        }
    },
    created() { this.getData();},
    methods:{
          getData() {
              request({
                    url: '/api/v1/apply/goods/people/statistic',
                    method: 'get',
                    params: {date:''}
                }).then(res=>{this.tableData =res.responseData})
        }, 
    }
  
}
</script>

