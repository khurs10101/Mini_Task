const express= require('express');
const router= express.Router();
const scanController= require('../controllers/scan');

router.get('/query', scanController.scanDB);


module.exports= router;