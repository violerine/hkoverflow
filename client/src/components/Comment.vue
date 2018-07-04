<template>
    <div class="postbody">
        <article  class="post">
            <div class="box content">
                    <h4>@{{comment.userId.nama}}</h4>
                    <div class="media">
                        <div class="media-left">
                            <p class="image is-32x32">
                                <img src="../assets/hkhead.png">
                            </p>
                        </div>
                        <div class="media-content">
                            <div v-html="comment.comment_content" class="content">
                                <p></p>
                            </div>
                            <!-- <div class="column is-8 is-offset-10">
                                <button v-if="comment.userId!==currentUser" type="button" @click="deleteComment(comment._id)" class="has-text-grey-light button"><i class="fa fa-trash"></i></button>
                            </div> -->
                        </div>
                        <div class="media-right">
                           <!-- {{comment.userId._id}} and {{currentUser}} -->
                            <button v-if="comment.userId._id===currentUser" type="button" @click="deleteComment(comment._id)" class="button"><i class="fa fa-trash"></i></button>
                        </div>
                    </div>
            </div>
        </article><br>
    </div>
</template>

<script>

import {mapActions,mapState} from 'vuex'

export default {
    props:['comment'],
    data:function(){
        return{
            currentUser:localStorage.getItem('userid')
        }
    },
    methods:{
        ...mapActions([
           'getDetails'
        ]),
        deleteComment(postid){
            console.log("KETRIGGER GA")
            let params = this.$route.params.id
            console.log("params",params)
            axios.delete(`https://hkoverflow.gladysefirina.website/comment/delete/${postid}`)
            .then(({data})=>{
                console.log("DATA DELETE COMMENT",data)
                window.location.reload()
                this.getDetails()
            })
            .catch(err=>{
                console.log(err)
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
