"use strict";

function searchTitleWithRegExp(searchTerm) {
  try {
    var userRegEx = new RegExp(searchTerm, 'i');
    var searchResults = allPosts.allPosts.filter(function (posts) {
      return userRegEx.test(posts.title);
    });
    return searchResults;
  } catch (e) {
    console.error(e);
  }
}

function searchTagsWithRegExp(searchTerm) {
  try {
    var userRegEx = new RegExp(searchTerm, 'i');
    var searchResults = allPosts.allPosts.filter(function (posts) {
      return userRegEx.test(posts.tags);
    });
    return searchResults;
  } catch (e) {
    console.error(e);
  }
}

function searchUsernameWithRegExp(searchTerm) {
  try {
    var userRegEx = new RegExp(searchTerm, 'i');
    var searchResults = allPosts.allPosts.filter(function (posts) {
      return userRegEx.test(posts.poster);
    });
    return searchResults;
  } catch (e) {
    console.error(e);
  }
}

function searchAllWithRegExp(searchTerm) {
  try {
    var userRegEx = new RegExp(searchTerm, 'i');
    var searchResults = [];
    var searchedTags = allPosts.allPosts.filter(function (posts) {
      return userRegEx.test(posts.tags);
    });

    if (searchedTags != []) {
      searchedTags.forEach(function (post) {
        searchResults.push(post);
      });
    }

    var searchedTitle = allPosts.allPosts.filter(function (posts) {
      return userRegEx.test(posts.title);
    });

    if (searchedTitle != []) {
      searchedTitle.forEach(function (post) {
        searchResults.push(post);
      });
    }

    var searchedPoster = allPosts.allPosts.filter(function (posts) {
      return userRegEx.test(posts.poster);
    });

    if (searchedPoster != []) {
      searchedPoster.forEach(function (post) {
        searchResults.push(post);
      });
    }

    searchResults = searchResults.filter(function (post, index, self) {
      return index === self.findIndex(function (t) {
        return t.postID === post.postID;
      });
    });
    return searchResults;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  searchTitleWithRegExp: searchTitleWithRegExp,
  searchTagsWithRegExp: searchTagsWithRegExp,
  searchUsernameWithRegExp: searchUsernameWithRegExp,
  searchAllWithRegExp: searchAllWithRegExp
};