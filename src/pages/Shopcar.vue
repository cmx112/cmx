<template>
    <div class="view">

        <div class="tip" v-show="!$store.state.token">
            您还没有登录，快去登录吧
            <router-link to="/Login?url=/Shopcar">登录</router-link>
        </div>

        <div v-show="$store.state.token">

            <div v-if="list.length">

                <ul>
                    <li v-for="(x,index) in list">
                        <img :src="x.imageUrl" alt="">
                        <span class="con1">{{x.title}}</span>
                        <span class="con2" @click="del">删除</span>
                    </li>
                </ul>
            </div>
            <div class="tip" v-else>
                您的购物车空空如也，快去抢购商品吧！
                <router-link to="/">首页</router-link>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            list:[]
        }
    },
    created () {
        
        if(this.$store.state.token){

            this.$http.get("/api/shopList",{
                params:{
                    token:this.$store.state.token
                }
            }).then((res)=>{
                this.list=res.data
            })
        }
    },
    methods: {
        del(id,index){
            this.$http.get("api/del",{
                params:{token:this.$store.state.token,goodId:id}
            }).then((res)=>{
                if(res.data.code){
                    this.$alert("删除成功！","提示",{
                        confirmButtonText:"确定",
                    }).then(()=>{
                        this.list.splice(index,1)
                    })
                }else{
                    this.$alert("删除失败，请重试！","提示",{
                        confirmButtonText:"确定",
                    })
                }
            })
        }

    }
}
</script>

<style scoped>
.tip{
    margin-top: 250px;
}
.view{
    width: 1200px;
    margin: 0 auto;
}
li{
    width: 720px;
    height: 150px;
    list-style: none;
    margin: 20px auto;
    text-align: left;
    line-height: 150px;
    position: relative;
    background-color: white;
}
img{
    width: 200px;
    display: inline-block;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%)
}
span{
    display: inline-block;
    width: 200px;
    position: absolute;
}
.con1{
    left: 240px;
}
.con2{
    right: 30px;
    text-align: right;
    cursor: pointer;
    color: brown;
    font-weight: bolder
}
</style>
