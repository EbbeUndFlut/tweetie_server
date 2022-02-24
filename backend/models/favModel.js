const mongoose = require("mongoose");

const favSchema = mongoose.Schema({
	user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
	favorites: [ {type: mongoose.SchemaTypes.ObjectId, ref: "Post" }],
});
module.exports = mongoose.model("Fav",favSchema) 
