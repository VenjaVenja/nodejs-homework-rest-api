/* eslint-disable new-cap */
const {Conflict, BadRequest} = require("http-errors");
const bcrypt = require("bcryptjs");

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
        const hashPassword = await bcrypt.hash(password, 10)
        const result = await User.create({...req.body, password: hashPassword});
        
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription
            }
        });
      } catch (error) { 
        next(error)
      }
}

module.exports = signUp;