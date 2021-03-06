//jshint esversion:8
const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
router.get("/", async (_req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});
//SPECIFIC POST
router.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

//DELETE POST
router.delete("/:postId", async (req, res) => {
    try {
        const removedPost = await Post.findByIdAndDelete(req.params.postId);
        res.json(removedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//PATCH POST
router.patch("/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({_id: req.params.postId}, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});
module.exports = router;