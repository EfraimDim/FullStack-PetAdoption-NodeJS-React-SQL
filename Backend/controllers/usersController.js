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
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const userID = uuidv4()
        await query(SQL `INSERT INTO users (user_ID, email, password, first_name, last_name, phone, admin_status, date_created, bio) VALUES (${userID}, ${email.toLowerCase()}, ${password}, ${firstName}, ${lastName}, ${phoneNumber}, ${admin}, ${date}, '')`)
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
        res.send({usersArray: usersArray, newsfeedArray: newsfeedArray})
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



