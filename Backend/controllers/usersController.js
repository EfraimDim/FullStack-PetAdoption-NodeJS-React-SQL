const { v4: uuidv4 } = require('uuid');
const {query} = require('../models/queryModel')

exports.login = (req, res) => {
    try {
        const token = req.token
        res.send({token:token, userInfo:req.body.user, message:"Login Success!"});

    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }

}

exports.signUpUser = async(req, res) => {
    try {
        const {email, password, firstName, lastName, phoneNumber, admin} = req.body;
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const userID = uuidv4()
        await query(`INSERT INTO users (user_ID, email, password, first_name, last_name, phone, admin_status, date_created, bio) VALUES ('${userID}', '${email.toLowerCase()}', '${password}', '${firstName}', '${lastName}', ${phoneNumber}, ${admin}, '${date}', '')`)
        res.send("Register Succesful!")
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message 
        });
    }
}


exports.updateUserPassword = async(req, res) => {
    try {
        const {password} = req.body;
        const {userID } = req.decoded
        await query(`UPDATE users SET password = "${password}" WHERE user_ID = "${userID}"`)
        res.send("Updated Password Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }
}

exports.updateUserProfile = async(req, res) => {
    try {
        const {email, firstName, lastName, phoneNumber, bio} = req.body;
        const {userID} = req.decoded
        const updateQuery = await query(`UPDATE users SET email = "${email}", first_name = "${firstName}", last_name = "${lastName}", phone = ${phoneNumber}, bio = "${bio}" WHERE user_ID = "${userID}"`)
        res.send("Updated Profile Succesfully!")
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }
}

exports.getAllPublicUsers = async(req, res) => {
    try {
        const publicUsersArray = await query(`SELECT * FROM users where admin_status = 0`)
        res.send(publicUsersArray)
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }
}

exports.getAllAdminUsers = async(req, res) => {
    try {
        const adminUsersArray = await query(`SELECT * FROM users where admin_status = 1`)
        res.send(adminUsersArray)
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }
}

exports.getViewedUsersPets = async(req, res) => {
    try {
        const {viewedUserID} = req.query
        const viewedUsersPets = await query(`SELECT * FROM pets JOIN adoptedPets on pets.pet_ID = adoptedPets.pet_ID WHERE user_ID = "${viewedUserID}"`)
        res.send(viewedUsersPets)
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }
}



