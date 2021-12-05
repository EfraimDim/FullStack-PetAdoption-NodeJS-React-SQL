"use strict";

function handleLogin(event) {
  var password, email, res;
  return regeneratorRuntime.async(function handleLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          _context.prev = 1;
          password = event.target.elements.password.value;
          email = event.target.elements.email.value;
          _context.next = 6;
          return regeneratorRuntime.awrap(axios.post('/login/login', {
            password: password,
            email: email.toLowerCase()
          }));

        case 6:
          res = _context.sent;
          event.target.reset();

          if (res.data) {
            localStorage.setItem('token', JSON.stringify(res.data));
            swal({
              title: "Login Successful!",
              text: "Welcome Back :)",
              icon: "success",
              button: "continue to site"
            }).then(function () {
              window.location.href = 'personalposts.html';
            });
          } else {
            swal({
              title: "Login Unsuccessful!",
              icon: "error"
            });
          }

          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
}

document.querySelector('.form-field').addEventListener("submit", handleLogin);