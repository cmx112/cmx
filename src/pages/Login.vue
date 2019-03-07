<template>
    <div class="view">

        <div class="btn">
            <div class="btn_c" :class="{con:flag}" @click="flag=true">登录</div>
            <div class="btn_c" :class="{con:!flag}" @click="flag=false">注册</div>
        </div>


        <!-- 登录 -->
        <div class="group" v-show="flag">
            <p>
                <input type="text" v-model="login_user" placeholder="用户名">
            </p>
            <p>
                <input type="text" v-model="login_pwd" placeholder="密码">
            </p>
            <div class="con2" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
            
        </div>


        <!-- 注册 -->
        <div class="group" v-show="!flag">
            <p>
                <input type="text" v-model="reg_user" placeholder="用户名">
            </p>
            <p>
                <input type="text" v-model="reg_pwd" placeholder="密码">
            </p>
            
            <div class="con2" @click="reg">注&nbsp;&nbsp;&nbsp;&nbsp;册</div>
            
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            flag:true,
            reg_user:"",
            reg_pwd:"",
            login_user:"",
            login_pwd:""
        }
    },
    methods: {
        login(){
            if(!(/^.{6,12}$/.test(this.login_user))){

                this.$alert("用户名错误","提示",{
                    confirmButtonText:"确定"
                })

                return false;
            }

            if(!(/^\w{6,12}$/.test(this.login_pwd))){

                this.$alert("密码错误","提示",{
                    confirmButtonText:"确定"
                })

                return false
            }

            this.$store.commit("loading_show");

            this.$http.get("/api/login",{
                params:{userName:this.login_user,password:this.login_pwd}
            }).then((res)=>{

                this.$store.commit("loading_hide");

                if(res.data.code){
                    //登陆成功 在vuex内部存储token以便被其他组件访问
                    this.$store.commit("update_token",res.data.token)

                    this.$alert("登陆成功","提示",{
                        confirmButtonText:"确定",
                        callback:()=>{
                            if(this.$route.query.url){
                                this.$router.push(this.$route.query.url)
                            }else{
                                this.$router.push("/")
                            }
                        }
                    })
                }else{

                    this.$alert("抱歉，出错了","提示",{
                        confirmButtonText:"确定"
                    })
                }
            })
        },
        reg(){
            if(!(/^.{6,12}$/.test(this.reg_user))){

                this.$alert("用户名不合法","提示",{
                    confirmButtonText:"确定"
                })

                return false;
            }

            if(!(/^\w{6,12}$/.test(this.reg_pwd))){

                this.$alert("密码不合法","提示",{
                    confirmButtonText:"确定"
                })

                return false
            }

            this.$store.commit("loading_show");

            this.$http.get("/api/register",{
                params:{userName:this.reg_user,password:this.reg_pwd}
            }).then((res)=>{

                this.$store.commit("loading_hide");

                if(res.data.code){
                    //code 为1，证明注册成功，为0表示注册失败
                    

                    this.$alert("注册成功，快去登录吧","提示",{
                        confirmButtonText:"确定",
                        callback:()=>{
                            this.flag=true
                        }
                    })
                }else{

                    this.$alert("抱歉，出错了","提示",{
                        confirmButtonText:"确定"
                    })
                }
            })

        }
    }
}
</script>

<style scoped>
.group .con2{
    width: 300px;
    height: 50px;
    background-color: brown;
    font-size: 16px;
    outline: 0;
    margin: 20px auto;
    line-height: 50px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    user-select: none;
}

.group input{
    width: 500px;
    height: 50px;
    text-indent: 1em;
    border-radius: 10px;
    border: 2px solid #999;
    outline: 0;
}

.group input:focus{
    border: 2px solid brown;
}
.group{
    margin-top: 100px;
}
.group p{

    text-align: center;
    margin-top: 20px;
}
.btn .btn_c{
    width: 400px;
    height: 50px;
    float: left;
    line-height: 50px;
    background-color: #999;
    cursor: pointer;
    color: white;
}
.btn .con{
    background-color: white;
    color: #333333;
}
.btn{
    overflow: hidden;
}
.view{
    width: 800px;
    height: 500px;
    background-color: white;
    margin: 100px auto;
}
</style>
