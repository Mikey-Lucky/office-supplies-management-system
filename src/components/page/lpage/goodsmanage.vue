<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商品管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-input v-model="query.name" placeholder="商品名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd">增加商品</el-button>
            </div>
            <el-table
                @selection-change="handleSelectionChange"
                :data="goodsData"
                style="width: 100%">
                <el-table-column  type="selection" width="55" align="center"></el-table-column>
                <el-table-column
                label="商品 ID"
                prop="goodsId">
                </el-table-column>
                <el-table-column
                label="商品名称"
                prop="name">
                </el-table-column>
                 <el-table-column
                  label="商品价格">
                  <template slot-scope="scope">
                      ￥ {{scope.row.price}}
                    </template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.picture"
                            :preview-src-list="[scope.row.picture]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                label="商品描述"
                >
                <!-- prop="remake" -->
                  <template slot-scope="scope">
                       <el-tooltip placement="top">
                        <div slot="content">{{scope.row.remake}}</div>
                        <!-- <el-button>{{scope.row.remake}}</el-button> -->
                        <p style="  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{scope.row.remake}}</p>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.status===1?'success':(scope.row.status===0?'danger':'')"
                        >{{scope.row.status|state}}</el-tag>
                    </template>
                </el-table-column> -->
                 <el-table-column label="操 作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <!-- :total="pageTotal" -->
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize" 
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
         <!-- 编辑商品弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%" >
            <el-form ref="form" :model="form" label-width="70px">
                 <el-form-item label="id">
                    <el-input v-model="form.goodsId" ></el-input>
                </el-form-item>
                <el-form-item label="商品名">
                    <el-input v-model="form.name" ></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        class="upload-demo"
                        action="http://10.36.15.208:8822/file/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                     <el-input
                        type="textarea"
                        :autosize="{ minRows: 8}"
                        placeholder="请输入内容"
                        v-model="form.remake">
                    </el-input>
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option
                            v-for="item in goodstate"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
          <!-- 添加商品弹出框 -->
         <el-dialog title="添加商品" :visible.sync="addgoodsVisible" width="30%" >
            <el-form ref="form" :model="addgoodform" label-width="70px" >
                <el-form-item label="商品名">
                    <el-input v-model="addgoodform.name" ></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        class="upload-demo"
                        action="http://10.36.15.208:8822/file/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :on-success="filesuccess"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="addgoodform.price"></el-input>
                </el-form-item>
                 <el-form-item label="商品描述">
                     <el-input
                        type="textarea"
                        :autosize="{ minRows: 8}"
                        placeholder="请输入内容"
                        v-model="addgoodform.remake">
                    </el-input>
                    <!-- <el-input  type="textarea" v-model="addgoodform.remake" ></el-input> -->
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-select v-model="addgoodform.state" placeholder="请选择">
                        <el-option
                            v-for="item in goodstate"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addgoodsVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddgoods">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<script>
import { goodsList } from '../../../api/index';
import request from '../../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            // goodstate:[{
            //     value: '选项1',
            //     label: '可申购'
            //     }, {
            //     value: '选项2',
            //     label: '不可申购'
            //     }, 
            // ],
            query: {
                currentPage:1,
                pageSize: 10,
                name:''
            },
            pageTotal: 0,
            goodsData: [],
            addgoodform:{},
            multipleSelection: [],
            delList: [],
            editVisible: false,
            form: {},
            idx: -1,
            id: -1,
            applyVisible: false,
            addgoodsVisible: false,
            //申请购买商品数量
            goodsnum: '1',
            inputVisible: false,
            inputValue: '',
            fileList:[]
        };
    },
     created() { this.getData();},
     filters: {
        state: function (value) {
            if (!value) return ''
            if (value==0) return '不可申购'
            else if (value==1) return '可申购'
            // value = value.toString()
            // return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {
        getData() {
            goodsList(this.query).then(res=>{
                  this.goodsData = res.responseData.data;
                  this.pageTotal = res.responseData.page.totalSize || 0;
                //   console.log(res);
            })
        },
        filesuccess(response, file, fileList) {
            //  console.log(response)
             this.addgoodform.picture=response.responseData
        },
         //对象深克隆
        deepClone(obj) {
            let copy;
            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;
            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }
            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = this.deepClone(obj[i]);
                }
                return copy;
            }
            // Handle Function
            if (obj instanceof Function) {
                copy = function() {
                return obj.apply(this, arguments);
                }
                return copy;
            }
            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = this.deepClone(obj[attr]);
                }
                return copy;
            }
            throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
         },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        //删除
         handleDelete(index, row) {
            // console.log(index,row)
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                    // this.$message.success('删除成功');
                    this.goodsData.splice(index, 1);
                    let codeArray=[row.goodsId]
                    // console.log(codeArray)
                     request({
                        url: '/api/v1/goods/delete' ,
                        method: 'post',
                        data: {codeArray:codeArray}
                      }).then(res=>{
                        let isSuccess =  res.code
                        if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                        else{this.$message.error('删除失败')}
                    })
                })
            .catch(() => {});
           
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        },
        //批量删除 
        delAllSelection() {
             let codeArray = this.multipleSelection.map( val => val.goodsId);
            //  console.log(codeArray[0])
            if(codeArray[0]){
                    this.$confirm('确定要删除吗？', '提示', {
                      type: 'warning'
                   })
                    .then(() => {
                            // this.$message.success('删除成功');
                            request({
                                url: '/api/v1/goods/delete' ,
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
             else{ this.$message.error('请勾选要删除选项')}
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form=this.deepClone(row);
            // this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            //向后台请求编辑，将form表单数据传入
            // this.$set(this.tableData, this.idx, this.form);
              let canshu=this.form
              request({
                    url: '/api/v1/goods/update',
                    method: 'post',
                    data: canshu,
             }).then(res=>{
                        let isSuccess =  res.code
                        if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                        else{this.$message.error('编辑失败')}
                    })
            this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        },
         // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getData();
        },
        //增加商品
        handleAdd() {

            this.addgoodsVisible = true;
        },
        //确认增加
        saveAddgoods() {
            // console.log(this.fileList)
            let addgoodform=this.addgoodform
            console.log(addgoodform)
            request({
                url: '/api/v1/goods/add',
                method: 'post',
                data: addgoodform,
            }).then(res=>{
                        let isSuccess =  res.code
                        if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                        else{this.$message.error('添加失败')}
                    })
            this.addgoodsVisible = false;
        },
      //上传图片相关方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
       //上传图片相关方法
      handlePreview(file) {
        console.log(file);
      }
    }   
    }
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
.green {
    color: #32bea6;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>