const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
      Authorization: `Bearer ${token}`,
    };
async function handlePost(ev) {
    ev.preventDefault()
    try {
        const title = ev.target.elements.title.value
        const tags = ev.target.elements.tags.value;
        const post = ev.target.elements.post.value;
        const addPost = await axios.post('/posts/addPost', {
            title: title,
            tags: tags,
            post: post,
        }, {headers: headers})
        if(addPost.data.posts[0].title === title){
            swal({
                title: "Post Successful!",
                icon: "success",
                button: "back to posts"
              })
            .then(()=>{
                window.location.href = 'personalposts.html'
            })
        }else{
            swal({
                title: "Error Posting!",
                icon: "error",
                button: "try again"
              })
        }
        ev.target.reset();
    } catch (e) {
        console.error(e)
    }
}
document.querySelector("form").addEventListener("submit", handlePost)