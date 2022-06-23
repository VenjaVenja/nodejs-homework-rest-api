const mongoose = require("mongoose");

const {NotFound} = require("http-errors");

const ctrlWrapper = (ctrl) => {
    const func = async (req, res, next) => {
        try {
            const { contactId } = req.params;
            if(!mongoose.isValidObjectId(contactId)){
                throw new NotFound;
              };
            await ctrl (req, res, next)
        } catch (error) {
            next(error)
        }
    };
    return func;
}

module.exports = ctrlWrapper;