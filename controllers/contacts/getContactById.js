const {Contact} = require("../../models");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
      res.json(result);
    }
    catch (error) {
    next(error)
  }
}

module.exports = getContactById;