const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.get('/', (req,res) => {
	res.json({name:'hokuspokus'})
})
app.listen(PORT, () => {
	console.log("This server runs in port:", PORT);
});
