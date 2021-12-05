const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
      Authorization: `Bearer ${token}`,
    };

async function getAllPrivatePosts(){
    try {
    const allPrivatePosts = await axios.get('posts/getAllPrivatePosts', {headers: headers})
    renderArrayToDom(allPrivatePosts.data.posts)
    } catch (error) {
        console.error(error)
    }
}
window.addEventListener("load", getAllPrivatePosts)

async function deletePost(postID){
    try {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                const posts = await axios.delete(`/posts/deletePost/${postID}`, {headers: headers})
                renderArrayToDom(posts.data.posts)
              swal("Poof! Your post has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your post is safe!");
            }
          });

    
}catch (e) {
    console.error(e)
}}

async function moveToPostEdit(postID){
    try {
    const privatePostID = await axios.get(`/posts/getPrivatePostID?postID=${postID}`, {headers: headers})
    window.location.href=`/postedit.html?postID=${privatePostID.data}`;
}catch (e) {
    console.error(e)
}}

function renderArrayToDom(postArray) {
    try {
        const list = document.querySelector(".holder")
        let html = ''

        postArray.forEach((post) => {
            if(post.edited === true){
                post.title = `${post.title} (edited)`
            }

            html += (
                `<div class="holder__post" id='${post.postID}'>
                <div class="holder__post__wrapper">
                    <div class="holder__post__wrapper__header">Title:</div>
                    <div class="holder__post__wrapper__title">${post.title}</div>
                </div>
                <button class="holder__edit" onclick='moveToPostEdit("${post.postID}")'>View/Edit</button>
                <button class="holder__delete" onclick='deletePost("${post.postID}")'>Delete</button>
                </div>`
            )

        })
        list.innerHTML = html

    } catch (e) {
        console.error(e)
    }
}