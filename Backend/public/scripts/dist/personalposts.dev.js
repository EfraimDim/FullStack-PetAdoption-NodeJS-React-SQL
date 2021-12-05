"use strict";

var token = JSON.parse(localStorage.getItem('token'));
var headers = {
  Authorization: "Bearer ".concat(token)
};

function getAllPrivatePosts() {
  var allPrivatePosts;
  return regeneratorRuntime.async(function getAllPrivatePosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get('posts/getAllPrivatePosts', {
            headers: headers
          }));

        case 3:
          allPrivatePosts = _context.sent;
          renderArrayToDom(allPrivatePosts.data.posts);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

window.addEventListener("load", getAllPrivatePosts);

function deletePost(postID) {
  return regeneratorRuntime.async(function deletePost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this post!",
              icon: "warning",
              buttons: true,
              dangerMode: true
            }).then(function _callee(willDelete) {
              var posts;
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!willDelete) {
                        _context2.next = 8;
                        break;
                      }

                      _context2.next = 3;
                      return regeneratorRuntime.awrap(axios["delete"]("/posts/deletePost/".concat(postID), {
                        headers: headers
                      }));

                    case 3:
                      posts = _context2.sent;
                      renderArrayToDom(posts.data.posts);
                      swal("Poof! Your post has been deleted!", {
                        icon: "success"
                      });
                      _context2.next = 9;
                      break;

                    case 8:
                      swal("Your post is safe!");

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

function moveToPostEdit(postID) {
  var privatePostID;
  return regeneratorRuntime.async(function moveToPostEdit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(axios.get("/posts/getPrivatePostID?postID=".concat(postID), {
            headers: headers
          }));

        case 3:
          privatePostID = _context4.sent;
          window.location.href = "/postedit.html?postID=".concat(privatePostID.data);
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

function renderArrayToDom(postArray) {
  try {
    var list = document.querySelector(".holder");
    var html = '';
    postArray.forEach(function (post) {
      if (post.edited === true) {
        post.title = "".concat(post.title, " (edited)");
      }

      html += "<div class=\"holder__post\" id='".concat(post.postID, "'>\n                <div class=\"holder__post__wrapper\">\n                    <div class=\"holder__post__wrapper__header\">Title:</div>\n                    <div class=\"holder__post__wrapper__title\">").concat(post.title, "</div>\n                </div>\n                <button class=\"holder__edit\" onclick='moveToPostEdit(\"").concat(post.postID, "\")'>View/Edit</button>\n                <button class=\"holder__delete\" onclick='deletePost(\"").concat(post.postID, "\")'>Delete</button>\n                </div>");
    });
    list.innerHTML = html;
  } catch (e) {
    console.error(e);
  }
}