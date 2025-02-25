const express = require('express');
const router = express.Router();
const { createNewUser } = require('../controllers/userController');
const validateUser = require('../middleware/validateUser');

router.post('/', validateUser, createNewUser);

module.exports = router;