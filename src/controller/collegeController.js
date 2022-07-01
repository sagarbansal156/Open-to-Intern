const collegeModel = require("../model/collegeModel")
const {isValid, validateName,validatename}=require("../validator/validator")

const createCollege = async function(req,res){
   try{
     let data = req.body
     if (!isValid(data)) {
        return res.status(400).send({ status: false, msg: "Please enter the data of the college" })
    }
     if(!isValid(data.name)){
         return res.status(400).send({status :false, msg :"Please enter the name of the college"})
     }
     if(!validatename(data.name)){
        return res.status(400).send({status :false, msg :"Please enter the name of the college english alphabet lower case only"})
    }
    const checkName = await collegeModel.findOne({ name: data.name })
        if (checkName) {
            return res.status(409).send({ status: false, msg: "name is already used" })
        }
     if(!isValid(data.fullName)){
         return res.status(400).send({status:false, msg:"Please enter the fullname of the college"})
     }
     if(!validateName(data.fullName)){
        return res.status(400).send({status:false, msg:"Please enter the fullname of the college in english alphabet only"})
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





