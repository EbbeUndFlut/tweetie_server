const Post = require("../models/postModel");

const createPost =async (req, res) => {
	const { text } = req.body
	console.log('der body:', req.body)
	console.log('der text:', text)
	const date = Date.now()
	const creator = req.user.id
	const likes = 0
	const comments = 0
	const post = await Post.create({
		text,
		date,
		creator,
		likes,
		comments
	})
	console.log(post)
	if(post) {
		res.status(201).end()
	} else{
		res.status(500).end()
	}
};

const getPosts = async (req, res) => {
	const posts =  await Post.find().populate('creator')
	console.log('Was ist in Posts:',posts)
	res.status(200).json(posts)
}
module.exports = {
	createPost,
	getPosts,
};
