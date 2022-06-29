const internModel = require("../model/internModel")
const collegeModel = require("../model/collegeModel")
const { validateEmail, isValid, validateMobile } = require("../validator/validator")

const createIntern = async function (req, res) {
    try {
        let data = req.body
        if (!isValid(data.name)) {
            return res.status(400).send("Please enter the name of the intern")
        }
        if (!isValid(data.email)) {
            return res.status(400).send("Please enter the email of the college")
        }
        if (!validateEmail(data.email)) {
            return res.status(400).send({ status: false, msg: "email is not correct" })
        }
        const checkEmailId = await internModel.findOne({ email: data.email })
        if (checkEmailId) {
            return res.status(400).send({ status: false, msg: "email is already used" })
        }
        if (!isValid(data.mobile)) {
            return res.status(400).send("Please put the Mobile No. of the intern")
        }
        if (!validateMobile(data.mobile)) {
           return res.status(400).send("Please put a valid Mobile No. of the intern")
        }
        const checkMobile = await internModel.findOne({ mobile: data.mobile })
        if (checkMobile) {
            return res.status(400).send({ status: false, msg: "Mobile No. is already used" })
        }
        if (!isValid(data.collegeId)) {
            return res.status(400).send("Please put the collegeId of the intern")
        }
        let collegeIdByUser = await collegeModel.findOne({ _id: data.collegeId })
        if (collegeIdByUser == null) {
            return res.status(400).send({ status: false, msg: "No College found with the given CollegeId" })
        }
        let internCreated = await internModel.create(data)
        res.status(201).send({
            status: true,
            data: internCreated
        })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
const getCollegeWithInterns = async function (req, res) {
    try {
        const collegeName = req.query.name
        if (!isValid(collegeName)) return res.status(400).send({
            status: false,
            message: "College name is required!"
        })

        const output = {};

        const collegeData = await collegeModel.findOne({
            name: collegeName,
            isDeleted: false
        })

        if (!collegeData) return res.status(404).send({
            status: false,
            message: `College name related to '${collegeName}'  do not exist!`
        })


        const internsList = await internModel.find({
            collegeId: collegeData._id,
            isDeleted: false
        }).select({
            name: 1,
            email: 1,
            mobile: 1
        })


        output.name = collegeData.name
        output.fullName = collegeData.fullName
        output.logoLink = collegeData.logoLink
        output.interns = internsList

        res.status(200).send({
            status: true,
            data: output
        })

    }
    catch (error) {

        res.status(500).send({
            status: true,
            data: error.message
        })
    }
}








module.exports = { createIntern, getCollegeWithInterns }