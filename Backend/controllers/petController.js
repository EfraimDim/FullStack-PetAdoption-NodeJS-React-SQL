const { searchTitleWithRegExp} = require('../models/searchmodel')


exports.getAllPrivatePosts = (req, res) => {
    try {
        const {userID} = req.decoded
        const user = users.findUser(userID)
        res.send(user)
    } catch (e) {
        console.error(e)
    }
}
exports.getPrivatePostToEdit = (req, res) => {
    try {
        const {userID} = req.decoded
        const { privatePostID } = req.query
        const user = users.findUser(userID)
        const postToEdit = user.posts.find(post => post.privatePostID === privatePostID)
        res.send(postToEdit)
    } catch (e) {
        console.error(e)
    }
}

exports.deletePost  = (req, res) => {
    try{
    const { postID } = req.params
    const {userID} = req.decoded
    const newAllPosts = allPosts.allPosts.filter(post => post.postID != postID)
    allPosts.allPosts = newAllPosts
    const user = users.findUser(userID)
    user.posts = user.posts.filter(post => post.postID != postID)
    res.send(user)
}catch (e) {
    console.error(e)
}}

exports.searchPostTitle = (req, res) =>{
    try {
        const {body} = req
        const {searchTerm} = body
        const searchResults = searchTitleWithRegExp(searchTerm)
        res.send(searchResults)
    } catch (error) {
        console.log(error)
    }
}








