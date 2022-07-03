const { BadRequest } = require("http-errors")

const {User, subscriptionJoiSchema} = require("../../models/user");

const updateSubscription = async (req, res, next) => {
    try {
      const {error} = subscriptionJoiSchema.validate(req.body);
      if(error){
        throw new BadRequest(error.message)
      }
      // const { contactId } = req.params;
      const {_id} = req.user;
      const { subscription } = req.body;
      // await User.findByIdAndUpdate(_id, {token: null});

      const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
      res.status(200).json(
       {
        message: "subscription updated",
        subscription: result.subscription
      }
      );
    } catch (error) {
      next(error)
    }
  }

  module.exports = updateSubscription;