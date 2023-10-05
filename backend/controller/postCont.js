const Post = require('../model/post')

async function createPost(req,res) {

    const userId = req.body.userId
    const title = req.body.title 
    const content = req.body.content 

    try {
        const cpost = await Post.create({
            owner:userId,
            title:title,
            content:content
        })

        const post = await Post.findById(cpost._id).populate("owner", "name pimg")

        if(!post) return json({error:'something wrong'})

        res.status(200).json(post)

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function getPosts(req,res) {
    try {
        
        const posts = await Post.find().populate("owner", "name pimg")

        if(posts) res.status(200).json({posts:posts})
        else res.status(400).json({error:'something wrong'})
    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function like(req,res) {
    
    const postId = req.params.id 

    try {
        const post = await Post.findById(postId)

        if(!post){
            res.status(400).json({error:'postid undifined'})
            return
        }

        const curLikes = post.likes 

        const updatePost = await Post.findByIdAndUpdate(
            post._id,
            {
                $set:{
                    likes:curLikes + 1
                }
            },
            {
                new :true
            })
        
        if(updatePost){
            res.status(200).json({ post: updatePost })
        }
        else{
            res.status(400).json({error:"something wrong"})
        }

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function dislike(req,res) {
        const postId = req.params.id 

    try {
        const post = await Post.findById(postId)

        if(!post){
            res.status(400).json({error:'postid undifined'})
            return
        }

        const curLikes = post.likes 

        const updatePost = await Post.findByIdAndUpdate(
            post._id,
            {
                $set:{
                    likes:curLikes >= 1 ? curLikes -1  : 0
                }
            },
            {
                new: true
            })
        
        if(updatePost){
            res.status(200).json({ post: updatePost })
        }
        else{
            res.status(400).json({error:"something wrong"})
        }

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

async function save(req,res) {
    const postId = req.params.id 

    try {
        const post = await Post.findById(postId)

        if(!post){
            res.status(400).json*{error:'postid undifined'}
            return
        }

        const saved = post.isSaved 

        const updatePost = await Post.findByIdAndUpdate(
            post._id,
            {
                $set:{
                    isSaved: !saved
                }
            },
            {
                new: true
            })
        
        if(updatePost){
            res.status(200).json({ post: updatePost })
        }
        else{
            res.status(400).json({error:"something wrong"})
        }

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

module.exports = {createPost,getPosts,like,dislike,save}