const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'))

// contacts route
router.use('/contacts', require('./contacts'))

// default
router.get('/', (req, res, next) => {
    //#swagger.tags=['Hello World']
    res.send('Hello');
}); 


module.exports = router; 