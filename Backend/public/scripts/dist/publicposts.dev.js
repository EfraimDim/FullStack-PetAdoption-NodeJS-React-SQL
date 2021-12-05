"use strict";

function displayAllPosts() {
  var allPosts;
  return regeneratorRuntime.async(function displayAllPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(axios.get("/posts/getAllPosts"));

        case 3:
          allPosts = _context.sent;
          renderAllPosts(allPosts.data);
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

function renderAllPosts(allPostArray) {
  try {
    var list = document.querySelector(".postholder");
    var html = '';
    allPostArray.forEach(function (post) {
      if (post.edited === true) {
        post.title = "".concat(post.title, " (edited)");
      }

      html += "<div class=\"postholder__post\" onclick='moveToViewPost(\"".concat(post.postID, "\")' id='").concat(post.postID, "'>\n                    <div class=\"postholder__post__title bold\">").concat(post.title, "</div>\n                    <div class=\"postholder__post__author\"><span class=\"bold\">Posted By:</span> ").concat(post.poster, " <span class=\"bold\">Date:</span> ").concat(post.date, " <span class=\"bold\">Views:</span> ").concat(post.views, " <span class=\"bold\">Likes:</span> ").concat(post.likes, "</div>\n                </div>");
    });
    list.innerHTML = html;
  } catch (e) {
    console.error(e);
  }
}

function searchTitleKeyUp(ev) {
  var searchTerm, posts;
  return regeneratorRuntime.async(function searchTitleKeyUp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          ev.preventDefault();
          searchTerm = ev.target.value;
          _context2.next = 5;
          return regeneratorRuntime.awrap(axios.post("/posts/searchPostTitle", {
            searchTerm: searchTerm
          }));

        case 5:
          posts = _context2.sent;
          renderAllPosts(posts.data);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

document.getElementById("searching-title").addEventListener("keyup", searchTitleKeyUp);

function searchTagsKeyUp(ev) {
  var searchTerm, posts;
  return regeneratorRuntime.async(function searchTagsKeyUp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          ev.preventDefault();
          searchTerm = ev.target.value;
          _context3.next = 5;
          return regeneratorRuntime.awrap(axios.post("/posts/searchPostTags", {
            searchTerm: searchTerm
          }));

        case 5:
          posts = _context3.sent;
          renderAllPosts(posts.data);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

document.getElementById("searching-tags").addEventListener("keyup", searchTagsKeyUp);

function searchUsernameKeyUp(ev) {
  var searchTerm, posts;
  return regeneratorRuntime.async(function searchUsernameKeyUp$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          ev.preventDefault();
          searchTerm = ev.target.value;
          _context4.next = 5;
          return regeneratorRuntime.awrap(axios.post("/posts/searchPostUsername", {
            searchTerm: searchTerm
          }));

        case 5:
          posts = _context4.sent;
          renderAllPosts(posts.data);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

document.getElementById("searching-username").addEventListener("keyup", searchUsernameKeyUp);

function searchAllKeyUp(ev) {
  var searchTerm, posts;
  return regeneratorRuntime.async(function searchAllKeyUp$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          ev.preventDefault();
          searchTerm = ev.target.value;
          _context5.next = 5;
          return regeneratorRuntime.awrap(axios.post("/posts/searchPostAll", {
            searchTerm: searchTerm
          }));

        case 5:
          posts = _context5.sent;
          renderAllPosts(posts.data);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

document.getElementById("searching-all").addEventListener("keyup", searchAllKeyUp);

function moveToViewPost(postID) {
  try {
    window.location.href = "/readpost.html?postID=".concat(postID);
  } catch (e) {
    console.error(e);
  }
}

function sortByMostViewed() {
  var postData, allPosts, sortedPosts;
  return regeneratorRuntime.async(function sortByMostViewed$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(axios.get("/posts/getAllPosts"));

        case 3:
          postData = _context6.sent;
          allPosts = postData.data;
          sortedPosts = allPosts.sort(function (a, b) {
            var keyA = a.views;
            var keyB = b.views;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
          });
          renderAllPosts(sortedPosts);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function sortByMostLiked() {
  var postData, allPosts, sortedPosts;
  return regeneratorRuntime.async(function sortByMostLiked$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(axios.get("/posts/getAllPosts"));

        case 3:
          postData = _context7.sent;
          allPosts = postData.data;
          sortedPosts = allPosts.sort(function (a, b) {
            var keyA = a.likes;
            var keyB = b.likes;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
          });
          renderAllPosts(sortedPosts);
          _context7.next = 12;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function sortByMostComments() {
  var postData, allPosts, sortedPosts;
  return regeneratorRuntime.async(function sortByMostComments$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(axios.get("/posts/getAllPosts"));

        case 3:
          postData = _context8.sent;
          allPosts = postData.data;
          sortedPosts = allPosts.sort(function (a, b) {
            var keyA = a.comments.length;
            var keyB = b.comments.length;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
          });
          renderAllPosts(sortedPosts);
          _context8.next = 12;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

var mostViewedButton = document.querySelector(".most-viewed");
mostViewedButton.addEventListener("click", sortByMostViewed);
var mostLikedButton = document.querySelector(".most-liked");
mostLikedButton.addEventListener("click", sortByMostLiked);
var mostCommentButton = document.querySelector(".most-comment");
mostCommentButton.addEventListener("click", sortByMostComments);
var newestButton = document.querySelector(".newest");
newestButton.addEventListener("click", displayAllPosts);
window.addEventListener("load", displayAllPosts);