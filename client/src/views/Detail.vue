<template>
<div class="detail">
    <Navbar/>
     <section class="container">
			<div class="columns">
				
				<div class="column is-12">
					<div class="box content">
                        <!-- <div class=" box content"> -->
                            <Post :post="detail"/>
                        <!-- </div> -->
                        <div class="column is-10 is-offset-2">
                            <div class="box content">
                                <p v-if="allComments.length==0" >No comment in this post :)</p>
                                <Comment v-for="(comment,index) in allComments" :key="index" :comment="comment" />
                            </div>
                            <wysiwyg v-model="myHTML" />
                            <div class="column is-3 is-offset-9">
					            <button  @click="addComment" type="button" class="button is-primary is-block is-alt is-large">Add Comment</button>
                            </div>
                        </div>
					</div>
				</div>
                
			</div>
		</section>
</div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import Comment from '@/components/Comment.vue'
import {mapActions, mapState} from 'vuex'

export default {
    data:function(){
        return{
            detail:'',
            allComments:'',
            myHTML:'',
            currentUser : localStorage.getItem('userid')
        }
    },
    components:{
        Navbar,
        Post,
        Comment
    },
    created:function(){
       this.detailPost()
       this.getComment()
       this.securePage()
    },
    methods:{
        ...mapActions([
            'getDetails'
        ]),
        securePage(){
            if(this.currentUser===undefined){
                this.$router.push('/login')
            }
        },
        detailPost(){
            var param = this.$route.params.id
               axios.get(`https://hkoverflow.gladysefirina.website/post/getpost/${param}`)
                .then(({data})=>{
                   this.detail=data 
                   console.log("DETAILPOST",data)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        getComment(){
            var param = this.$route.params.id
            axios.get(`https://hkoverflow.gladysefirina.website/comment/${param}`)
                .then(({data})=>{
                   this.allComments=data 
                   console.log("ALL COMMENTS GET COMMENTS",this.allComments)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        addComment(){
            var config = {
                headers: {
                    'auth': localStorage.getItem('token')
                    }
            }
            axios.post("https://hkoverflow.gladysefirina.website/comment/new",{
                userid:localStorage.getItem('userid'),
                postid:this.$route.params.id,
                content:this.myHTML
            },config)
            .then(({data})=>{
                this.getComment()
                this.myHTML=''
                console.log("DATANYA DAPET GA PAS ADD COMMENT",data)
            })
            .catch(err=>{
                alert('masuk error add comment')
                console.log(err)
            })
        },
    },
}
</script>


<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.container .columns {
  margin: 3rem 0;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li{
  padding: 5px;
}
</style>
