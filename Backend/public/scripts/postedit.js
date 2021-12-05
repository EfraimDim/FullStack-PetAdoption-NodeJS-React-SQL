const token = JSON.parse(localStorage.getItem('token'));
const headers = {
  Authorization: `Bearer ${token}`
}
async function loadPostToEdit(){
    try{
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const postID = params.postID
    const post = await axios.get(`posts/getPrivatePostToEdit?privatePostID=${postID}`, {headers: headers})
    const postToEdit = post.data

    const html = `
    <div class="post__stats">
    <div class="post__stats__date"><span class="bold">Date Posted:</span> ${postToEdit.date}</div>
    <div class="post__stats__views"><span class="bold">Views:</span> ${postToEdit.views}</div>
    <div class="post__stats__likes"><span class="bold">Likes:</span> ${postToEdit.likes} <span class="bold">Dislikes:</span> ${postToEdit.dislikes}</div>
    <div class="post__stats__comments"><span class="bold">Number of Comments:</span> ${postToEdit.comments.length}</div>
</div>
<div class="post__edit">
    <div class="edit">Click to Edit</div>
    <label class="edit--labels">Title:</label>
    <div class="post__edit__title" contenteditable="true">${postToEdit.title}</div>
    <label class="edit--labels">Tags:</label>
    <div class="post__edit__tags" contenteditable="true">${postToEdit.tags}</div>
    <label class="edit--labels">Post:</label>
    <div class="post__edit__post" contenteditable="true">${postToEdit.post}</div>
    <button class="post__edit__submit" onclick="handleEditPost('${postToEdit.postID}')">Edit!</button>
</div>
    `
    const postHolder = document.querySelector(".post")
    postHolder.innerHTML = html
}catch (e) {
    console.error(e)
}
}
window.addEventListener("load", loadPostToEdit)

async function handleEditPost(postID){
    try{
    const title = document.querySelector(".post__edit__title").innerText
    const tags = document.querySelector(".post__edit__tags").innerText
    const post = document.querySelector(".post__edit__post").innerText
    swal({
        title: "Are you sure you want to edit?",
        text: "Once edited, you will not be able to recover the original post!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then(async(willEdit) => {
        if (willEdit) {
            const postEdit = await axios.put(`posts/editPost`, {
                postID: postID,
                title: title,
                tags: tags,
                post: post
            },{headers: headers})
            loadPostToEdit()
          swal("Poof! Your post has been edited!", {
            icon: "success",
          });
        } else {
          swal("Your post has not changed!");
        }
      });
}catch (e) {
    console.error(e)
}
}
