<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 购物车
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table @selection-change="handleSelectionChange"
                :data="goodsData"
                style="width: 100%">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <!-- <el-table-column prop="name" label="商品名"></el-table-column> -->
                <el-table-column
                label="商品图片" align="center">
                   <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            style="width: 100px; height: 100px"
                            :src="scope.row.picture"
                        ></el-image>
                    </template>
                </el-table-column>
                 <el-table-column
                    label="商品信息" >
                    <template slot-scope="scope">
                           商品名： <p>{{scope.row.name}}</p>
                           商品备注： <p>{{scope.row.remake}}</p>
                        </template>
                </el-table-column>
                <!-- <el-table-column
                label="商品分类"
                prop="goodtype">
                </el-table-column> -->
                <el-table-column
                 label="单价">
                  <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column
                 label="数量">
                    <template slot-scope="scope">
                        <el-input-number @change="numberchange(scope.$index,scope.row)" v-model="scope.row.number" :step="1" :min="1" step-strictly></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="紧急程度" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.importance===1?'success':(scope.row.importance===2?'danger':'')"
                        >{{scope.row.importance|importance}}</el-tag>
                    </template>
                </el-table-column>     
            </el-table>
        </div>
        <div class="caozuo">
             <!-- <el-checkbox  label="全选" class="wenzi"></el-checkbox> -->
            <span  class="wenzi red el-icon-delete pointer" @click="delAllSelection" >&nbsp;删除选中行</span>
             <span class="wenzi">已选商品<span class="zuozhong">{{sum}}</span>件</span>
             <span class="wenzi">合计：<span class="zuozhong">{{moneyTotal}}</span></span>
             <!-- <span class="apply-button" @click="handleApply()">申请</span> -->
             <el-button  class="apply-button" @click="handleApply()">申请</el-button>
        </div>
        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%" >
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="商品名">
                    <el-input v-model="form.goodname" ></el-input>
                </el-form-item>
                 <el-form-item label="商品类型">
                          <el-select
                            v-model="value"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择文章标签">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="商品品牌">
                    <el-input v-model="form.goodgrand"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <p>自定义规格</p>
                    <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <el-form-item label="商品样式(图片)">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
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
                <el-form-item label="状态">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option
                            v-for="item in goodstate"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>
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
  .caozuo {
      position: fixed;
      /* position: absolute; */
      /* width: 100%; */
      height: 62px;
      background: rgb(229, 229, 229);
      bottom: 0;
      width: 1249px;
      z-index: 1;  
  }

.caozuo .wenzi {
      float: left ;
      margin: 0 38px;
      line-height: 62px;
  } 
  .zuozhong {
      color: red;
      font-weight: 800;
      font-size: larger;
    }
  .apply-button {
      float: right;
      width: 150px;
      text-align: center;
      line-height: 62px;
      background: #409eff;
      color: #fff;
      /* display: inline-block; */
  }
  .pointer{
    cursor: pointer;
  }
</style>
<script>
import request from '../../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            goodstate:[{
                value: '选项1',
                label: '可申购'
                }, {
                value: '选项2',
                label: '不可申购'
                }, 
            ],
            query: {
                currentPage:1,
                pageSize: 10,
                name:'',
            },
            goodsData: [],
            addgoodform:[{state:''}],
            multipleSelection: [],
            delList: [],
            editdata:{1:{id:1,importance:2,number:1},2:{}},
            pageTotal: 10,
            form: {},
            idx: -1,
            id: -1,
            applyVisible: false,
            addgoodsVisible: false,
            //申请购买商品数量
            goodsnum: '1',
            // dynamicTags: ['10cm', '8cm', '6cm'],
            inputVisible: false,
            inputValue: '',
            testdata:''
        };
    },
    //  created() { this.getData();},
     mounted() { this.getData();},
     computed: {
       
        sum:function(){
             let s=0;
             for(var i=0;i<this.multipleSelection.length;i++){
                 s+=this.multipleSelection[i].number;
             }
                 return s;
        },
         moneyTotal:function(){
             let m=0;
             for(var i=0;i<this.multipleSelection.length;i++){
                let n=this.multipleSelection[i].price*this.multipleSelection[i].number
                m=this.accAdd(m,n)
                // m+=this.multipleSelection[i].price*this.multipleSelection[i].number
            }
                  return m;
         }
      },
    filters: {
        importance: function (value) {
            if (!value) return ''
            if (value==1) return '普通'
            else if (value==2) return '紧急'
            // value = value.toString()
            // return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    watch:{
        $route(to,from){
            if(to.path=='/shoppingcar')
            {
                this.getData();
            }
            
        }
    },
    methods: {
         //浮点加法精度问题
        accAdd(arg1, arg2) {
            var r1, r2, m, c;
            try {
                r1 = arg1.toString().split(".")[1].length;
            }
            catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            }
            catch (e) {
                r2 = 0;
            }
            c = Math.abs(r1 - r2);
            m = Math.pow(10, Math.max(r1, r2));
            if (c > 0) {
                var cm = Math.pow(10, c);
                if (r1 > r2) {
                    arg1 = Number(arg1.toString().replace(".", ""));
                    arg2 = Number(arg2.toString().replace(".", "")) * cm;
                } else {
                    arg1 = Number(arg1.toString().replace(".", "")) * cm;
                    arg2 = Number(arg2.toString().replace(".", ""));
                }
            } else {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", ""));
            }
            return (arg1 + arg2) / m;
        },
        getData() {
              request({
                    url: '/api/goods/car/list',
                    method: 'post',
                    data:  this.query,
                }).then(res=>{ this.goodsData=res.responseData.data})
                // console.log(this.goodsData)
        },
        numberchange(index,row) {
            console.log(row.id)
            console.log(row.number)
             request({
                    url: '/api/goods/car/update',
                    method: 'post',
                    data:  {"id":row.id,"number":row.number},
                })
                // .then(res=>{ this.getData(), this.$message.success(res.message)})
        },
        handleSelectionChange(val) {//勾选
             this.multipleSelection = val; //给定义的数组赋值
            //  console.log(this.multipleSelection) 
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
         //批量删除
        delAllSelection() {
            let codeArray = this.multipleSelection.map( val => val.id);
            console.log(codeArray)
             this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                    // this.$message.success('删除成功');
                     request({
                        url: '/api/goods/car/delete' ,
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
        // 编辑操作
        handleEdit(index, row) {
            // console.log(this.form)
            this.idx = index;
            this.form=this.deepClone(row);
            // this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            //向后台请求编辑，将form表单数据传入
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //申请商品
        handleApply() {
             let idList = this.multipleSelection.map( val => val.id);
             if(idList[0]){
                let userName = localStorage.getItem('ms_username');
                let userId = localStorage.getItem('userId');
                request({
                        url: '/api/v1/apply/add',
                        method: 'post',
                        data:  {idList,userId,userName},
                    }).then(res=>{ 
                        let isSuccess =  res.code
                        if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                        else{this.$message.error('申请失败')}
                        })
             }else {this.$message.error('请勾选需要申请项')}
           
        },
      //添加标签相关方法
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
       //添加标签相关方法
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
     //添加标签相关方法
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      //上传图片相关方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
       //上传图片相关方法
      handlePreview(file) {
        console.log(file);
      },
    //   handleDelete(index, r) {
    //        this.$confirm('确定要删除吗？', '提示', {
    //             type: 'warning'
    //         })
    //             .then(() => {
    //                 this.$message.success('删除成功');
    //                 this.goodsData.splice(index, 1);
    //             })
    //             .catch(() => {});
    //     },
    }   
    }
</script>

