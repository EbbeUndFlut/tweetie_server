const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protectRoute = asyncHandler(async (req, res, next) => {
    //Bearer Token
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        
        try{
            //Token vom Header holen
            token = req.headers.authorization.split(" ")[1];
            //Token verifizieren
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error("Unauthorized access attempt.");
        }
    }
        //Wenn kein Token vorhanden?
        if(!token){
            res.status(401);
            throw new Error("Unauthorized access attempt.");
        }
})

module.exports = { protectRoute };