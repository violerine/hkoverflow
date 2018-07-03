var express = require('express');
var router = express.Router();
var {authenticate} = require ('../controllers/auth')

var {addDislike,removeDislike,getPostById,addNewPost,getAllPosts,getPostByUserId,deletePost,addLike,removeLike} =require ('../controllers/post-controller')


router.post('/add',authenticate,addNewPost )
router.get('/get',getAllPosts )
router.get('/:id',authenticate,getPostByUserId)
router.delete('/delete/:id',authenticate,deletePost)
router.put('/addlike/:id',authenticate,addLike,removeLike)
router.put('/removelike/:id',authenticate,removeLike)
router.put('/addDislike/:id',authenticate,addDislike,removeDislike)
router.put('/removeDislike/:id',authenticate,removeDislike )
router.get('/getpost/:id',getPostById)
module.exports = router;
