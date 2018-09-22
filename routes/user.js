const express = require('express');
const router = express.Router();

const allController = require('../controllers/allController');

const { catchErrors } = require('../errorhandlers');

router.post('/adduser',catchErrors(allController.adduser));
router.post('/userlogin',catchErrors(allController.userlogin));
router.get('/getcities',catchErrors(allController.getcities));
router.post('/adddata',catchErrors(allController.adddata));
router.get('/getallposts',catchErrors(allController.getallposts));
router.get('/addvote/:id',catchErrors(allController.addvote));
router.get('/getmyposts/:id',catchErrors(allController.getmyposts));
module.exports = router;
