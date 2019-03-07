<template>
    <div class="safe">
        <ul>
            <li v-for="x in list">
                <router-link :to="{path:'/Detail',query:{goodId:x.Id}}">
                    <img v-lazy="x.imageUrl" alt="">
                    <h4>{{x.title}}</h4>
                    <p>{{x.priceStr}}</p>
                </router-link>
                
            </li>
        </ul>
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

        this.$store.commit("loading_show");

        this.$http.get("/api/goodlist").then((res)=>{

            this.list=res.data;
            this.$store.commit("loading_hide");

        })
    },
    
    directives: {
        lazy:{

            inserted(el,binding){
                var fn=(e)=>{

                    var st=document.body.scrollTop||document.documentElement.scrollTop;
                    var ot=el.offsetTop;
                    var h=window.innerHeight;

                    if(ot<st+h-300){
                        el.style.backcground="none";
                        el.src=binding.value;

                        window.removeEventListener("scroll",fn)
                    }

                }
                fn();
                window.addEventListener("scroll",fn)
            }
        }
    }
}
</script>

<style scoped>
.safe{
    width: 1200px;
    margin: 0 auto;
}

li{
    list-style: none;
    width: 550px;
    margin: 15px;
    padding: 10px;
    background-color: white;
    float: left;
    transition: all 0.5s;
}
li:hover{
    transform: translateY(-10px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6)
}
ul{
    overflow: hidden;
}
li a{
    display: block;
    width: 100%;
    color: #333333
}
img{
    display: block;
    width: 550px;
    height: 282px;
    background: url("../assets/images/lazyload.gif") no-repeat center center
}
h4,p{
    margin: 10px;
}
</style>

