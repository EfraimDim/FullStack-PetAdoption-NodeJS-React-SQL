const SQL = require('@nearform/sql');
const { v4: uuidv4 } = require('uuid');
const {query} = require('../lib/mysql')

exports.login = (req, res) => {
    try {
        const token = req.token
        res.send({token:token, userInfo:req.body.user, message:"Login Success!"});

    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }

}

exports.signUpUser = async(req, res) => {
    try {
        const {email, password, firstName, lastName, phoneNumber, admin} = req.body;
        const userID = uuidv4()
        await query(SQL `INSERT INTO users (user_ID, email, password, first_name, last_name, phone, admin_status, bio) VALUES (${userID}, ${email.toLowerCase()}, ${password}, ${firstName}, ${lastName}, ${phoneNumber}, ${admin}, '')`)
        if(admin === true){
        const updateNewsFeedAdminUser = await query(`INSERT INTO newsfeed (news) VALUES ("New Admin User! Email: ${email} Name: ${firstName} ${lastName}!")`)}
        else{
        const updateNewsFeedPublicUser = await query(`INSERT INTO newsfeed (news) VALUES ("New Public User! Email: ${email} Name: ${firstName} ${lastName}!")`)}
        res.send("Register Succesful!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}


exports.updateUserPassword = async(req, res) => {
    try {
        const {password} = req.body;
        const { userID } = req.decoded
        await query(SQL `UPDATE users SET password = ${password} WHERE user_ID = ${userID}`)
        res.send("Updated Password Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.updateUserProfile = async(req, res) => {
    try {
        const {email, firstName, lastName, phoneNumber, bio} = req.body;
        const {userID} = req.decoded
        const updateQuery = await query(SQL `UPDATE users SET email = ${email}, first_name = ${firstName}, last_name = ${lastName}, phone = ${phoneNumber}, bio = ${bio} WHERE user_ID = ${userID}`)
        res.send("Updated Profile Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.adminUserNewsfeedArrays = async(req, res) => {
    try {
        const usersArray = await query(SQL `SELECT user_ID, email, first_name, last_name, phone, bio, date_created, admin_status FROM users`)
        const newsfeedArray = await query(SQL `SELECT * FROM newsfeed`)
        const enquiryArray = await query(SQL `SELECT * FROM enquiry`)
        res.send({usersArray: usersArray, newsfeedArray: newsfeedArray, enquiryArray: enquiryArray })
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.getViewedUsersPets = async(req, res) => {
    try {
        const {viewedUserID} = req.query
        const viewedUsersPets = await query(SQL `SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = ${viewedUserID}`)
        res.send(viewedUsersPets)
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.sendEnquiry = async(req, res) => {
    try {
        const {email, firstName, lastName, phone, enquiry} = req.body;
        const { userID } = req.decoded
        const enquiryID = uuidv4()
        const sendEnquiry = await query(SQL `INSERT INTO enquiry (user_ID, enquiry_ID, user_Email, first_name, last_name, phone, enquiry) VALUES (${userID}, ${enquiryID}, ${email}, ${firstName}, ${lastName}, ${phone}, ${enquiry})`)
        const updateNewsFeedAdminUser = await query(`INSERT INTO newsfeed (news) VALUES ("New Enquiry! Email: ${email} Name: ${firstName} ${lastName} has sent an enquiry!")`)
        res.send("Enquiry Sent Succesful!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.enquiryToInProgress = async(req, res) => {
    try {
        const {enquiryID, adminEmail} = req.body;
        const {userID} = req.decoded
        const updateEnquiryQuery = await query(SQL `UPDATE enquiry SET admin_ID = ${userID}, admin_Email = ${adminEmail}, status = "in progress" WHERE enquiry_ID = ${enquiryID}`)
        res.send("Updated Enquiry Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.enquiryToResolved = async(req, res) => {
    try {
        const {enquiryID, adminEmail} = req.body;
        const {userID} = req.decoded
        const updateEnquiryQuery = await query(SQL `UPDATE enquiry SET admin_ID = ${userID}, admin_Email = ${adminEmail}, status = "resolved" WHERE enquiry_ID = ${enquiryID}`)
        res.send("Updated Enquiry Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

exports.enquiryToDelete = async(req, res) => {
    try {
        const {enquiryID} = req.params;
        const deleteEnquiryQuery = await query(SQL `DELETE FROM enquiry WHERE enquiry_ID = ${enquiryID}`)
        res.send("Deleted Enquiry Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}



