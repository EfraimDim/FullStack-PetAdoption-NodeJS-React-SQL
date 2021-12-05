const token = JSON.parse(localStorage.getItem('token'));
const headers = {
    Authorization: `Bearer ${token}`
}
async function loadPost() {
    try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const postID = params.postID
        const post = await axios.get(`/posts/getPostToView?postID=${postID}`, {
            headers: headers
        })
        renderToViewPost(post.data)
    } catch (e) {
        console.error(e)
    }
}
async function renderToViewPost(post) {
    try {
        let commentHtml = ''
        const checkForYourComment = await axios.get('comments/personalCommentCheck', {
            headers: headers
        })

        post.comments.forEach(async (comment) => {

            if (checkForYourComment.data === comment.username) {
                commentHtml += (
                    `<div class="comment">
                    <div class="comment__username">${comment.username}</div>
                    <div class="comment__comment">${comment.comment}</div>
                    <button class="like-button" onclick="likeComment('${comment.commentID}')">Like ${comment.likes}</button>
                    <button class="delete-button" onclick="deleteComment('${comment.commentID}')">Delete</button> 
                </div>
                `
                )
            } else {
                commentHtml += (
                    `<div class="comment">
                <div class="comment__username">${comment.username}</div>
                <div class="comment__comment">${comment.comment}</div>
                <button class="like-button" onclick="likeComment('${comment.commentID}')">Like ${comment.likes}</button>
                <button class="report-button" onclick="reportComment('${comment.commentID}')">Report</button> 
            </div>
            `
                )

            }
        })

        const likedOrDisliked = await axios.post(`/posts/postLikesAndDislikes`, {
            postID: post.postID
        }, {
            headers: headers
        })
        const {
            like,
            dislike
        } = likedOrDisliked.data
        const checkForYourPost = await axios.get('posts/personalPostCheck', {
            headers: headers
        })
        let html = ''
        if(post.edited === true){
            post.title = `${post.title} (edited)`
        }
        if(checkForYourPost.data === post.poster){
            html = `<h2>${post.title}</h2>
            <h3><span class="italic">Posted By:</span> ${post.poster} <span class="italic">On:</span> ${post.date} <br><span class="italic">Tags:</span> ${post.tags} <br><span class="italic">Views:</span> ${post.views}</h3>
            <div>${post.post}</div>
            <div class="post--buttons">
            <button class="like-button" onclick="likePost('${post.postID}')">${like} ${post.likes}</button> 
            <button class="dislike-button" onclick="dislikePost('${post.postID}')">${dislike} ${post.dislikes}</button>
            </div>
            <div class="comments-header">Comments:</div>
            <div class="commentholder">${commentHtml}</div>
            <form onsubmit="postComment(event)">
            <textarea type="text" name="comment" placeholder="comment" required></textarea><br>
            <button type="submit">Comment!</button>
            </form>`
        }else{
        html = `<h2>${post.title}</h2>
            <h3><span class="italic">Posted By:</span> ${post.poster} <span class="italic">On:</span> ${post.date} <br><span class="italic">Tags:</span> ${post.tags} <br><span class="italic">Views:</span> ${post.views}</h3>
            <div>${post.post}</div>
            <div class="post--buttons">
            <button class="like-button" onclick="likePost('${post.postID}')">${like} ${post.likes}</button> 
            <button class="dislike-button" onclick="dislikePost('${post.postID}')">${dislike} ${post.dislikes}</button>
            <button class="report-button" onclick="reportPost('${post.postID}')">Report</button>
            </div>
            <div class="comments-header">Comments:</div>
            <div class="commentholder">${commentHtml}</div>
            <form onsubmit="postComment(event)">
            <textarea type="text" name="comment" placeholder="comment" required></textarea><br>
            <button type="submit">Comment!</button>
            </form>`}
        document.querySelector(".postholder").innerHTML = html
    } catch (e) {
        console.error(e)
    }
}

