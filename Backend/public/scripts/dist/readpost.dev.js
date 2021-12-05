"use strict";

var token = JSON.parse(localStorage.getItem('token'));
var headers = {
  Authorization: "Bearer ".concat(token)
};

function loadPost() {
  var _urlSearchParams, _params, _postID, post;

  return regeneratorRuntime.async(function loadPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _urlSearchParams = new URLSearchParams(window.location.search);
          _params = Object.fromEntries(_urlSearchParams.entries());
          _postID = _params.postID;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get("/posts/getPostToView?postID=".concat(_postID), {
            headers: headers
          }));

        case 6:
          post = _context.sent;
          renderToViewPost(post.data);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function renderToViewPost(post) {
  var commentHtml, checkForYourComment, likedOrDisliked, _likedOrDisliked$data, like, dislike, checkForYourPost, html;

  return regeneratorRuntime.async(function renderToViewPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          commentHtml = '';
          _context3.next = 4;
          return regeneratorRuntime.awrap(axios.get('comments/personalCommentCheck', {
            headers: headers
          }));

        case 4:
          checkForYourComment = _context3.sent;
          post.comments.forEach(function _callee(comment) {
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (checkForYourComment.data === comment.username) {
                      commentHtml += "<div class=\"comment\">\n                    <div class=\"comment__username\">".concat(comment.username, "</div>\n                    <div class=\"comment__comment\">").concat(comment.comment, "</div>\n                    <button class=\"like-button\" onclick=\"likeComment('").concat(comment.commentID, "')\">Like ").concat(comment.likes, "</button>\n                    <button class=\"delete-button\" onclick=\"deleteComment('").concat(comment.commentID, "')\">Delete</button> \n                </div>\n                ");
                    } else {
                      commentHtml += "<div class=\"comment\">\n                <div class=\"comment__username\">".concat(comment.username, "</div>\n                <div class=\"comment__comment\">").concat(comment.comment, "</div>\n                <button class=\"like-button\" onclick=\"likeComment('").concat(comment.commentID, "')\">Like ").concat(comment.likes, "</button>\n                <button class=\"report-button\" onclick=\"reportComment('").concat(comment.commentID, "')\">Report</button> \n            </div>\n            ");
                    }

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          _context3.next = 8;
          return regeneratorRuntime.awrap(axios.post("/posts/postLikesAndDislikes", {
            postID: post.postID
          }, {
            headers: headers
          }));

        case 8:
          likedOrDisliked = _context3.sent;
          _likedOrDisliked$data = likedOrDisliked.data, like = _likedOrDisliked$data.like, dislike = _likedOrDisliked$data.dislike;
          _context3.next = 12;
          return regeneratorRuntime.awrap(axios.get('posts/personalPostCheck', {
            headers: headers
          }));

        case 12:
          checkForYourPost = _context3.sent;
          html = '';

          if (post.edited === true) {
            post.title = "".concat(post.title, " (edited)");
          }

          if (checkForYourPost.data === post.poster) {
            html = "<h2>".concat(post.title, "</h2>\n            <h3><span class=\"italic\">Posted By:</span> ").concat(post.poster, " <span class=\"italic\">On:</span> ").concat(post.date, " <br><span class=\"italic\">Tags:</span> ").concat(post.tags, " <br><span class=\"italic\">Views:</span> ").concat(post.views, "</h3>\n            <div>").concat(post.post, "</div>\n            <div class=\"post--buttons\">\n            <button class=\"like-button\" onclick=\"likePost('").concat(post.postID, "')\">").concat(like, " ").concat(post.likes, "</button> \n            <button class=\"dislike-button\" onclick=\"dislikePost('").concat(post.postID, "')\">").concat(dislike, " ").concat(post.dislikes, "</button>\n            </div>\n            <div class=\"comments-header\">Comments:</div>\n            <div class=\"commentholder\">").concat(commentHtml, "</div>\n            <form onsubmit=\"postComment(event)\">\n            <textarea type=\"text\" name=\"comment\" placeholder=\"comment\" required></textarea><br>\n            <button type=\"submit\">Comment!</button>\n            </form>");
          } else {
            html = "<h2>".concat(post.title, "</h2>\n            <h3><span class=\"italic\">Posted By:</span> ").concat(post.poster, " <span class=\"italic\">On:</span> ").concat(post.date, " <br><span class=\"italic\">Tags:</span> ").concat(post.tags, " <br><span class=\"italic\">Views:</span> ").concat(post.views, "</h3>\n            <div>").concat(post.post, "</div>\n            <div class=\"post--buttons\">\n            <button class=\"like-button\" onclick=\"likePost('").concat(post.postID, "')\">").concat(like, " ").concat(post.likes, "</button> \n            <button class=\"dislike-button\" onclick=\"dislikePost('").concat(post.postID, "')\">").concat(dislike, " ").concat(post.dislikes, "</button>\n            <button class=\"report-button\" onclick=\"reportPost('").concat(post.postID, "')\">Report</button>\n            </div>\n            <div class=\"comments-header\">Comments:</div>\n            <div class=\"commentholder\">").concat(commentHtml, "</div>\n            <form onsubmit=\"postComment(event)\">\n            <textarea type=\"text\" name=\"comment\" placeholder=\"comment\" required></textarea><br>\n            <button type=\"submit\">Comment!</button>\n            </form>");
          }

          document.querySelector(".postholder").innerHTML = html;
          _context3.next = 22;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

function likePost(postID) {
  var post;
  return regeneratorRuntime.async(function likePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios.post('/posts/likePost', {
            postID: postID
          }, {
            headers: headers
          }));

        case 3:
          post = _context4.sent;
          renderToViewPost(post.data);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function dislikePost(postID) {
  var post;
  return regeneratorRuntime.async(function dislikePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(axios.post('/posts/dislikePost', {
            postID: postID
          }, {
            headers: headers
          }));

        case 3:
          post = _context5.sent;
          renderToViewPost(post.data);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function reportPost(postID) {
  return regeneratorRuntime.async(function reportPost$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            swal({
              title: "Are you sure?",
              text: "Report Post!",
              icon: "warning",
              buttons: true,
              dangerMode: true
            }).then(function _callee2(willReport) {
              var post;
              return regeneratorRuntime.async(function _callee2$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!willReport) {
                        _context6.next = 7;
                        break;
                      }

                      _context6.next = 3;
                      return regeneratorRuntime.awrap(axios.post('/posts/reportPost', {
                        postID: postID
                      }, {
                        headers: headers
                      }));

                    case 3:
                      post = _context6.sent;

                      if (post.data === "removed") {
                        swal({
                          title: "Post Deleted!",
                          text: "Post has been reported too many times and has been removed.",
                          icon: "info",
                          button: "back to posts"
                        }).then(function () {
                          window.location.href = "publicposts.html";
                        });
                      } else if (post.data === "you have already reported this post") {
                        swal({
                          title: "Already Reported!",
                          text: "".concat(post.data),
                          icon: "info",
                          button: "back to post"
                        });
                      } else {
                        swal({
                          title: "Reported Succesfully!",
                          icon: "success",
                          button: "back to post"
                        });
                        renderToViewPost(post.data);
                      }

                      _context6.next = 8;
                      break;

                    case 7:
                      swal("Post not reported");

                    case 8:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            });
          } catch (e) {
            console.error(e);
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
}

var urlSearchParams = new URLSearchParams(window.location.search);
var params = Object.fromEntries(urlSearchParams.entries());
var postID = params.postID;

function postComment(event) {
  var comment, _postComment;

  return regeneratorRuntime.async(function postComment$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          event.preventDefault();
          comment = event.target.children.comment.value;
          _context8.next = 5;
          return regeneratorRuntime.awrap(axios.post("/comments/postComment", {
            postID: postID,
            comment: comment
          }, {
            headers: headers
          }));

        case 5:
          _postComment = _context8.sent;
          event.target.reset();

          if (_postComment.data) {
            swal({
              title: "Comment Committed!",
              icon: "success",
              button: "back to post"
            });
            renderToViewPost(_postComment.data);
          } else {
            swal({
              title: "Oops, something went wronng!",
              icon: "error",
              button: "try again"
            });
          }

          _context8.next = 13;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function likeComment(commentID) {
  var post;
  return regeneratorRuntime.async(function likeComment$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(axios.post('/comments/likeComment', {
            postID: postID,
            commentID: commentID
          }, {
            headers: headers
          }));

        case 3:
          post = _context9.sent;
          renderToViewPost(post.data);
          _context9.next = 10;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function reportComment(commentID) {
  return regeneratorRuntime.async(function reportComment$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          try {
            swal({
              title: "Are you sure?",
              text: "Report Post!",
              icon: "warning",
              buttons: true,
              dangerMode: true
            }).then(function _callee3(willReport) {
              var post;
              return regeneratorRuntime.async(function _callee3$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      if (!willReport) {
                        _context10.next = 8;
                        break;
                      }

                      _context10.next = 3;
                      return regeneratorRuntime.awrap(axios.post('/comments/reportComment', {
                        postID: postID,
                        commentID: commentID
                      }, {
                        headers: headers
                      }));

                    case 3:
                      post = _context10.sent;

                      if (post.data === "removed") {
                        swal({
                          title: "Comment Deleted!",
                          text: "Comment has been reported too many times and has been removed.",
                          icon: "info",
                          button: "back to posts"
                        }).then(function () {
                          window.location.href = "publicposts.html";
                        });
                      } else if (post.data === "you have already reported this comment") {
                        swal({
                          title: "Already Reported!",
                          text: "".concat(post.data),
                          icon: "info",
                          button: "back to post"
                        });
                      } else {
                        swal({
                          title: "Reported Succesfully!",
                          icon: "success",
                          button: "back to post"
                        });
                      }

                      renderToViewPost(post.data);
                      _context10.next = 9;
                      break;

                    case 8:
                      swal("Comment not reported");

                    case 9:
                    case "end":
                      return _context10.stop();
                  }
                }
              });
            });
          } catch (e) {
            console.error(e);
          }

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
}

function deleteComment(commentID) {
  var _urlSearchParams2, _params2, _postID2;

  return regeneratorRuntime.async(function deleteComment$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          try {
            _urlSearchParams2 = new URLSearchParams(window.location.search);
            _params2 = Object.fromEntries(_urlSearchParams2.entries());
            _postID2 = _params2.postID;
            swal({
              title: "Are you sure?",
              text: "Comment will be deleted permenatley!",
              icon: "warning",
              buttons: true,
              dangerMode: true
            }).then(function _callee4(willDelete) {
              var posts;
              return regeneratorRuntime.async(function _callee4$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      if (!willDelete) {
                        _context12.next = 8;
                        break;
                      }

                      _context12.next = 3;
                      return regeneratorRuntime.awrap(axios["delete"]("/comments/deleteComment/".concat(commentID, "&").concat(_postID2), {
                        headers: headers
                      }));

                    case 3:
                      posts = _context12.sent;
                      renderToViewPost(posts.data);
                      swal("Poof! Your comment has been deleted!", {
                        icon: "success"
                      });
                      _context12.next = 9;
                      break;

                    case 8:
                      swal("Your comment is safe!");

                    case 9:
                    case "end":
                      return _context12.stop();
                  }
                }
              });
            });
          } catch (error) {
            console.error(error);
          }

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
}

window.addEventListener("load", loadPost);