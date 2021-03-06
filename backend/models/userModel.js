const mongoose = require("mongoose");

//Im schema: Object mit fields.
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please add a name!"],
		},

		email: {
			type: String,
			required: [true, "Please add an email!"],
			unique: true,
		},

		password: {
			type: String,
			required: [true, "Please add a password!"],
		},
		profilepic: {
			type: String,
		},

		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
