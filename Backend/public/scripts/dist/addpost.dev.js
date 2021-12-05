"use strict";

var token = JSON.parse(localStorage.getItem('token'));
var headers = {
  Authorization: "Bearer ".concat(token)
};

function handlePost(ev) {
  var title, tags, post, addPost;
  return regeneratorRuntime.async(function handlePost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ev.preventDefault();
          _context.prev = 1;
          title = ev.target.elements.title.value;
          tags = ev.target.elements.tags.value;
          post = ev.target.elements.post.value;
          _context.next = 7;
          return regeneratorRuntime.awrap(axios.post('/posts/addPost', {
            title: title,
            tags: tags,
            post: post
          }, {
            headers: headers
          }));

        case 7:
          addPost = _context.sent;

          if (addPost.data.posts[0].title === title) {
            swal({
              title: "Post Successful!",
              icon: "success",
              button: "back to posts"
            }).then(function () {
              window.location.href = 'personalposts.html';
            });
          } else {
            swal({
              title: "Error Posting!",
              icon: "error",
              button: "try again"
            });
          }

          ev.target.reset();
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
}

document.querySelector("form").addEventListener("submit", handlePost);