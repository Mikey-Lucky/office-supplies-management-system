<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">办公用品管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                        <router-link to="/shoppingcar">
                            <i class="el-icon-shopping-cart-2"></i>
                        </router-link>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item divided command="revise" @click="dialogVisible = true">修改信息</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

<el-dialog
  title="用户信息"
  :visible.sync="dialogVisible"
  width="30%" align="center">
        <el-form  :model="param" label-width="80px">
  <el-form-item label="用户名" class="label">
    <el-input v-model="param.userName" style="margin-bottom:5px;"></el-input>
  </el-form-item>
   <el-form-item label="部门名称">
    <el-input v-model="param.department" style="margin-bottom:5px"></el-input>
  </el-form-item>
   <el-form-item label="电话" >
    <el-input v-model="param.phone" style="margin-bottom:5px"></el-input>
  </el-form-item>
   <el-form-item label="密码">
    <el-input v-model="param.password" style="margin-bottom:5px"></el-input>
  </el-form-item>
  <!-- <el-form-item label="身份">
        <el-input style="margin-bottom:5px" v-model="param.status" v-on:chang="aa"> -->
           <!-- {{param.status| state}} -->
           <!-- </el-input>  -->
    <!-- <el-select v-model="param.status"  style="margin-bottom:5px">
      <el-option label="正式员工" value='1'></el-option>
      <el-option label="实习生" value='2'></el-option>
    </el-select> -->

  <!-- </el-form-item> -->
  <el-form-item label="身份">
<el-select v-model="param.status" placeholder="请 选 择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</el-form-item>
  <el-form-item>
    <el-button type="primary" @click=" saveAddgoods()" style="width:100%">保存</el-button>
  </el-form-item>
</el-form>
</el-dialog>
    </div>
</template>
<script>
import request from '../../utils/request';
import bus from '../common/bus';
export default {
    data() {
        return {
            options: [{
          value: '正式员工',
          label: '正式员工'
        }, {
          value: '实习生',
          label: '实习生'
        }, ],
      
             dialogVisible: false,
             param:{},
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 2,
            query: {
                currentPage:1,
                pageSize: 10,
                name:'',
            },
        };
    },
    computed: {
        username() {
            let username = sessionStorage.getItem('ms_username');
            return username ? username : this.name;
        },
    },
     filters: {
        state: function (value) {
            if (value==1) return '正式员工'
            else if (value==2) return '实习生'
           
        }
    },
    methods: {
          getData() {
          var userId = SessionStorage.getItem('userId');
          console.log(userId);
             request({
                      url: '/api/v1/user/detail/'+userId,
                      method: 'get',
                    }).then(res=>{
                        console.log(res.responseData);
                        var zhuangtai=res.responseData.status;
                        if(zhuangtai==1){
                           zhuangtai="正式员工";
                        }
                        else if(zhuangtai==2){
                           zhuangtai="实习生";
                        }
                       
                       this.param=res.responseData;
                       this.param.status=zhuangtai;

            })
           
        },
         saveAddgoods() {
             
             var re = /^1\d{10}$/;
                    let str = this.param.phone;
                    if(re.test(str)){
                         var zhuangtai=this.param.status;
                         if(zhuangtai=='正式员工'){
                           zhuangtai=1;
                         }
                         else if(zhuangtai=='实习生'){
                           zhuangtai=2;
                         }
                         this.param.status=zhuangtai;
                       var info=this.param;
            request({
                      url: '/api/v1/user/update',
                      method: 'post',
                      data:info,
                    }).then(res=>{
               this.$message.success('修改成功,请重新登录！');
               this.dialogVisible = false;
               this.$router.push('/Login');
                    })
                    }
                   else{
                 this.$message.error('请输入11位有效手机号！');
            } 
            
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            var userName=this.name;
            if (command == 'loginout') {
                // localStorage.removeItem('ms_username');
                // this.$router.push('/login');
                  request({
                url: '/api/v1/user/exit',
                method: 'get',
                data:userName,
            }).then(res=>{
                  this.$message.success('安全退出!');
                  localStorage.removeItem('ms_username');
                  this.$router.push('/login');
            })
            }
            else if(command =='revise' ){
                this.getData();
              this.dialogVisible = true;
            }
             
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-shopping-cart-2 {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
