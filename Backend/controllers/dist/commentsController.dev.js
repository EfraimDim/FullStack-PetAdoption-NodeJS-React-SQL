"use strict";

var _require = require('../models/classes'),
    users = _require.users,
    allPosts = _require.allPosts,
    Comment = _require.Comment,
    bannedUsers = _require.bannedUsers;

exports.postComment = function (req, res) {
  try {
    var body = req.body;
    var postID = body.postID,
        comment = body.comment;
    var commenterID = req.decoded;
    var commentor = users.findUser(commenterID.userID);
    var post = allPosts.findPost(postID);
    var newComment = new Comment(commentor.username, comment);
    post.comments.push(newComment);
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

exports.likeComment = function (req, res) {
  try {
    var body = req.body;
    var postID = body.postID,
        commentID = body.commentID;
    var likerID = req.decoded;
    var post = allPosts.findPost(postID);
    var comment = post.comments.find(function (comment) {
      return comment.commentID === commentID;
    });
    comment.likes = comment.likes + 1;
    comment.likersID.push(likerID);
    res.send(post);
  } catch (error) {
    console.log(error);
  }
};

exports.reportComment = function (req, res) {
  try {
    var body = req.body;
    var postID = body.postID,
        commentID = body.commentID;
    var reporterID = req.decoded;
    var post = allPosts.findPost(postID);
    var comment = post.comments.find(function (comment) {
      return comment.commentID === commentID;
    });
    comment.reports = comment.reports + 1;
    comment.reportersID.push(reporterID);
    var userReported = users.users.find(function (user) {
      return user.username === comment.username;
    });

    if (comment.reports === 2) {
      post.comments = post.comments.filter(function (comment) {
        return comment.commentID != commentID;
      });
      userReported.strikes = userReported.strikes + 1;

      if (userReported.strikes === 1) {
        bannedUsers.bannedUsers.push(userReported.email);
        users.users = users.users.filter(function (user) {
          return user.username != userReported.username;
        });
      }

      res.send("removed");
    } else {
      res.send(post);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.personalCommentCheck = function (req, res) {
  try {
    var userID = req.decoded;
    var user = users.findUser(userID.userID);
    res.send(user.username);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteComment = function (req, res) {
  try {
    var _req$params = req.params,
        commentID = _req$params.commentID,
        postID = _req$params.postID;
    var post = allPosts.findPost(postID);
    var deletedCommentArray = post.comments.filter(function (comment) {
      return comment.commentID != commentID;
    });
    post.comments = deletedCommentArray;
    res.send(post);
  } catch (e) {
    console.error(e);
  }
};