<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 申请记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
             <el-button
                    type="primary"
                    icon="el-icon-delete"
                    @click="delAllSelection"
                    >删除选中行</el-button>
            <el-button
                    type="primary"
                    icon="el-icon-s-open"
                    @click="markeAllSelection"
                   >标记选中行为已处理</el-button>       
            <el-button
                    type="primary"
                    icon="el-icon-s-claim"
                    @click="exportgoods"
                    >一键处理</el-button>
             <el-date-picker
                v-model="datemonth"
                style="margin-left:10px;margin-right:10px;"
                type="month"
                value-format="yyyy-MM"
                placeholder="选择月">
             </el-date-picker>
            <el-button
                    type="primary"
                    @click="exportapply"
            >根据时间导出申请记录</el-button>
            <!-- <a :href="blobUrl" :download="blob">a</a> -->
            <!-- :download="url" -->
            <el-table
                :data="tableData"
                border
                class="table mt"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column> -->
                <el-table-column prop="userName" label="申请人"></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
                <!-- <el-table-column label="金额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column> -->
                <!-- <el-table-column label="商品名称"></el-table-column> -->
                <el-table-column prop="goodsNum" label="商品数量"></el-table-column>
                <el-table-column label="申请状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.status===2?'success':(scope.row.status===1?'danger':'')"
                        >{{scope.row.status|state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="timeStr" label="申请时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            @click="applydetail(scope.row.applyMainId)"
                        >详情</el-button>
                        <!-- <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button> -->
                        <!-- <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.currentPage"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 更改数量弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-input-number v-model="editnum.number" :step="1" :min="1" step-strictly></el-input-number>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
          <!-- 详情弹出框 -->
        <el-dialog title="详情" :visible.sync="detailVisible" width="70%">
                <el-row :gutter="24">
                <el-table :data="applydetaildata" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" >           </el-table-column>
                <el-table-column prop="id"  label="id" align="center">                </el-table-column>
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
                    </template>
                </el-table-column>
                <el-table-column  label="图片" align="center" >     
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.picture"
                            ></el-image>
                    </template>   
                </el-table-column>
                <el-table-column label="备注" align="center" prop="remake"></el-table-column>
                <el-table-column prop="dealPeople"  label="处理人" align="center"></el-table-column>
                <el-table-column prop="dealTime" label="处理时间" align="center"></el-table-column>
                  <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >更改数量</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-row>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
import request from '../../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                "currentPage": 1,
                "pageSize": 10,
                "status": this.$route.name == "weixiadan" ? "1" : "2",
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            detailVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            blobUrl: '',
            applydetaildata:[],
            editnum:{number:1,id:1},
            applyMainId:0,
            datemonth:''
        };
    },
    filters: {
        state: function (value) {
            if (!value) return ''
            if (value==1) return '未处理'
            else if (value==2) return '已处理'
            // value = value.toString()
            // return value.charAt(0).toUpperCase() + value.slice(1)
        },
         import: function (value) {
            if (value==1) return '普通'
            else if (value==2) return '紧急'
        },
    },
     created() {
            // if (this.$route.name == "weixiadan") {
            //     this.filter.xiadan = 1;
            //     // this.filter.is_join = 1;
            // } else if (this.$route.name == "yixiadan") {
            //     this.filter.xiadan= 2;
            //     // this.filter.is_join = 0;
            // }
        this.getData();
    },
     watch: {
            $route(to, from) {
            this.query.status = "";
           if (this.$route.name == "weixiadan") {
                this.query.status = 1;
            } else if (this.$route.name == "yixiadan") {
                this.query.status= 2;
            } 
           this.getData();
        }
    },
       methods: {
        getData() {
              request({
                    url: '/api/v1/apply/list/manage',
                    method: 'post',
                    data:  this.query,
                }).then(res=>{ this.tableData=res.responseData.data,this.pageTotal=res.responseData.page.totalSize})
        },
         handleSelectionChange(val) {//勾选
             this.multipleSelection = val; //给定义的数组赋值
             console.log(this.multipleSelection) 
        },
        //批量删除
        delAllSelection() {
            let codeArray = this.multipleSelection.map( val => val.applyMainId);
            // console.log(codeArray)
            if(codeArray[0]){
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                .then(() => {
                        // this.$message.success('删除成功');
                        request({
                            url: '/api/v1/apply/main/delete' ,
                            method: 'post',
                            data: {codeArray:codeArray}
                        }).then(res=>{
                            let isSuccess =  res.code
                            if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                            else{this.$message.error('删除失败')}
                        })
                    })
                .catch(() => {});
            }
            else {this.$message.error('请勾选要删除项')}
            
        },
        //批量标记
        markeAllSelection(){
            let codeArray = this.multipleSelection.map( val => val.applyMainId);
            if(codeArray[0]){
             this.$confirm('确定要标记处理吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                     request({
                        url: '/api/v1/apply/update/row/status/multi' ,
                        method: 'post',
                        data: {codeArray:codeArray}
                      }).then(res=>{
                        let isSuccess =  res.code
                        if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                        else{this.$message.error('操作失败')}
                     })
                })
            .catch(() => {});
            }else {this.$message.error('请勾选要处理项')}
        },
        exportgoods(){
             request({
                    url: '/api/v1/apply/export/goods/info',
                    method: 'get',
                }).then(res=>{
                   this.getData(), this.$message.success('处理成功')
            })
        },
        exportapply(){
            console.log(this.datemonth)
            request({
                url:'/api/v1/apply/export/apply/info',
                method:'get',
                params:{time:this.datemonth},
                responseType: 'blob', 
            }).then(res=>{
            　　let blob = new Blob([res]);
                let downloadElement = document.createElement('a');
            　　let href = window.URL.createObjectURL(blob); //创建下载的链接
            　　downloadElement.href = href;
            　　downloadElement.download ='test.xlsx'; //下载后文件名
            　　document.body.appendChild(downloadElement);
            　　downloadElement.click(); //点击下载
            　　document.body.removeChild(downloadElement); //下载完成移除元素
            　　window.URL.revokeObjectURL(href); //释放掉blob对象  )
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }) 
                .then(res=>{
                        let isSuccess =  res.code
                        if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                        else{this.$message.error('操作失败')}
                     })
                .catch(() => {});
        },
        // 更改数量操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editnum.id=row.id;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
             let applyMainId=this.applyMainId
             request({
                    url: '/api/v1/apply/detail/update',
                    method: 'post',
                    params: this.editnum
                }).then(res=>{
                        let isSuccess =  res.code
                        if(isSuccess==1){this.$message.success(res.message),this.applydetail(applyMainId)}
                        else{this.$message.error('编辑失败')}
                    })
            this.editVisible = false;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getData();
        }, 
        //申请详情
        applydetail(applyMainId) {
              this.detailVisible= true
              this.applyMainId=applyMainId
              request({
                    url: '/api/v1/apply/detail/'+applyMainId,
                    method: 'get',
                }).then(res=>{this.applydetaildata=res.responseData})
                // this.applydetaildata=res.responseData
            //  console.log(this.applydetaildata)
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.mt {
    margin-top: 16px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>