<template>
    <div>
    <div class="crumbs">
     <el-breadcrumb separator="/">
     <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 我的申请</el-breadcrumb-item>
     </el-breadcrumb>
    </div>
    <div class="container">
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" label="序号" width="100">      </el-table-column>
    <el-table-column prop="name"  label="商品" width="100">      </el-table-column>
     <!-- <el-table-column prop="img" label="图片(点击查看大图)" width="150">   
      <template slot-scope="scope">
    <el-image style="width: 60px; height: 60px" :src="scope.row.img" :preview-src-list="scope.row.srcList">
  </el-image>
    </template>
    </el-table-column> -->
    <el-table-column prop="price" label="单价">                  </el-table-column>
    <el-table-column prop="num"   label="数量">                  </el-table-column>
    <el-table-column   label="小计">  
      <template scope="scope"> {{scope.row.price*scope.row.num}} </template>           </el-table-column>
    <el-table-column label="备注" prop="tip">                                </el-table-column>
     <el-table-column label="状态" prop="type" width="120"> 
       <template scope="scope" > 
      <div style="color:#409EFF">{{ scope.row.type}} 
          <el-button icon="el-icon-edit" type="text" style="margin-left:10px" @click="dialogVisible = true">详情</el-button></div>
        </template>   
              </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope"> 
       <el-button type="primary"  @click="dialogFormVisible = true,handleEdit(scope.$index, scope.row)">查看详情</el-button>
        <el-button  size="mini" type="primary" @click="open(scope.$index, scope.row)">领用商品</el-button>
          </template>
    </el-table-column>
    </el-table>


      <el-dialog title="申请详情" :visible.sync="dialogVisible"   width="20%" >
  <el-row :gutter="24">
  <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="18">
   <el-steps :space="50" :active="4" finish-status="success" direction="vertical">
          <el-step title="已申请"></el-step>
          <el-step title="已审批"></el-step>
          <el-step title="已采购"></el-step>
          <el-step title="已领用"></el-step>
          </el-steps>

    </el-col>
  <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
</el-row> 
   
</el-dialog>

<el-dialog title="申请详情" :visible.sync="dialogFormVisible"   width="30%" >
   <el-row :gutter="24">
   <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
   <el-col :span="18">
    <div class="grid-content bg-purple">
    <el-form :model="form" disabled>
    <el-form-item label="申请人" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="申请时间" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
     <el-form-item label="商品" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="单价" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="数量" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="小计" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" >
    <el-button @click="dialogFormVisible = false" class="dialog-footer">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false" >确 定</el-button>
  </div>
    </div></el-col>
  <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
  </el-dialog>

        </div>

        
    </div>
       
    
</template>

<script>
import { fetchData } from '../../../api/index';
  export default {
    data() {
      return {
        dialogFormVisible: false,
         dialogVisible :false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',
        tableData: [{
          name: '笔记本',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
          price: '39',
          num:'2',
          tip:'暂无',
          type:'已采购',
        }, {
          name: '电脑',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
          price: '3000',
           num:'16',
           tip:'尽快购买',
           type:'已采购',
        }, {
          name: '笔',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
         price:'10',
           num:'80',
           tip:'填写信息完整',
           type:'已采购',
        }, {
          name: '打印机',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
          price: '200',
           num:'2',
           tip:'水利厅',
           type:'已采购',
        }, {
          name: '复印机',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
          price:'150',
           num:'5',
           tip:'研发部',
           type:'已采购',
        }, {
          name: '扫描仪',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
          price: '390',
           num:'8',
           tip:'办公室',
           type:'已采购',
        }, {
          name: '电视',
          img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        ],
          price: '600',
          num:'3',
          tip:'暂无',
          type:'已采购',
        }]
      }
    },
methods: {
      open() {
        this.$confirm('确认领用吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '领取成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消领取'
          });          
        });
      }
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
</style>
