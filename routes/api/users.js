const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload")

const ctrl = require("../../controllers/users")

router.post("/signup", ctrl.signUp);
router.post("/login", ctrl.logIn);
router.get("/logout", auth, ctrl.logOut);
router.get("/current", auth, ctrl.getCurrent);

router.patch("/", auth, ctrl.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);


module.exports = router;