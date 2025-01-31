const express = require('express');
const { getFAQs, createFAQ } = require('../controllers/faq.controller.js');

const router = express.Router();

// Routes
router.get('/', getFAQs);
router.post('/', createFAQ);

module.exports = router;