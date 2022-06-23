const {Contact} = require("../../models");

const removeContact = async (req, res, next) => {
      try {
        const { contactId } = req.params;
        await Contact.findByIdAndRemove(contactId);
        res.status(200).json({message: "contact deleted"})
      } catch (error) {
        next(error)
      }
    }
  
    module.exports = removeContact;