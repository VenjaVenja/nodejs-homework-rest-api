/* eslint-disable new-cap */
const createError = require("http-errors");

const {Contact, joiSchema} = require("../../models");

const addContact = async (req, res, next) => {
      try {
        const {error} = joiSchema.validate(req.body);
        if(error){
          throw new createError(400, error.message)
        }
        const {body} = req;
        const result = await Contact.create(body);
        res.status(201).json(result);
      } catch (error) {
        next(error)
      }
    }
  
    module.exports = addContact;