const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            required: true, 
            lowercase: true,
            trim: true,
            unique: true,
        },
        mobile: {
            type: Number,
            required: true,
            unique: true
        },
        collegeId: {
            type: objectId,
            ref: "College"
        },
        isDeleted: { type: Boolean, default: false }
    },
)
module.exports = mongoose.model("Intern", internSchema)