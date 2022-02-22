const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
	text: {
		type: String,
	},
	date: { type: Date },
	creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
	likes: { type: Number },
	comments: { type: Number },
	parentPostId: { type: String },
});
postSchema.index({text:'text'})
module.exports = mongoose.model("Post", postSchema);
