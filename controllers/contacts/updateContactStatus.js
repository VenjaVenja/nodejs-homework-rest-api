const { BadRequest } = require("http-errors")

const {Contact, statusJoiSchema} = require("../../models");

const updateContactStatus = async (req, res, next) => {
    try {
      const {error} = statusJoiSchema.validate(req.body);
      if(error){
        throw new BadRequest(error.message)
      }
      const { contactId } = req.params;
      const { favorite } = req.body;
      const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  module.exports = updateContactStatus;