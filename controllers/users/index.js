const signUp = require("./signUp");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const logIn  = require("./logIn");
const getCurrent = require("./getCurrent");
const logOut = require("./logOut");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");



module.exports = {
    signUp,
    verifyEmail,
    resendVerifyEmail,
    logIn,
    getCurrent,
    logOut,
    updateSubscription,
    updateAvatar
};