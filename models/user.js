const {Schema, model} = require("mongoose");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const subscriptions = ["starter", "pro", "business"];

const  userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegex
      },
      subscription: {
        type: String,
        enum: subscriptions,
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      },
      avatarURL: {
        type: String,
        required: true
      }
}, 
{versionKey: false, timestamps: true}
);

const joiSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegex).required(),
    subscription: Joi.string()
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptions).required()
})

const User = model("user", userSchema);

module.exports = {
    User, 
    joiSchema,
    subscriptionJoiSchema
};