const Post = require("../models/postModel");

const createPost = async (req, res) => {
	const { text, parentPostId } = req.body;
	console.log('PARENTPOST:',parentPostId)
	const date = Date.now();
	const creator = req.user.id;
	const likes = 0;
	const comments = 0;
	const post = await Post.create({
		text,
		date,
		creator,
		likes,
		comments,
		parentPostId,
	});
	console.log(post);
	if (post) {
		res.status(201).end();
	} else {
		res.status(500).end();
	}
};

const getPosts = async (req, res) => {
	const posts = await Post.find({parentPostId:{$exists:false}}).populate("creator");
	res.status(200).json(posts);
};

const getPost = async (req, res) => {
	const id = req.params.id;
	const post = await Post.findOne({ _id: id }).populate("creator");
	console.log("Der Post:", post);
	res.status(200).json(post);
};

const searchPosts = async (req, res) => {
	const search = req.query.search;
	console.log(search);
	const posts = await Post.find({
		text: { $regex: search, $options: "i" },
	}).populate("creator");
	console.log("das steht in post:", posts);
	res.status(200).json(posts);
};

module.exports = {
	createPost,
	getPosts,
	getPost,
	searchPosts,
};
