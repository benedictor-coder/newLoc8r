var express = require('express');
var router = express.Router();

//access the controllers
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

//defining the routes and mapping to specific controllers
/* GET Location pages */
router.get('/', ctrlLocations.mainpage);
router.get('/location-list', ctrlLocations.homelist)
router.get('/location-info', ctrlLocations.locationsInfo);
router.get('/location-review-form', ctrlLocations.addReview);

/* GET Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;