<template>
     <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-grey">Register</h3>
                    <p class="subtitle has-text-grey">Please Register to proceed.</p>
                    <div class="box">
                         <img src="../assets/logohk.png">
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="name" class="input is-large" type="text" placeholder="Your Name" autofocus="">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model ="username" class="input is-large" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model ="password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                                </label>
                            </div>
                            <button @click="register" type="button" class="button is-block is-info is-large is-fullwidth">Register</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a><router-link to="/login"> Have an account? Login here!</router-link></a> &nbsp;·&nbsp;
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data:function(){
        return{
            name:'',
            username:'',
            password:''
        }
    },
    methods:{
        register () {
            if(this.name=="" || this.username=="" || this.password==""){
                swal("all field required to be filled")
            }else{
                let body = {
                    name: this.name,
                    username: this.username,
                    password: this.password
                }
                axios.post('https://hkoverflow.gladysefirina.website/register',body)
                .then(user=>{
                    console.log("USERNYA DAPET GA",user)
                    this.$router.push('/login')
                })
                .catch(err=>{
                    swal('username already exists')
                    console.log(err)
                })
            }
          
      }
    }
}
</script>



<style scoped>

.hero.is-success {
  background: #F2F6FA;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
