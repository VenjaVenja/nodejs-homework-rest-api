/* eslint-disable no-useless-catch */
const sgMail = require("@sendgrid/mail");

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data)=> {
    const email = {...data, from: "dbnonanswer@gmail.com"};
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
}
module.exports = sendEmail;