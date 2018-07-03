<template>
  <div class="home">
    <Navbar/>
    <!-- <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->

      <section class="container">
			<div class="columns">
				<div class="column is-3">
					<a @click="activateModal" class="button is-primary is-block is-alt is-large" href="#">New Post</a>
				</div>
				<div class="column is-9">
					<div class="box content">
            <Post v-for="(post,index ) in posts " :key="index" :post="post" >
            </Post>
					</div>
				</div>
			</div>
		</section>

<!--Modal-->

 <div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <div class="control">
          Title : 
          <input v-model="title" class="input is-info" type="text" placeholder="Title">
        </div>
      </div>
      <div class="field">
        <div class="control">
          Content : 
          <wysiwyg v-model="myHTML" />
          <!-- <textarea v-model="content" class="textarea" placeholder="e.g. Hello world"></textarea> -->
        </div>
      </div>
      <p>aaaaaa</p>
    </section>
    <footer class="modal-card-foot">
      <button @click="newPost" class="button is-success">Create Post</button>
      <button @click="closeModal" class="button">Cancel</button>
    </footer>
  </div>
</div>


    <!--MODAL END-->


</div>


</template>

<script>
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import { mapState,mapActions} from 'vuex'

export default {
  props: ['id'],
  name: 'home',
  data:function(){
    return{
      title:'',
      myHTML:'',
      currentUser:localStorage.getItem('userid')
    }
  },
  created:function(){
    this.getPosts()
    this.securePage()
  },
  components: {
    HelloWorld,
    Navbar,
    Post
  },
  computed:{
    ...mapState([
      'posts'
    ])
  },
  methods:{
    ...mapActions([
      'getPosts'
    ]),
     securePage(){
    console.log("ADA ISINYA GA CURRENTUSER", this.currentUser )
          if(this.currentUser===null){
            
              this.$router.push('/login')
          }
      },
      newPost(){
        console.log("MASUK GA KLO DI KLIK")
         var config = {
           headers: {
            'auth': localStorage.getItem('token')
          } 
        };
        console.log("KE SET GA ",localStorage.getItem('userid'))
        axios.post('http://localhost:7000/post/add',{
          title:this.title,
          userid:localStorage.getItem('userid'),
          content:this.myHTML
        },config)
        .then(({data})=>{
          console.log("MASUK SINI GA?")
          console.log(data)
          this.myHTML=''
          this.title=''
          this.getPosts()
          this.closeModal()
        })
        .catch(err=>{
          console.log(err)
        })
      },
      activateModal(){
        $(".modal").addClass("is-active")
      },
      closeModal(){
        $(".modal").removeClass("is-active")
      },
  }
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