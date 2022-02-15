const express = require("express");
const app = express();
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
	res.json({name:'hokuspokus'})
})
app.listen(PORT, () => {
	console.log("This server runs in port:", PORT);
});
