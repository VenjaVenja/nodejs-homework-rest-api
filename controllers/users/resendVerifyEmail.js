const {User, emailJoiSchema} = require("../../models/user");
const {NotFound, BadRequest} = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async(req, res, next)=>{
try {
    const {error} = emailJoiSchema.validate(req.body);
    if(error){
      throw new BadRequest(error.message)
    }
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
       throw new NotFound();
    }
    if(user.verify){
       throw new BadRequest("Verification has already been passed");
    }
    const mail = {
       to: email,
       subject: "Please confirm your email",
       html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to confirm</a>`
     }
     await sendEmail(mail);
     res.json({
       message:"Verification email sent"
     })
} catch (error) {
    next(error)
}
}

module.exports = resendVerifyEmail;