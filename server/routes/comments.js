var express = require('express');
var router = express.Router();

var {
    newComment,
    deleteComment,
    getCommentByPostId
  }=require('../controllers/comment-controller')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/new',newComment)
router.delete('/delete/:id',deleteComment)
router.get('/:postid',getCommentByPostId)   

module.exports = router;
