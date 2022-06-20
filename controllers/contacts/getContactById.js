/* eslint-disable new-cap */
const contacts = require("../../models/contacts");
const createError = require("http-errors");

const getContactById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.getContactById(contactId);
      if (!result) {
        throw new createError(404);
        };
        res.json(result);
      }
      catch (error) {
      next(error)
    }
  }

  module.exports = getContactById;