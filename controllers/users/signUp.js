/* eslint-disable new-cap */
const {Conflict, BadRequest} = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const {User, joiSchema} = require("../../models/user");

const signUp = async(req, res, next)=>{
    try {
        const {error} = joiSchema.validate(req.body);
        if(error){
          throw new BadRequest(error.message)
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Conflict("Email in use")
        }
        const avatarURL = gravatar.url(email);
        const hashPassword = await bcrypt.hash(password, 10)
        const result = await User.create({...req.body, avatarURL, password: hashPassword});
        
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL
            }
        });
      } catch (error) { 
        next(error)
      }
}

module.exports = signUp;