const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const documentController = require('../controllers/documentController');

router.post('/documents',authMiddleware,documentController.createDocument);
router.get('/documents',authMiddleware,documentController.getDocuments);
router.get('/documents/:id',authMiddleware,documentController.getDocumentById);
router.put('/documents/:id',authMiddleware,documentController.updateDocument);
module.exports = router;
