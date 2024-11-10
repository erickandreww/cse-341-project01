const express = require('express');
const router = express.Router();

// contacts controller require
const contactsController = require('../controller/contacts')

// contacts CRUD
router.get('/', contactsController.getAllContacts);

router.get('/:id', contactsController.getContact);

router.post('/', contactsController.addContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);


module.exports = router;