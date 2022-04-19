const express = require('express');
const internController = require('../controller/internController');
const router = express.Router();

router.get('/:id', internController.getIntern);


router.route('/signup').post(internController.signUp);

router.route('/login').post(internController.login);

router.route('/').get(internController.getAllInterns);

module.exports = router;