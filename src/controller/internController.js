const internModel = require("../model/internModel")
const collegeModel = require("../model/collegeModel")
const { validateEmail, isValid, validateMobile, validateName } = require("../validator/validator")

const createIntern = async function (req, res) {
    try {
        let output = {}
        let data = req.body
        if (!isValid(data.name)) {
            return res.status(400).send("Please enter the name of the intern")
        }
        if (!validateName(data.name)) {
            return res.status(400).send("Please enter the name of the intern in english alphabet only")
        }
        if (!isValid(data.email)) {
            return res.status(400).send("Please enter the email of the college")
        }
        if (!validateEmail(data.email)) {
            return res.status(400).send({ status: false, msg: "email is not correct" })
        }
        const checkEmailId = await internModel.findOne({ email: data.email })
        if (checkEmailId) {
            return res.status(409).send({ status: false, msg: "email is already used" })
        }
        if (!isValid(data.mobile)) {
            return res.status(400).send("Please put the Mobile No. of the intern")
        }
        if (!validateMobile(data.mobile)) {
            return res.status(400).send("Please put a valid Mobile No. of the intern")
        }
        const checkMobile = await internModel.findOne({ mobile: data.mobile })
        if (checkMobile) {
            return res.status(409).send({ status: false, msg: "Mobile No. is already used" })
        }
        if (!isValid(data.collegeName)) {
            return res.status(400).send("Please put the collegeId of the intern")
        }
        let collegeIdByName = await collegeModel.findOne({ name: data.collegeName })
        if (!isValid(collegeIdByName)) {
            return res.status(404).send({ status: false, msg: "No College found with the given College name" })
        }
        output.name = data.name
        output.email = data.email
        output.mobile = data.mobile
        output.collegeId = collegeIdByName._id
        let internCreated = await internModel.create(output)
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