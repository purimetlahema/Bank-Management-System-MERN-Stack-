const express = require("express")
 const {getProfile, deposit, withdraw,transfer,listBeneficiaries}  = require("../controllers/bankController")
 const auth = require("../middleware/auth")

 const router = express.Router()

 router.get("/profile",auth,getProfile)
 router.post("/deposit",auth,deposit)
 router.post("/withdraw",auth,withdraw)
 router.post("/transfer",auth,transfer)
 router.get("/beneficiaries",auth,listBeneficiaries)

 module.exports = router;