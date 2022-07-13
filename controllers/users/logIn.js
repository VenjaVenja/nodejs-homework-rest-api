/* eslint-disable new-cap */
const {BadRequest, Unauthorized, NotFound} = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {User, joiSchema} = require("../../models/user");
const {SECRET_KEY} = process.env;

const logIn = async (req, res, next) => {
 try {
    const {error} = joiSchema.validate(req.body);
    if(error){
      throw new BadRequest(error.message)
    }
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      throw new Unauthorized("Email or password is wrong")
  }
    const passCompare = await bcrypt.compare(password, user.password)
    if(!passCompare){
        throw new Unauthorized("Email or password is wrong")
    } 
    if(!user.verify){
      throw new NotFound("User not verify")
    }
    const payload ={
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token
    })
}
 catch (error) {
    next(error)
  }
}
module.exports = logIn;