const collegeModel = require("../model/collegeModel")
const {isValid, validateName}=require("../validator/validator")

const createCollege = async function(req,res){
   try{
     let data = req.body
     if(!isValid(data.name)){
         return res.status(400).send({status :false, msg :"Please enter the name of the college"})
     }
     if(!validateName(data.name)){
        return res.status(400).send({status :false, msg :"Please enter the name of the college english alphabet lower case only"})
    }
     if(!isValid(data.fullName)){
         return res.status(400).send({status:false, msg:"Please enter the fullname of the college"})
     }
     if(!isValid(data.logoLink)){
         return res.status(400).send({status:false, msg:"Please put the logoLink of the college"})
     }
    let collegeCreated = await collegeModel.create(data)
    res.status(201).send({status:true,
        data:collegeCreated})
    }

catch (err){
    res.status(500).send({status:false,msg:err.message})
}
}






module.exports={createCollege}





let mailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
let mobileRegex=/^((0091)|(\+91)|0?)[789]{1}\d{9}$/