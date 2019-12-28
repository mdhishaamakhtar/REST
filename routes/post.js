const express=require('express');
const router=express.Router();
const Post=require("../model/Post");

router.get('/', (req,res)=>{
    Post.find({})
		.then(data => {
			res.json(data)
		}).catch(err => {
			res.json({message: err})
		})
});

router.post('/',async(req,res)=>{
  const post=new Post({
    title:req.body.title,
    description:req.body.description
  })
  try{
    const savedPost=await post.save();
    res.json(savedPost);
  }catch(err){
    res.json({message:err});
  }
});
//SPECIFIC POST
router.get('/:postId',async(req,res)=>{
  try{
    const post=await Post.findbyID(req.params.postId);
    res.json(post);
  }catch(err){
    res.json({message:err});
  }
})

//DELETE POST
router.delete('/:postId',async(req,res)=>{
  try{
    const removedPost = await Post.remove({_id: req.params.postId});
    res.json(removedPost);
  }catch(err){
    res.json({message:err});
  }

});

//PATCH POST
router.patch('/:postId',async(req,res)=>{
  try{
    const updatedPost = await Post.updateOne({_id: req.params.postId},{$set:{title:req.body.title,description:req.body.description}});
    res.json(updatedPost);
  }catch(err){
    res.json({message:err});
  }

});

module.exports=router;
