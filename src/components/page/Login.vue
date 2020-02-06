<template>
    <div class="page">
        <div class="header-desc">
            <span class="desc-inner">江西省水利科学研究院 | 江西省水利厅机关办公用品管理系统</span>
        </div>
        <el-row class="login-wrap">
            <el-col :span="12" class="login-left">
                <img src="../../assets/img/left.png" alt="">
            </el-col>
            <el-col :span="12" class="login-right">
                <div class="sys-desc">
                    用户登录
                </div>
                <el-form :model="ruleForm" :rules="rules" ref="login" label-width="50px" class="demo-ruleForm">
                    <el-form-item label="" prop="userName">
                        <el-input prefix-icon="el-icon-user-solid" size="large" placeholder="请输入账号" v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input prefix-icon="el-icon-unlock" size="large" type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                     <el-form-item prop="text"></el-form-item>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="" prop="code">
                                <el-input prefix-icon="el-icon-date" size="large" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" class="code-center">
                            <identify :identifyCode="code"></identify>
                        </el-col>
                        <el-col :span="4" class="code-right">
                            <div @click="code = getCode()">
                                换一张
                            </div>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button size="medium" class="login-btn" type="primary" @click="submitForm()">登录</el-button>
                    </el-form-item>
                   
                    <div class="tip-desc">
                        <el-link type="primary" :underline="false"  @click="register()" class="zhuce">没有账号？注册一个</el-link>
                        <br> <span style="font-weight:bold;">Tip</span>：IE9以上，360切换极速模式，最佳分辨率:1920×1080
                    </div>
                    
                    <!-- <el-form-item label="记住用户名：" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item> -->
                </el-form>
            </el-col>
        </el-row>
        <div class="copy-right">
            Copyright 2019 by 江西省水利科学研究院 | 江西鄱水信息科技有限公司提供技术支持
        </div>
    </div>
</template>

<script>
import request from '../../utils/request';
    import identify from '../common/identify'
    export default {
        components: {
            identify
        },
        data: function() {
            var validateCode = (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请输入验证码'));
              } else if (value != this.code) {
                callback(new Error('验证码有误'));
              } else {
                callback();
              }
            };
            return {
                activeName: 'second',
                code: '',
                ruleForm: {
                    userName: '',
                    password: '',
                },
                rules: {
                    userName: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    code:[{
                        required: true,
                        validator: validateCode,
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            submitForm() {
                var userinfo=this.ruleForm;
             
                this.$refs.login.validate((valid) => {
                    if (valid) {
                      request({
                url: '/api/v1/user/login',
                method: 'post',
                data:userinfo,
            }).then(res=>{
                 var isSuccess =  res.code;
                 var info=res.responseData;
                //  console.log(info)
                //  console.log(isSuccess)

                if(isSuccess==3){
                 var userName=res.responseData.userName;
                var userId=res.responseData.userId;
                var rank=res.responseData.rank;
                localStorage.setItem('ms_username',userName);
                localStorage.setItem('userId',userId);
                sessionStorage.setItem('ms_username',userName);
                sessionStorage.setItem('userId',userId);
                sessionStorage.setItem('rank',rank);
                this.$message.success('登录成功');
                   //路由角色控制
                    let re='/'
                    if(sessionStorage.getItem('rank')){
                        let rank=sessionStorage.getItem('rank');
                        re='/'
                        if(rank==1||rank==2)
                        {
                        re='/goodslist'
                        }else if (rank==3){re='/admin'}
                    }
                    else {
                        re='/'
                    }
                    this.$router.push(re);
                    }
                 else if(isSuccess==4){
                this.$message.error('用户名或密码错误！');
                 }
            }) 
                } else if(this.ruleForm.userName=="") {
                    this.$message.error('请输入账号');
                    console.log('error submit!!');
                    return false;
                
                }
                else if(this.ruleForm.password=="") {
                    this.$message.error('请输入密码');
                    console.log('error submit!!');
                    return false;
                
                }
            });
            },
            getCode() {
                let out = ''
                do
                    out = Math.floor(Math.random() * 10000);
                while (out < 1000)
                return out.toString()
            },
              register(){
                  sessionStorage.setItem('ms_username',this.ruleForm.text);
                    this.$refs.login.resetFields();
                    this.$router.push('/register');
            } 
        },
        mounted(){
            this.code = this.getCode()
        }
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
        background: url(../../assets/img/logo.png) no-repeat 0 center;
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
        line-height: 106px;
    }
    .login-right {
        border-radius: 10px;
        width: 500px;
        background: #fff;
        height: 428px;
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
        padding-top: 100px;
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