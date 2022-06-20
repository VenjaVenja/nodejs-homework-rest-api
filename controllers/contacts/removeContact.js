/* eslint-disable new-cap */
const createError = require("http-errors");
const contacts = require("../../models/contacts");

const removeContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result){
        throw new createError(404)
      }
      res.status(200).json({message: "contact deleted"})
    } catch (error) {
      next(error)
    }
  }

  module.exports = removeContact;