async function likePost(postID) {
    try {
        const post = await axios.post('/posts/likePost', {
            postID: postID
        }, {
            headers: headers
        })
        renderToViewPost(post.data)
    } catch (e) {
        console.error(e)
    }
}

async function dislikePost(postID) {
    try {
        const post = await axios.post('/posts/dislikePost', {
            postID: postID
        }, {
            headers: headers
        })
        renderToViewPost(post.data)
    } catch (e) {
        console.error(e)
    }
}
async function reportPost(postID) {
    try {
        swal({
            title: "Are you sure?",
            text: "Report Post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willReport) => {
            if (willReport) {
        const post = await axios.post('/posts/reportPost', {
            postID: postID
        }, {
            headers: headers
        })
        if (post.data === "removed") {
            swal({
                    title: "Post Deleted!",
                    text: "Post has been reported too many times and has been removed.",
                    icon: "info",
                    button: "back to posts",
                })
                .then(() => {
                    window.location.href = "publicposts.html"
                })
        } else if (post.data === "you have already reported this post") {
            swal({
                title: "Already Reported!",
                text: `${post.data}`,
                icon: "info",
                button: "back to post",
            })
        } else {
            swal({
                title: "Reported Succesfully!",
                icon: "success",
                button: "back to post",
            })
            renderToViewPost(post.data)
        }}
        else {
            swal("Post not reported");
        }})
    } catch (e) {
        console.error(e)
    }
}








const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const postID = params.postID

async function postComment(event) {
    try {
        event.preventDefault();
        const comment = event.target.children.comment.value
        const postComment = await axios.post(`/comments/postComment`, {
            postID: postID,
            comment: comment
        }, {
            headers: headers
        })
        event.target.reset()
        if (postComment.data) {
            swal({
                title: "Comment Committed!",
                icon: "success",
                button: "back to post",
            })
            renderToViewPost(postComment.data)
        } else {
            swal({
                title: "Oops, something went wronng!",
                icon: "error",
                button: "try again",
            })
        }
    } catch (e) {
        console.error(e)
    }
}

async function likeComment(commentID) {
    try {
        const post = await axios.post('/comments/likeComment', {
            postID: postID,
            commentID: commentID
        }, {
            headers: headers
        })
        renderToViewPost(post.data)
    } catch (e) {
        console.error(e)
    }
}
async function reportComment(commentID) {
    try {
        swal({
            title: "Are you sure?",
            text: "Report Post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willReport) => {
            if (willReport) {
                const post = await axios.post('/comments/reportComment', {
                    postID: postID,
                    commentID: commentID
                }, {
                    headers: headers
                })
                if (post.data === "removed") {
                    swal({
                            title: "Comment Deleted!",
                            text: "Comment has been reported too many times and has been removed.",
                            icon: "info",
                            button: "back to posts",
                        })
                        .then(() => {
                            window.location.href = "publicposts.html"
                        })
                } else if (post.data === "you have already reported this comment") {
                    swal({
                        title: "Already Reported!",
                        text: `${post.data}`,
                        icon: "info",
                        button: "back to post",
                    })
        
                } else {
                    swal({
                        title: "Reported Succesfully!",
                        icon: "success",
                        button: "back to post",
                    })
                }
                renderToViewPost(post.data)
            } else {
                swal("Comment not reported");
            }
        });

 
    } catch (e) {
        console.error(e)
    }
}



async function deleteComment(commentID) {
    try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const postID = params.postID
        swal({
                title: "Are you sure?",
                text: "Comment will be deleted permenatley!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(async (willDelete) => {
                if (willDelete) {
                    const posts = await axios.delete(`/comments/deleteComment/${commentID}&${postID}`, {
                        headers: headers
                    })
                    renderToViewPost(posts.data)
                    swal("Poof! Your comment has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your comment is safe!");
                }
            });

    } catch (error) {
        console.error(error)
    }
}

window.addEventListener("load", loadPost)