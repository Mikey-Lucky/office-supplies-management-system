<template>
  <div class="tableDate">
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 申请商品
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <div class="container">
            <!-- <div class="xitong-title">江西省水利厅办公用品系统</div>
            <div class="xinxi-title"><h2>申请信息填写</h2></div> -->
            <el-row :gutter="20">
               <el-col :span="1">
                 <div class="grid-content "> 
                     </div></el-col>
               <el-col :span="20"  ><div class="grid-content ">
                  <h5>申请时间:{{time}}&nbsp;&nbsp;申请人:{{person}}&nbsp;&nbsp;部门:{{department}}</h5><br>
                          <el-button  type="success" size="mini" @click="addDemo" style="margin-bottom:10px;">添加商品</el-button>
                          </div></el-col>
           </el-row>
           
            <el-row :gutter="20">
            <el-col :span="1"><div class="grid-content"></div></el-col>
            <el-col :span="22" style="line-height:55px;" v-for="(item,index) in items" v-bind:key="index">
            <el-table :data="tableData" size="mini" highlight-current-row border 
            style="width: 100%;" class="el-tb-edit edit"  @selection-change="handleSelectionChange" ref="demoTable">
             <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="options" label="选择商品" width="180" >
                   <template scope="scope">
                    <el-cascader :options="scope.row.options" clearable size="small"></el-cascader>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="180">
                     <template scope="scope">  {{ scope.row.price}} </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" width="180">
                <template scope="scope">
                    <el-input-number v-model="scope.row.num" :min="1" :max="999" label="描述文字"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column label="小计" width="180">
                <template scope="scope">
                     {{scope.row.price*scope.row.num}}
                      </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button  type="success" size="mini" @click="addDemo" style="margin-bottom:10px;">添加商品</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="">备注：</div>
        <el-input type="textarea" :rows="3"   placeholder="请输入内容" v-model="textarea" class="textarea" ></el-input>
             <div style="float:right;font-weight:bold">共 {{numbers}}件商品，已勾选{{sum}}件商品,商品总计：<span style="color:red">{{moneyTotal}}</span>元  <br>
                 <!-- 合计：{{total}}元 -->
                  
             </div>
             <span style="font-weight:bold;margin-right:20px"></span> <br>
              <div style="margin-left:40%"><el-button @click="resetForm()">重置</el-button>
             <el-button type="primary" @click="open">提交</el-button></div>
           </el-col>
         <el-col :span="1"><div class="grid-content "></div></el-col>
         </el-row>
    </div>
  </div>
</template>
   <script>
export default {
    data() {
      return {      textarea:'',
                    time:'2019-9-19',
                    person:'管理员',
                    department:'测试部',
                 multipleSelection:[],
                    items:[{ }],
                    tableData: [{                       
                        num: 1,
                        price:'20',
                   
                    }, 
                    ],
                    currentRow: null,
                }},
               methods: {
                  handleSelectionChange(val) {
                     this.multipleSelection = val; //给定义的数组赋值
                            },
                     addDemo() {
                        let d = {
                            price: '30',
                            num: 1,
                       };
                        this.tableData.push(d);
                        //setTimeout(() => { this.$refs.demoTable.setCurrentRow(d); }, 10);
                    },
                    
                     handleCurrentChange(val) {
                        this.currentRow = val;
                    },
                    handleDelete(index, r) {
                        this.tableData.splice(index, 1)
                    },
                     open() {
        this.$alert('确定提交吗', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
       resetForm() {
          for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].num=1;
          this.tableData[i].price='';
                       
          }
      },
          
            
        },
               computed: {
                  numbers:
                  function(){
                     let num=0;
                     for (let i = 0; i < this.tableData.length; i++) {
                     num+=this.tableData[i].num;
                     }
                    this.number=num;
                   return this.number;
                   } ,
                   total: function () {
                    let a = 0;
                    for (let i = 0; i < this.tableData.length; i++) {
                            a += this.tableData[i].price * this.tableData[i].num
                    }
                       this.to = a;
                    return this.to;
                },
                sum:function(){
                     let s=0;
                     for(var i=0;i<this.multipleSelection.length;i++){
                         s+=this.multipleSelection[i].num
                  }
                    return s;
                },
                moneyTotal:function(){
                  
                  let m=0;
                  for(var i=0;i<this.multipleSelection.length;i++){
                         m+=this.multipleSelection[i].price*this.multipleSelection[i].num
                  }
                  return m;
                }

        
      },
               }



    </script>
<style scoped>
.xitong-title{
    font-size:16px;
    line-height: 34px;
    text-align: center;
    height: 34px;
    border-bottom:1px solid #ededed;
}
.xinxi-title{
    font-size:16px;
    line-height: 34px;
    text-align: center;
    height: 34px;
}
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
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
  .edit{
    font-weight: bold
  }
</style>