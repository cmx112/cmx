<template>
    <div>

        <h2 class="con1">{{item.title}}</h2>
        <img :src="item.imageUrl" alt="" class="con1">
        <p class="con1">商品买点：{{item.salePoint}}</p>
        <p class="con1">商品价格：{{item.priceStr}}</p>
        <p class="con1">喜欢：{{item.nice}}</p>


        <button @click="add">立即抢购</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            item:{}
        }
    },
    created () {
        this.$store.commit("loading_show");

        this.$http.get("/api/detail",{params:{goodId:this.$route.query.goodId}}).then((res)=>{

            this.item=res.data[0];

            this.$store.commit("loading_hide");
        })
    },

    methods: {
        add(){

            if(this.$store.state.token){

                this.$http.get("/api/add",{
                    params:{
                        goodId:this.$route.query.goodId,
                        token:this.$store.state.token
                    }
                }).then((res)=>{

                    if(res.data.code){
                        this.$alert("成功","添加商品");
                    }else{

                        this.$store.commit("update_token","");
                        localStorage.removeItem("token")

                        this.$alert("添加失败，请先登录","添加商品",{

                            callback:()=>{

                                this.$route.push("/login?url="+this.$route.fullPath)
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
button{
    width: 180px;
    height: 50px;
    border-radius: 10px;
    background-color: brown;
    color: white;
    margin-top: 50px;
    font-size: 20px;
    outline: 0;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
    border: none;
    cursor: pointer;
}

button:active{
    box-shadow: 0 0 0;
    transform: translate(5px,5px)
}
img{
    border-radius: 10px;
}
.con1{
    margin: 20px auto;
}
</style>
