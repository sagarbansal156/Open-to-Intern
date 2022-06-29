const express = require('express')
const router = express.Router()
const { createCollege } = require("../controller/collegeController")
const { createIntern,getCollegeWithInterns } = require("../controller/internController")

//College Api
router.post("/functionup/colleges", createCollege)


//Intern Api
router.post("/functionup/interns", createIntern)
router.get("/functionup/collegeDetails",getCollegeWithInterns)















module.exports = router