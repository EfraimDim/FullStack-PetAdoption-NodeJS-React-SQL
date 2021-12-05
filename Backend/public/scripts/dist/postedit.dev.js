"use strict";

var token = JSON.parse(localStorage.getItem('token'));
var headers = {
  Authorization: "Bearer ".concat(token)
};

function loadPostToEdit() {
  var urlSearchParams, params, postID, post, postToEdit, html, postHolder;
  return regeneratorRuntime.async(function loadPostToEdit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          urlSearchParams = new URLSearchParams(window.location.search);
          params = Object.fromEntries(urlSearchParams.entries());
          postID = params.postID;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.get("posts/getPrivatePostToEdit?privatePostID=".concat(postID), {
            headers: headers
          }));

        case 6:
          post = _context.sent;
          postToEdit = post.data;
          html = "\n    <div class=\"post__stats\">\n    <div class=\"post__stats__date\"><span class=\"bold\">Date Posted:</span> ".concat(postToEdit.date, "</div>\n    <div class=\"post__stats__views\"><span class=\"bold\">Views:</span> ").concat(postToEdit.views, "</div>\n    <div class=\"post__stats__likes\"><span class=\"bold\">Likes:</span> ").concat(postToEdit.likes, " <span class=\"bold\">Dislikes:</span> ").concat(postToEdit.dislikes, "</div>\n    <div class=\"post__stats__comments\"><span class=\"bold\">Number of Comments:</span> ").concat(postToEdit.comments.length, "</div>\n</div>\n<div class=\"post__edit\">\n    <div class=\"edit\">Click to Edit</div>\n    <label class=\"edit--labels\">Title:</label>\n    <div class=\"post__edit__title\" contenteditable=\"true\">").concat(postToEdit.title, "</div>\n    <label class=\"edit--labels\">Tags:</label>\n    <div class=\"post__edit__tags\" contenteditable=\"true\">").concat(postToEdit.tags, "</div>\n    <label class=\"edit--labels\">Post:</label>\n    <div class=\"post__edit__post\" contenteditable=\"true\">").concat(postToEdit.post, "</div>\n    <button class=\"post__edit__submit\" onclick=\"handleEditPost('").concat(postToEdit.postID, "')\">Edit!</button>\n</div>\n    ");
          postHolder = document.querySelector(".post");
          postHolder.innerHTML = html;
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

window.addEventListener("load", loadPostToEdit);

function handleEditPost(postID) {
  var title, tags, post;
  return regeneratorRuntime.async(function handleEditPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            title = document.querySelector(".post__edit__title").innerText;
            tags = document.querySelector(".post__edit__tags").innerText;
            post = document.querySelector(".post__edit__post").innerText;
            swal({
              title: "Are you sure you want to edit?",
              text: "Once edited, you will not be able to recover the original post!",
              icon: "warning",
              buttons: true,
              dangerMode: true
            }).then(function _callee(willEdit) {
              var postEdit;
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!willEdit) {
                        _context2.next = 8;
                        break;
                      }

                      _context2.next = 3;
                      return regeneratorRuntime.awrap(axios.put("posts/editPost", {
                        postID: postID,
                        title: title,
                        tags: tags,
                        post: post
                      }, {
                        headers: headers
                      }));

                    case 3:
                      postEdit = _context2.sent;
                      loadPostToEdit();
                      swal("Poof! Your post has been edited!", {
                        icon: "success"
                      });
                      _context2.next = 9;
                      break;

                    case 8:
                      swal("Your post has not changed!");

                    case 9:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            });
          } catch (e) {
            console.error(e);
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}