
const express = require('express');
const router = express.Router();
const meetController = require('../controllers/meet');
const middleWare = require('../middleware/middleware');


router.get('/',meetController.index);

router.get('/lists',meetController.lists);
router.get('/registerWin',meetController.registerWin);


// router.post('/registerExc', meetController.registerExc);
router.get('/login',meetController.login);
router.get('/meet',meetController.createRoom); 
router.get('/joinwin', meetController.joinWin);
router.get('/upload', meetController.upload);

router.post('/join',meetController.joinRoom);
router.post('/set',meetController.set);
router.post('/files',meetController.files);

// router.post('/uploadData', middleWare.pictureUpload, meetController.uploadData);
router.post('/recordedVideoUpload', middleWare.recordedVideoUpload, meetController.recordedVideoUpload);

module.exports = router;
