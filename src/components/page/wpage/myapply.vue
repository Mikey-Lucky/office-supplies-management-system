  <template>
      <div>
      <div class="crumbs">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 申请信息</el-breadcrumb-item>
      </el-breadcrumb>
      </div>
      <div class="container">
      <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" >      </el-table-column>
      <el-table-column prop="department"  label="申请部门" align="center">      </el-table-column>
      <el-table-column prop="goodsNum" label="申请数量" align="center">      </el-table-column>
      <el-table-column prop="operateName"  label="处理人" align="center">             </el-table-column>
      <el-table-column  label="状态" align="center">        
        <template slot-scope="scope">
          <el-tag :type="scope.row.status===1?'success':(scope.row.status===2?'danger':'')">
            {{  scope.row.status | state}}
            </el-tag>
        </template>           
        </el-table-column>
        <el-table-column prop="timeStr" label="申请时间" align="center" >   </el-table-column>
      <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope"> 
            <el-link   style="margin-left:15px" type="primary" :underline="false" icon="el-icon-edit" @click="details(scope.row)">查看详情</el-link>
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

      <el-dialog title="申请详情" :visible.sync="dialogFormVisible"   width="70%" align="center">
            <el-row :gutter="24">
            <el-table :data="form" border style="width: 100%">
              <el-table-column type="index" label="序号" align="center" >           </el-table-column>
              <!-- <el-table-column prop="id"  label="id" align="center">                </el-table-column> -->
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
              <!-- <el-table-column  label="图片" align="center" >     
                <template slot-scope="scope">
                                  <el-image
                                      class="table-td-thumb"
                                      :src="scope.row.picture"
                                  ></el-image>
                              </template>   
              </el-table-column> -->
              <el-table-column label="备注" align="center" prop="remake">      
                <!-- <template slot-scope="scope"> 
                    {{  scope.row.remake | tip}}
                </template>   -->
                    </el-table-column>
              <el-table-column prop="dealPeople"  label="处理人" align="center">    </el-table-column>
              <el-table-column prop="dealTime" label="处理时间" align="center">      </el-table-column>

              </el-table>
              <!-- </div></el-col> -->
            <!-- <el-col :span="2"><div class="grid-content bg-purple"></div></el-col> -->
            </el-row>
    </el-dialog>

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
          //  tip: function (value) {
          //     if (value=='') return '暂无'

          // }
      },
      created() { this.getData();},
    methods: {
        getData() {
            var userName = sessionStorage.getItem('ms_username');
            var currentPage=this.query.currentPage;
            var   pageSize= this.query.pageSize;
              // var   status=1;
            // var time='';
              request({
                        url: '/api/v1/apply/list/self',
                        method: 'post',
                        data:{currentPage,pageSize,userName},
                      }).then(res=>{
                  var b=res.responseData;
                  var c=res.responseData.data;
                  this.tableData=c;
                    this.pageTotal = res.responseData.page.totalSize || 0;
              })
          },
          getDetail(id){
                  request({
                        url: '/api/v1/apply/detail/'+id,
                        method: 'get',
                      })
                      .then(res=>{
                      this.form=res.responseData;
                      console.log(this.form);
                      })
          },
          details(row){
            this.dialogFormVisible = true;
          let applyid=row.applyMainId;//获取当前行id
          this.id=applyid;
          this.getDetail(this.id);
          },

        // 分页导航
          handlePageChange(val) {
              this.$set(this.query, 'currentPage', val);
              this.getData();
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
