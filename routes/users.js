
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
// const middleWare = require('../middleware/middleware');

router.get('/register',usersController.register);
router.post('/registerExc', usersController.registerExc);

module.exports = router;
