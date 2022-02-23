const mongoose = require('mongoose')

const favSchema = mongoose.Schema({
	user: {type: mongoose.SchemaTypes.ObjectId, ref:"User"}})
