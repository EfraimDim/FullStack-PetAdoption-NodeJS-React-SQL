"use strict";

var express = require('express');

var router = express.Router();

var postsController = require('../controllers/postsController');

var _require = require('../middleware/middleware'),
    authorization = _require.authorization,
    checkPostLiker = _require.checkPostLiker,
    checkPostDisliker = _require.checkPostDisliker,
    checkPostReporter = _require.checkPostReporter,
    checkIfViewed = _require.checkIfViewed,
    authorizeEdit = _require.authorizeEdit,
    authorizeDelete = _require.authorizeDelete,
    validateBody = _require.validateBody;

var Schemas = require('../schemas/allSchemas');

router["delete"]('/deletePost/:postID', authorization, authorizeDelete, postsController.deletePost);
router.get('/getAllPrivatePosts', authorization, postsController.getAllPrivatePosts);
router.get('/getPrivatePostToEdit', authorization, postsController.getPrivatePostToEdit);
router.put('/editPost', validateBody(Schemas.editPostSchemaAJV), authorization, authorizeEdit, postsController.editPost);
router.get('/getAllPosts', postsController.getAllPosts);
router.post('/addPost', validateBody(Schemas.postSubmitSchemaAJV), authorization, postsController.addPost);
router.post('/searchPostTitle', validateBody(Schemas.searchTermSchemaAJV), postsController.searchPostTitle);
router.post('/searchPostUsername', validateBody(Schemas.searchTermSchemaAJV), postsController.searchPostUsername);
router.post('/searchPostTags', validateBody(Schemas.searchTermSchemaAJV), postsController.searchPostTags);
router.post('/searchPostAll', validateBody(Schemas.searchTermSchemaAJV), postsController.searchPostAll);
router.get('/getPostToView', authorization, checkIfViewed, postsController.getPostToView);
router.post('/likePost', authorization, checkPostLiker, postsController.likePost);
router.post('/dislikePost', authorization, checkPostDisliker, postsController.dislikePost);
router.post('/postLikesAndDislikes', authorization, postsController.postLikesAndDislikes);
router.post('/reportPost', authorization, checkPostReporter, postsController.reportPost);
router.get('/personalPostCheck', authorization, postsController.personalPostCheck);
router.get('/getPrivatePostID', authorization, postsController.getPrivatePostID);
module.exports = router;