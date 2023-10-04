const Post = require('../model/post')

async function createPost(req,res) {

    const userId = req.body.userId

    try {
        const cpost = await Post.create({
            owner:userId,
            title:'vanakam',
            content:"hello prands are you fine.. im fine "
        })

        const post = await Post.findById(cpost._id).populate("owner", "-password")

        if(!post) return json('something wrong')

        res.status(200).json(post)

    } catch (error) {
    console.error( error);
    res.status(500).json({ errors: error });
}
}

module.exports = {createPost}