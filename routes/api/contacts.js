const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require("../../helpers");
const auth = require("../../middlewares/auth")

router.get("/", auth, ctrl.listContacts);
router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));
router.post('/', auth, ctrl.addContact);
router.put('/:contactId', auth, ctrlWrapper(ctrl.updateContact));
router.patch('/:contactId/favorite', auth, ctrlWrapper(ctrl.updateContactStatus));
router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact))

module.exports = router
