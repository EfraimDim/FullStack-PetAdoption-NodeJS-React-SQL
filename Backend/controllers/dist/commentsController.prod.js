"use strict";var _require=require("../models/classes"),users=_require.users,allPosts=_require.allPosts,Comment=_require.Comment,bannedUsers=_require.bannedUsers;exports.postComment=function(e,s){try{var r=e.body,n=r.postID,o=r.comment,t=e.decoded,m=users.findUser(t.userID),c=allPosts.findPost(n),u=new Comment(m.username,o);c.comments.push(u),s.send(c)}catch(e){console.log(e)}},exports.likeComment=function(e,s){try{var r=e.body,n=r.postID,o=r.commentID,t=e.decoded,m=allPosts.findPost(n),c=m.comments.find(function(e){return e.commentID===o});c.likes=c.likes+1,c.likersID.push(t),s.send(m)}catch(e){console.log(e)}},exports.reportComment=function(e,s){try{var r=e.body,n=r.postID,o=r.commentID,t=e.decoded,m=allPosts.findPost(n),c=m.comments.find(function(e){return e.commentID===o});c.reports=c.reports+1,c.reportersID.push(t);var u=users.users.find(function(e){return e.username===c.username});2===c.reports?(m.comments=m.comments.filter(function(e){return e.commentID!=o}),u.strikes=u.strikes+1,1===u.strikes&&(bannedUsers.bannedUsers.push(u.email),users.users=users.users.filter(function(e){return e.username!=u.username})),s.send("removed")):s.send(m)}catch(e){console.log(e)}},exports.personalCommentCheck=function(e,s){try{var r=e.decoded,n=users.findUser(r.userID);s.send(n.username)}catch(e){console.log(e)}},exports.deleteComment=function(e,s){try{var r=e.params,n=r.commentID,o=r.postID,t=allPosts.findPost(o),m=t.comments.filter(function(e){return e.commentID!=n});t.comments=m,s.send(t)}catch(e){console.error(e)}};