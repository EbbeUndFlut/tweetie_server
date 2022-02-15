const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
	text : {
		type: String},
	date: { type: Date},
	creator: { type: String},
	likes: {type: Number},
	comments: {type: Number},
	parentPostId: {type: String}
})
