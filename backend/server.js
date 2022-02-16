const express = require("express");
require("dotenv").config();
const cookieParser = require('cookie-parser')
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 6969;
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

//Verbindung zur Datenbank herstellen
connectDB();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.status(200).json({ message: "Ist das hier Tweetie oder was?" });
});

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log("Server running on port ", PORT));
