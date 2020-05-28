const express = require('express')
const router = express()


router.set('views')
router.set('view engine', 'ejs');

router.get('/',(req,res)=>{
    
    res.render('index')
})


module.exports = router