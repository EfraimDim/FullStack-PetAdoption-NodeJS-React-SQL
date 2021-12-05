async function displayAllPosts(){
    try{
    const allPosts = await axios.get("/posts/getAllPosts")
    renderAllPosts(allPosts.data)
}catch (e) {
    console.error(e)
}
}

function renderAllPosts(allPostArray){
    try {
        const list = document.querySelector(".postholder")
        let html = ''

        allPostArray.forEach((post) => {
            if(post.edited === true){
                post.title = `${post.title} (edited)`
            }
            html += (
                `<div class="postholder__post" onclick='moveToViewPost("${post.postID}")' id='${post.postID}'>
                    <div class="postholder__post__title bold">${post.title}</div>
                    <div class="postholder__post__author"><span class="bold">Posted By:</span> ${post.poster} <span class="bold">Date:</span> ${post.date} <span class="bold">Views:</span> ${post.views} <span class="bold">Likes:</span> ${post.likes}</div>
                </div>`
            )

        })
        list.innerHTML = html

    } catch (e) {
        console.error(e)
    }
}

async function searchTitleKeyUp(ev) {
    try {
        ev.preventDefault();
        const searchTerm = ev.target.value;
        const posts = await axios.post("/posts/searchPostTitle", {
            searchTerm: searchTerm
        })
        renderAllPosts(posts.data)
    }
    catch (er) {
        console.error(er)
    }
}
document.getElementById("searching-title").addEventListener("keyup", searchTitleKeyUp)

async function searchTagsKeyUp(ev) {
    try {
        ev.preventDefault();
        const searchTerm = ev.target.value;
        const posts = await axios.post("/posts/searchPostTags", {
            searchTerm: searchTerm
        })
        renderAllPosts(posts.data)
    }
    catch (er) {
        console.error(er)
    }
}
document.getElementById("searching-tags").addEventListener("keyup", searchTagsKeyUp)

async function searchUsernameKeyUp(ev) {
    try {
        ev.preventDefault();
        const searchTerm = ev.target.value;
        const posts = await axios.post("/posts/searchPostUsername", {
            searchTerm: searchTerm
        })
        renderAllPosts(posts.data)
    }
    catch (er) {
        console.error(er)
    }
}
document.getElementById("searching-username").addEventListener("keyup", searchUsernameKeyUp)

async function searchAllKeyUp(ev) {
    try {
        ev.preventDefault();
        const searchTerm = ev.target.value;
        const posts = await axios.post("/posts/searchPostAll", {
            searchTerm: searchTerm
        })
        renderAllPosts(posts.data)
    }
    catch (er) {
        console.error(er)
    }
}
document.getElementById("searching-all").addEventListener("keyup", searchAllKeyUp)



function moveToViewPost(postID){
    try {
        window.location.href = `/readpost.html?postID=${postID}`
      } catch (e) {
        console.error(e)
      }
}

async function sortByMostViewed(){
    try{
        const postData = await axios.get("/posts/getAllPosts");
        const allPosts = postData.data;
        
        const sortedPosts = allPosts.sort(function(a, b) {
            let keyA = a.views
            let keyB = b.views;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;   
    }) 
        renderAllPosts(sortedPosts)  
}catch (e) {
    console.error(e)
}
}
async function sortByMostLiked(){
    try{
    const postData = await axios.get("/posts/getAllPosts");
    const allPosts = postData.data;
    const sortedPosts = allPosts.sort(function(a, b) {
        let keyA = a.likes
        let keyB = b.likes;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;   
}) 
    renderAllPosts(sortedPosts)  
}catch (e) {
    console.error(e)
}
}
async function sortByMostComments(){
    try{
    const postData = await axios.get("/posts/getAllPosts");
    const allPosts = postData.data;
    const sortedPosts = allPosts.sort(function(a, b) {
        let keyA = a.comments.length
        let keyB = b.comments.length;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;   
}) 
    renderAllPosts(sortedPosts)  
}catch (e) {
    console.error(e)
}
}
const mostViewedButton = document.querySelector(".most-viewed");
mostViewedButton.addEventListener("click", sortByMostViewed)
const mostLikedButton = document.querySelector(".most-liked");
mostLikedButton.addEventListener("click", sortByMostLiked)
const mostCommentButton = document.querySelector(".most-comment");
mostCommentButton.addEventListener("click", sortByMostComments)
const newestButton = document.querySelector(".newest");
newestButton.addEventListener("click", displayAllPosts)

window.addEventListener("load", displayAllPosts)