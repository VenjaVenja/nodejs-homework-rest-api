const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require("../../helpers");

router.get("/", ctrl.listContacts);
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));
router.post('/', ctrl.addContact);
router.put('/:contactId', ctrlWrapper(ctrl.updateContact));
router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateContactStatus));
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

module.exports = router
