/* eslint-disable new-cap */
const createError = require("http-errors");

const contacts = require("../../models/contacts");

const {validationSchema} = require("../../schemas/contacts")

const addContact = async (req, res, next) => {
    try {
      const {error} = validationSchema.validate(req.body);
      if(error){
        throw new createError(400, error.message)
      }
      const {body} = req;
      const result = await contacts.addContact(body);
      res.status(201).json(result);
    } catch (error) {
      next(error)
    }
  }

  module.exports = addContact;