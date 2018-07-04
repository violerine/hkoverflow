<template>
    <div class="postbody">
        <article  class="post">
            <div class="box content">
           
                    <h4>{{post.title}}</h4>
                    
                    <div class="media">
                        <div class="media-left">
                        <router-view name="detail" :postContent="post.content" :postTitle="post.title"></router-view>
                            <!-- <p class="image is-32x32">
                                <img src="http://bulma.io/images/placeholders/128x128.png">
                            </p> -->
                        </div>
                        <div class="media-content">
                            <div v-html="post.content" class="content">
                                <p>
                                    <!-- <a href="#">@jsmith</a> replied 34 minutes ago &nbsp; -->
                                    <!-- <span v-html="post.content" class="tag"></span> -->
                                </p>
                            </div>
                        </div>
                        <div class="media-right">
                                <button v-if="currentUser !== post.userId" @click="addLike(post._id)" type="button" class=" button"><i class="fa fa-thumbs-up" aria-hidden="true">{{post.likes.length}}</i></button>
                                <button  v-if="currentUser !== post.userId" @click="addDislike(post._id)" type="button" class=" button"><i class="fa fa-thumbs-down" aria-hidden="true">{{post.dislikes.length}}</i></button>
                             <router-link :to="{ path: '/detail/'+post._id, params:{ id:post._id}}">
                            <button type="button" class=" button"><i class="fa fa-comments"></i></button>
                            </router-link>
                            <button v-if="currentUser === post.userId" @click="deletePost(post._id)" type="button" class=" button"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
            
            </div>
        </article><br>
    </div>
</template>


<script>

import {mapActions,mapState} from 'vuex'

export default {
    props:['post'],
    data:function(){
        return{
            currentUser:localStorage.getItem('userid')
        }

    },
    methods:{
        ...mapActions([
            'getPosts',
            'getDetails'
        ]),
     
        deletePost(postid){
            var config = {
                headers: {
                    'auth': localStorage.getItem('token')
                } 
            };
            axios.delete(`https://hkoverflow.gladysefirina.website/post/delete/${postid}`,config)
            .then(({data})=>{
                console.log("DATA KALO BERHASIL DELETE",data)
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        addLike(postid){
            console.log("JALAN GA")
             var config = {
                headers: {
                    'auth': localStorage.getItem('token')
                } 
            };
            console.log(config)
            axios.put(`https://hkoverflow.gladysefirina.website/post/addlike/${postid}`,{userid:localStorage.getItem('userid')},config)
            .then(({data})=>{
                console.log("DATA DI ADD LIKE",data)
                this.getPosts()
            })
            .catch(err=>{
                console.log("ERROR DI ADD LIKE",err)
            })
        },
        addDislike(postid){
            console.log("JALAN GA")
             var config = {
                headers: {
                    'auth': localStorage.getItem('token')
                } 
            };
            console.log(config)
            axios.put(`https://hkoverflow.gladysefirina.website/post/addDislike/${postid}`,{userid:localStorage.getItem('userid')},config)
            .then(({data})=>{
                console.log("DATA DI ADD LIKE",data)
                this.getPosts()
                this.getDetails()
            })
            .catch(err=>{
                console.log("ERROR DI ADD LIKE",err)
            })
        }
    }

}
</script>

<style>
h4{
    text-align: left;
}
</style>
