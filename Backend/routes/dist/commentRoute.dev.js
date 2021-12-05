"use strict";

var express = require('express');

var router = express.Router();

var commentsController = require('../controllers/commentsController');

var _require = require('../middleware/middleware'),
    authorization = _require.authorization,
    checkCommentLiker = _require.checkCommentLiker,
    checkCommentReporter = _require.checkCommentReporter,
    validateBody = _require.validateBody;

var Schemas = require('../schemas/allSchemas');

router.post('/postComment', validateBody(Schemas.commentSchemaAJV), authorization, commentsController.postComment);
router.post('/likeComment', authorization, checkCommentLiker, commentsController.likeComment);
router.post('/reportComment', authorization, checkCommentReporter, commentsController.reportComment);
router.get('/personalCommentCheck', authorization, commentsController.personalCommentCheck);
router["delete"]('/deleteComment/:commentID&:postID', authorization, commentsController.deleteComment);
module.exports = router;