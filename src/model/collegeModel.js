const mongoose = require("mongoose")
const collegeSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: [true, "Name is required"],
            trim: true,
            lowerCase: true,
            unique: true
        },
        fullName:{
            type: String,
            require: [true, "Full Name is required"],
            trim: true,
        },
        logoLink:{
            type: String,
            require: [true, "Url is required"]
        },
        isDeleted:{
            type: Boolean,
            default: false
        }, 
        
    }, {timestamps: true}

)
module.exports = mongoose.model("College", collegeSchema)