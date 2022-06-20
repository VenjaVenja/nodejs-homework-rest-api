/* eslint-disable new-cap */
const createError = require("http-errors");

const contacts = require("../../models/contacts");

const {validationSchema} = require("../../schemas/contacts")

const updateContact = async (req, res, next) => {
    try {
      const {error} = validationSchema.validate(req.body);
      if(error){
        throw new createError(400, error.message)
      }
      const { contactId } = req.params;
      const {body} = req;
      const result = await contacts.updateContact(contactId, body);
      if(!result){
        throw new createError(404)
      }
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  module.exports = updateContact;