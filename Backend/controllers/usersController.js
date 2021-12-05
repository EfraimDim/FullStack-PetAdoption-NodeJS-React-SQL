
exports.login = (req, res) => {
    try {
        const token = req.token
        res.send(token);

    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }

}

exports.addPublicUser = (req, res) => {
    try {
        const {body} = req;
        users.addUser(new User(body.username, body.email, body.password, body.role)) 
        res.send("Register Succesful!")
    } catch (e) {
        console.log(e)
        res.status(400).send({
            error: e.message
        });
    }
}


