const { BadRequest } = require("http-errors")

const {Contact, joiSchema} = require("../../models");

const updateContact = async (req, res, next) => {
    try {
      const {error} = joiSchema.validate(req.body);
      if(error){
        throw new BadRequest(error.message)
      }
      const { contactId } = req.params;
      const { body } = req;
      const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  module.exports = updateContact;