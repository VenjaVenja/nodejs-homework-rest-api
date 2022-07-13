/* eslint-disable new-cap */
const {Conflict, BadRequest} = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const {nanoid} = require("nanoid");

const {sendEmail} = require("../../helpers")
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
        const verificationToken = nanoid();
        const avatarURL = gravatar.url(email);
        const hashPassword = await bcrypt.hash(password, 10)
        const result = await User.create({...req.body, verificationToken, avatarURL, password: hashPassword});

        const mail = {
          to: email,
          subject: "Please confirm your email",
          html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm</a>`
        }
        await sendEmail(mail);
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL,
                verificationToken
            }
        });
      } catch (error) { 
        next(error)
      }
}

module.exports = signUp;