<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商品列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="商品名" class="handle-input mr10"></el-input>
                
                <!-- 商品类别暂缓 -->
                <!-- <el-select
                    v-model="value"
                    class="mr10"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="商品类別">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="goodsData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
             >
                <!-- <el-table-column prop="goodsId" label="ID" width="55" align="center"></el-table-column> -->
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="商品名"></el-table-column>
                <!-- <el-table-column prop="goodtype" label="商品类别"></el-table-column> -->
                <el-table-column label="单价">
                    <template slot-scope="scope">￥{{scope.row.price}}</template>
                </el-table-column>
              
                <el-table-column label="描述">
                   <template slot-scope="scope">
                       <el-tooltip placement="top">
                        <div slot="content">{{scope.row.remake}}</div>
                        <!-- <el-button>{{scope.row.remake}}</el-button> -->
                        <p style="  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{scope.row.remake}}</p>
                      </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="操 作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="red"
                            icon="el-icon-view"
                            @click="handleGoodsDetail(scope.row.goodsId)"
                         >详情</el-button>
                         <!-- <el-button
                            type="text"
                            icon="el-icon-circle-plus-outline"
                            class="green"
                            @click="addCar(scope.row.goodsId)"
                         >加入购物车</el-button> -->
                         <!-- <el-button
                            type="text"
                            icon="el-icon-s-promotion"
                            class="blue"
                            @click="handleApply()"
                        >申请</el-button> -->
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

    </div>
</template>
<style scoped>
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
            pageTotal: 0,

            goodsData: [
                ],
            multipleSelection: [],
            form: {},
            idx: -1,
            id: -1,
            applyVisible: false,
            addgoodsVisible: false,
            //申请购买商品数量
            goodsnum: '1',
            inputVisible: false,
            inputValue: '',
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        };
    },
    filters: {
        state: function (value) {
            if (!value) return ''
            if (value==0) return '不可申购'
            else if (value==1) return '可申购'
            // value = value.toString()
            // return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    created() { this.getData();},
    methods: {
        // getData() {
        //     // fetchData(this.query).then(res => {
        //     //     this.goodsData = res.list;
        //     //     this.pageTotal = res.pageTotal || 50;
        //     // });
        //     goodsList(this.query).then(res=>{
        //           this.goodsData = res.responseData.data;
        //           this.pageTotal = res.responseData.page.totalSize || 0;
        //           console.log(res);
        //     })
        // },
        getData() {
            goodsList(this.query).then(res=>{
                 let code=res.code;
                  if(code==100){
                   this.$message.error('抱歉登录信息失效,请重新登录！');
                  this.$router.push('/login');  
                 }
                 else{
                      this.goodsData = res.responseData.data;
                  this.pageTotal = res.responseData.page.totalSize || 0;
//                   console.log(res); 
                 }
            })
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
            this.$set(this.query, 'currentPage', 1);
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getData();
        },
        //申请商品
        handleApply() {
            // this.applyVisible=true;
            this.$router.push( {path: '/applywares'})
        },
        //确定申请
        saveApply() {
            this.applyVisible=false;
            console.log('hahhahha')
        },
        handleGoodsDetail(goodsid) {
            this.$router.push({ name: 'goodsdetail', query: {id: goodsid}})
        },
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