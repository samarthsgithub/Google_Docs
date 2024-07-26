const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const linkController = require('../controllers/linkController');
const { estimatedDocumentCount } = require('../models/User');
const documentController = require('../controllers/documentController');


router.post('/documents/:id/share',authMiddleware,linkController.generateShareableLink);
router.get('/documents/:id/:access_type/:token',linkController.getDocumentByShareableLink);
router.put('/documents/:id/:token',documentController.updateDocument);
module.exports = router;