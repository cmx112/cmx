<template>
    <div class="view">
        <div class="safe">
            <router-link to="/">首页</router-link>
            <!-- 根据登录状态渲染不同内容 -->
            <router-link to="/Login" v-if="!$store.state.token">登录</router-link>
            <span v-if="$store.state.token" @click="logout">退出登录</span>
            <router-link to="/Shopcar">购物车</router-link>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        logout(){
            //退出登录 清楚vuex localStorage 存储的token值
            this.$store.commit("update_token","");

            localStorage.removeItem("token")
        }
    }
}
</script>

<style scoped>

.safe{
    width: 1200px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
}

.safe a{
    padding: 0 20px; 
}
.view{
    background-color: brown;
    margin-top: 0;
    
}
a{
    color: white
}
span{
    cursor: pointer;
    color: white
}
</style>
