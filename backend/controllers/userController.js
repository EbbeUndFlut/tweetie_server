const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {generateURL} = require('../config/s3')

const User = require("../models/userModel");

// Neuen User anmelden
// route /api/users/
// nicht geschützt
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password,picurl } = req.body;
	//Felder nicht ausgefüllt?
	console.log(name, email, password, picurl)
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please fill out all fields!");
	}

	//Existiert User bereits?
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	// PW hashen
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Benutzer erstellen
	const user = await User.create({
		name,
		email,
		profilepic: picurl,
		password: hashedPassword,
	});

	if (user) {
		res.status(201)
			.cookie("TweetieToken", generateToken(user._id), {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				path: '/',
			})
			.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				profilepic: user.profilepic,
			});
	} else {
		res.status(400);
		throw new error("Invalid user data!");
	}
});

const getSignedUrl = asyncHandler(async(req, res) => {
	const name = req.query.imgname
	const url = await generateURL(name)
	res.status(200).json({url})
})

// User einloggen
// route /api/users/login
// nicht geschützt
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	//Vergleich von Passwort und gehashtem Passwort mit der compare-Methode von bcryptjs
	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200)
			.cookie("TweetieToken", generateToken(user._id), {
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				path: '/',
			})
			.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				profilepic: user.profilepic
			});
	} else {
		res.status(401);
		throw new Error("Invalid user credentials!");
	}
});

// Derzeitigen User abrufen
// api/users/currentuser
// beschränkter Zugriff

const getCurrentUser = asyncHandler(async (req, res) => {
	const user = {
		id: req.user._id,
		email: req.user.email,
		name: req.user.name,
		profilepic: req.user.profilepic,
	};

	res.status(200).json(user);
});
//Token generieren
const generateToken = (id) => {
	// sign method, id, jwt secret
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getCurrentUser,getSignedUrl };
