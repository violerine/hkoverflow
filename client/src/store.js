import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts:'',
    postsById:'',
    comments:''
  },
  mutations: {
    getAllPosts(state,payload){
      state.posts=payload
    },
    getPostById(state,payload){
      state.postsById=payload
    },
    getComments(state,payload){
      state.comments=payload
    }
  },
  actions: {
    getPosts({commit}){
      axios.get('https://hkoverflow.gladysefirina.website/post/get')
      .then(({data})=>{
        commit('getAllPosts',data)
        console.log("GET ALL POSt",data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getDetails({commit},payload){
      axios.get(`https://hkoverflow.gladysefirina.website/post/getpost/${payload}`)
      .then(({data})=>{
        console.log(data)
        commit('getPostById',data)
      })
      .catch(err=>{
        console.log(err)
      })
    },
  }
})
