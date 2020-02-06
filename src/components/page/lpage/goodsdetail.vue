<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 商品详情
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="container"> 
                <el-row>
                <el-col :span="12">
                    <!-- {{goodsdetail.goodsId}} -->
                    <div class="grid-content "> 
                        <el-image
                        style="width: 400px;height: 400px;"
                        :src="goodsdetail.picture"
                        fit="cover">
                        </el-image>
                       
                     </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content ">
                        <h2 class="goodsname">{{goodsdetail.name}}</h2>
                        <div class="price">
                            <span class="font-size-18">￥</span>
                            <span>{{goodsdetail.price}}</span>  
                        </div>
                         <p class="hang">商品描述：{{goodsdetail.remake}}</p>
                        <!-- <el-divider></el-divider> -->
                        <!-- <p class="hang">申购需填</p> -->
                          <p class="hang">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：
                            <el-input-number  v-model="addcardata.number" :step="1" :min="1" step-strictly>
                            </el-input-number>
                          </p>
                          <p class="hang">紧急程度:
                               <el-select style="margin-left:14px;width:130px;" v-model="addcardata.importance" placeholder="请选择">
                                    <el-option
                                    v-for="item in importance"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                          </p>
                          <p class="hang">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                placeholder="请输入内容"
                                v-model="addcardata.remake">
                              </el-input>
                          </p>
                         
                        <el-row>
                            <!-- <el-button type="danger" style="margin-right: 10px;">立即申请</el-button> -->
                            <el-button @click="addCar" type="danger" class="btn">加入购物车</el-button>
                        </el-row>
                    </div>
                </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<style>
  .btn {
      padding: 10px 30px;
      border-radius: 0;
      font-size: 18px;
      margin-top: 34px;
      font-weight: 400;
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
  .hang {
      line-height: 50px;
  }
  .price {
      /* height: 100px; */
      background-color: #fafafa;
      color: #f96868;
      font-size: 30px;
      padding: 20px;
  }
  .font-size-18 {
      font-size: 18px;
  }
  .goodsname {
      font-weight: 400;
      margin-bottom: 11px;
      font-size: 24px;
  }
</style>
<script>
import request from '../../../utils/request';
export default {
    name: 'basetable',
    data() {
        return {
            // addcardata:{ goodsId:this.$route.params.goodsId ,name:this.goodsdetail.name,price:this.goodsdetail.price,importance:'',number:'',remake:''},
            addcardata:{importance:'1',number:'',remake:''},
            importance: [{
            value: '1',
            label: '普通'
            }, {
            value: '2',
            label: '紧急'
            },],
            goodsdetail:[],
            goodsnum: 1,
            // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        };
    },
    created() { this.getData();},
    watch:{
        $route(to,from){
            if(to.path=='/goodsdetail')
            {
                this.getData();
            }
        }
    },
  
    methods: {
        getData() {
                let goodsid=this.$route.query.id
                request({
                    url: '/api/v1/goods/detail/'+goodsid ,
                    method: 'get',
                }).then(res=>{ this.goodsdetail=res.responseData})
        },
        addCar(){
             let a={goodsId:this.goodsdetail.goodsId,importance:this.addcardata.importance,number:this.addcardata.number,remake:this.addcardata.remake}
              request({
                    url: '/api/goods/car/add' ,
                    method: 'post',
                    data: a,
             }).then(res=> { 
                    let isSuccess =  res.code
                    if(isSuccess==1){this.getData(), this.$message.success(res.message)}
                    else{this.$message.error('加购失败')}
                 })
            //  this.$notify({
            //     title: '成功',
            //     message: '加购成功',
            //     type: 'success'
            //  });
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