const express = require('express');
const router = express.Router();

const controller = require('../controllers/aggregation.controller');

router.get('/generate-daily-report', controller.generateDailyReport);

router.get('/generate-weekly-report', controller.generateWeeklyReport);

module.exports = router;