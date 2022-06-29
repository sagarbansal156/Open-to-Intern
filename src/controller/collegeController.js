const collegeModel = require("../model/collegeModel")
const {isValid}=require("../validator/validator")

const createCollege = async function(req,res){
   try{
     let data = req.body
     if(!isValid(data.name)||(/[a-z]/.test(data.name))==false){
         res.status(400).send("Please enter the name of the college")
     }
     if(isValid(data.fullName)){
         res.status(400).send("Please enter the fullname of the college")
     }
     if(isValid(data.logoLink)){
         res.status(400).send("Please put the logoLink of the college")
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