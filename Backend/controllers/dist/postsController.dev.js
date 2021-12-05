"use strict";

var _require = require('../models/searchmodel'),
    searchTitleWithRegExp = _require.searchTitleWithRegExp;

exports.getAllPrivatePosts = function (req, res) {
  try {
    var userID = req.decoded.userID;
    var user = users.findUser(userID);
    res.send(user);
  } catch (e) {
    console.error(e);
  }
};

exports.getPrivatePostToEdit = function (req, res) {
  try {
    var userID = req.decoded.userID;
    var privatePostID = req.query.privatePostID;
    var user = users.findUser(userID);
    var postToEdit = user.posts.find(function (post) {
      return post.privatePostID === privatePostID;
    });
    res.send(postToEdit);
  } catch (e) {
    console.error(e);
  }
};

exports.deletePost = function (req, res) {
  try {
    var postID = req.params.postID;
    var userID = req.decoded.userID;
    var newAllPosts = allPosts.allPosts.filter(function (post) {
      return post.postID != postID;
    });
    allPosts.allPosts = newAllPosts;
    var user = users.findUser(userID);
    user.posts = user.posts.filter(function (post) {
      return post.postID != postID;
    });
    res.send(user);
  } catch (e) {
    console.error(e);
  }
};

exports.searchPostTitle = function (req, res) {
  try {
    var body = req.body;
    var searchTerm = body.searchTerm;
    var searchResults = searchTitleWithRegExp(searchTerm);
    res.send(searchResults);
  } catch (error) {
    console.log(error);
  }
};