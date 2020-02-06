<template>
    <div class="page">
        <div class="header-desc">
            <span class="desc-inner">江西省水利科学研究院 | 江西省水利厅机关办公用品管理系统</span>
        </div>
        <el-row class="login-wrap">
            <el-col :span="12" class="login-left">
                <img src="../../../assets/img/left.png" alt="">
            </el-col>
            <el-col :span="12" class="login-right">
                <div class="sys-desc">
                    用户注册
                </div>
    <el-form :model="param" :rules="rules" ref="login" label-width="85px" class="demo-ruleForm">
        <el-form-item label="用户名" class="label" prop="userName">
       <el-input v-model="param.userName" style="margin-bottom:5px;"></el-input>
    </el-form-item>
    <el-form-item label="部门名称" prop="department">
      <el-input v-model="param.department" style="margin-bottom:5px"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="param.phone" style="margin-bottom:5px"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="param.password" style="margin-bottom:5px"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm">
      <el-input v-model="param.confirm" style="margin-bottom:5px"></el-input>
    </el-form-item>
    <el-form-item label="身份" prop="status">
      <el-select v-model="param.status"  style="margin-bottom:5px">
        <el-option label="正式员工" value='1'></el-option>
        <el-option label="实习生" value='2'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
                          <el-button size="medium" class="login-btn" type="primary" @click=" saveAddgoods()">注册</el-button>
                      </el-form-item>
                    
                      <div class="tip-desc">
                          <el-link type="primary" :underline="false"  class="zhuce" @click="login()">返 回 登 录</el-link>
                          <br> <span style="font-weight:bold;">Tip</span>：IE9以上，360切换极速模式，最佳分辨率:1920×1080
                      </div>
                  </el-form>
            </el-col>
        </el-row>
        <div class="copy-right">
            Copyright 2019 by 江西省水利科学研究院 | 江西鄱水信息科技有限公司提供技术支持
        </div>
    </div>
</template>

<script>
import request from '../../../utils/request';
    export default {
        data: function() {
            return {
                activeName: 'second',
                code: '1234',
                param: {
                     userName:'',
                       department:'',
                       phone:'',
                       password:'',
                       confirm: '',
                       status: '',
                },
                rules: {
                    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                department: [{ required: true, message: '请输入部门名', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirm: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                status: [{ required: true, message: '请选择身份', trigger: 'blur' }],
                  
                }
            }
        },
        methods: {
             saveAddgoods() {
            let addgoodform=this.param;
            let password=this.param.password;
            let confirm=this.param.confirm;
             this.$refs.login.validate(valid => {
                if (valid) { 
                    let re = /^1\d{10}$/;
                    let str = this.param.phone;
                    let   mima =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;

                    if(re.test(str)){//手机号验证成功
                      if(mima.test(password)){//密码验证成功
                          if(password!=confirm){//确认密码失败
                             this.$message.error('确认密码和输入密码不一致，请重新输入！');
                            }
                    else if(password==confirm){//确认密码成功
                      
                      request({
                      url: '/api/v1/user/register',
                      method: 'post',
                      data: addgoodform,
                    }).then(res=>{
                   this.$message.success('注册成功,请登录！');
                   sessionStorage.setItem('ms_username',this.param.userName);
                   this.$router.push('/login');
                   })
               } 
              }
              else{
                 this.$message.error('密码至少包含大写字母，小写字母，数字，且不少于8位！');
              }
             }

              else{//手机号验证失败
                this.$message.error('请输入11位有效手机号！');
              }
               } 
              
                else {
                    this.$message.error('请填写完整信息！');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login(){
                    sessionStorage.setItem('ms_username',this.param.userName);
                    this.$router.push('/login');
        }
        },
    }
</script>
<style>
    .login-wrap .el-input__inner {
        border-top: none!important;
        border-left: none!important;
        border-right: none!important;
        border-radius: 0;
    }
</style>

<style scoped>
    .header-desc {
        color: #fff;
        background: url(../../../assets/img/logo.png) no-repeat 0 center;
        margin-left: 260px;
        height: 125px;
        line-height: 125px;
        padding-left: 106px;
        background-size: 80px;
        font-size: 26px;
    }
    .tip-desc {
        padding-top: 16px;
        padding-left: 20px;
        font-size: 12px;
        text-align: center;
    }
    .copy-right {
        position: fixed;
        bottom: 20px;
        color: #fff;
        width: 100%;
        text-align: center;
    }
    .login-btn {
        width: 324px;
        margin: 20px 0 0 55px;
        border-radius: 16px;
    }
    .code-center {
        /* background:#f0f6ff; */
        height: 100%;
        text-align: center;
        line-height: 38px;
        margin-left: 4px;
    }
    .code-right {
        padding-left: 20px;
        height: 100%;
        line-height: 38px;
        cursor: pointer;
        color: #267bef;
    }
    .sys-desc {
        color: #2b7eff;
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        line-height: 66px;
    }
    .login-right {
        border-radius: 10px;
        width: 500px;
        background: #fff;
        height: 528px;
    }
    .login-left img {
        height: 418px;
        margin: 0 auto;
        display: block;
    }
    .login-left {
        background: #267bef;
    }
    .page {
        padding-top: 50px;
        box-sizing: border-box;
        height: 100%;
        background: #267bef;
        background-size: cover;
    }
    .login-wrap {
        position: relative;
        width: 1260px;
        margin: 0 auto;
        background-size: cover;
        background: #267bef;
    }
    .login-btn {
        text-align: center;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
    .demo-ruleForm {
        padding-right: 40px;
    }
</style>
