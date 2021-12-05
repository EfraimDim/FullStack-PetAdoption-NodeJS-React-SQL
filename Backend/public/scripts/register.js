async function handleRegister(ev) {
    ev.preventDefault()
    try {
        const username = ev.target.elements.username.value
        const email = ev.target.elements.email.value;
        const password = ev.target.elements.password.value;
        const repassword = ev.target.elements.repassword.value;
        const result = await axios.post('/users/addPublicUser', {
            username: username,
            email: email.toLowerCase(),
            password: password,
            repassword: repassword,
            role: "public"
        })
        if (result.data === `Register Succesful!`) {
            swal(`Success ${username}!`, "Email and password valid!", "success", {
                button: "Ok!",
              });
        } else {
            swal(`Sorry ${username}!`, "Email or password invalid!", "error", {
                button: "Ok!",
              });
        }
        ev.target.reset();
    } catch (e) {
        console.error(e)
    }
}
document.querySelector(".form-field").addEventListener("submit", handleRegister)