<template>
     <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
                    <div class="box">
                            <img src="../assets/logohk.png">
                            <br><br>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" class="input is-large" type="test" placeholder="Your Username" autofocus="" required>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="password" class="input is-large" type="password" placeholder="Your Password" required>
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                </label>
                            </div>
                            <button @click="login" type="button" class="button is-block is-warning is-large is-fullwidth">Login</button><br>
                            <button @click="loginFB" class="button is-block is-info is-large is-fullwidth" type="button">Login with Facebook</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a><router-link to="/register">Dont have an account? Sign Up here!</router-link></a> &nbsp;·&nbsp;
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import firebase from 'firebase/app'
import {firebaseapp} from '../firebase'

export default {
    data:function(){
        return{
            username:'',
            password:'',
            currentUser:localStorage.getItem('userid')
        }
    },
    methods:{
            login(){
                if(this.username==''||this.password==''){
                    swal('Both username and password required ')
                }else{
                console.log("MASUK LOGIN SINI GA")
                axios.post('http://localhost:7000/login',{
                    username :this.username,
                    password :this.password 
                })
                .then(({data})=>{
                    console.log("USER",data)
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('userid',data._id)
                    localStorage.setItem('username',data.username)
                    console.log("NAMANYA DAPET GA ",data.nama)
                    localStorage.setItem('name',data.nama)
                    this.$router.push('/')
                })
                .catch(err=>{
                    if(err.response.data.message=="User not found"){
                        swal('Incorrect username/password')
                    }else{
                        swal('Terjadi kesalahan')
                    }
                })
                }
            },
        register (name,username,password) {
            console.log("NAME",name)
            console.log("USERNAME",username)
            console.log("PASSWORD",password)
            axios.post('http://localhost:7000/register', {
                name:name,
                username:username,
                password:password
            })
            .then(({data})=>{
                console.log("DATA PAS REGISTER",data)
                axios.post('http://localhost:7000/login',{
                                username:username,
                                password:password
                            })
                            .then(({data})=>{
                                console.log("data token",data.token)
                                localStorage.setItem('userid',data._id)
                                localStorage.setItem('username',data.username)
                                localStorage.setItem('token',data.token)
                                window.location.href="/"
                                console.log("USER",user)
                            })
                            .catch(err=>{
                                console.log("ERROR",err)
                            })
                
                // window.location.href='/'
            })
            .catch(err=>{
                console.log('error  : ', err)
            })
        },
        checkUserExists(username,password,name){
            let self=this
            axios.get(`http://localhost:7000/${username}`)
                    .then(({data})=>{
                        console.log("USERNAME DI CHECK USER ",username)
                        console.log("PASSWORD DI CHECK USER",password)
                        if(data.length==0){
                            console.log("MASUK REGISTER")
                            self.register(name,username,password)
                            
                        }
                        else{
                            console.log("MASUK LOGIN ELSE")
                            axios.post('http://localhost:7000/login',{
                                username:username,
                                password:password
                            })
                            .then(({data})=>{
                                console.log("data token",data.token)
                                localStorage.setItem('userid',data._id)
                                localStorage.setItem('username',data.username)
                                localStorage.setItem('token',data.token)
                                window.location.href="/"
                                console.log("USER",user)
                            })
                            .catch(err=>{
                                console.log("ERROR",err)
                            })
                            
                        }
                    })
                    .catch(err=>{
                        console.log(err.response)
                    })
        },
        loginFB(){
            let self = this
            var provider = new firebaseapp.firebase_.auth.FacebookAuthProvider();
            console.log('ini provider', provider);
            firebaseapp.firebase_.auth().signInWithPopup(provider)
                .then(function(result) {
                    let username=result.additionalUserInfo.profile.email
                    let password=result.additionalUserInfo.profile.last_name
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    let name=result.additionalUserInfo.profile.first_name

                    self.checkUserExists(username,password,name)
                    var user = result.user;
                })
                .catch(function(error) {
                    console.log('ini error', error);
                    // Handle Errors here.
                    var errorCode = error.code;
                    console.log(errorCode)
                    var errorMessage = error.message;
                    console.log(errorMessage)
                    // The email of the user's account used.
                    var email = error.email;
                    console.log(email)
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    console.log(credential)
                    // ...
                });
        },
        securePage(){
            if(this.currentUser!==undefined){
                this.$router.push('/')
            }
        },
    
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
