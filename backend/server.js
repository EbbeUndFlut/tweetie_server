const express = require("express");
const dotenv = require ("dotenv").config();
const {errorHandler} = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 6969;
const connectDB = require("./config/db");
const app = express();
const cors = require('cors')

//Verbindung zur Datenbank herstellen
connectDB()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.status(200).json({message: "Welcome to Tweetie!"});
});

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log("Server running on port ", PORT));
