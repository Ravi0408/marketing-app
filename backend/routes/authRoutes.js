const express = require('express');
const { register, login,} = require('../controllers/authController');
const {addCampaign, getCampaigns, updateCampaign}=require('../controllers/campaignController');

const router = express.Router();
router.get("/check",(req,res)=>{
    res.status(200).json({
        status:"ok",
        msg:"Dont Worry it is running!!",
        serverPort:"4000"
    })
    })
//Authentication
router.post('/register', register);
router.post('/login', login);

router.post('/addcampaign', addCampaign);
router.get('/getcampaign/:page', getCampaigns);
router.post('/updatecampaign/:id', updateCampaign);


module.exports = router;
