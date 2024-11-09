const express = require('express');
const router = express.Router();

// contacts route
router.use('/contacts', require('./contacts'))

// default index
router.get('/', (req, res, next) => {
    res.send('Hello');
}); 


module.exports = router; 