async function handleLogin(event){
    event.preventDefault()
    try{
    const password = event.target.elements.password.value;
    const email = event.target.elements.email.value
    const res = await axios.post('/login/login', {
                    password: password,
                    email: email.toLowerCase()
                })
        event.target.reset();
            if (res.data) {
            localStorage.setItem('token', JSON.stringify(res.data));
            swal({
                title: "Login Successful!",
                text: "Welcome Back :)",
                icon: "success",
                button: "continue to site"
              })
            .then(()=>{
                window.location.href= 'personalposts.html';
            })
            }
            else{
                swal({
                    title: "Login Unsuccessful!",
                    icon: "error",
                  });
            }
    
}  catch (e) {
    console.error(e)
}}
document.querySelector('.form-field').addEventListener("submit", handleLogin)