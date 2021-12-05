function searchTitleWithRegExp(searchTerm) {
    try {
        const userRegEx = new RegExp(searchTerm, 'i');
        const searchResults = allPosts.allPosts.filter(posts => userRegEx.test(posts.title));
        return searchResults
    } catch (e) {
        console.error(e)
    }
}

function searchTagsWithRegExp(searchTerm) {
    try {
        const userRegEx = new RegExp(searchTerm, 'i');
        const searchResults = allPosts.allPosts.filter(posts => userRegEx.test(posts.tags));
        return searchResults
    } catch (e) {
        console.error(e)
    }
}

function searchUsernameWithRegExp(searchTerm) {
    try {
        const userRegEx = new RegExp(searchTerm, 'i');
        const searchResults = allPosts.allPosts.filter(posts => userRegEx.test(posts.poster));
        return searchResults
    } catch (e) {
        console.error(e)
    }
}

function searchAllWithRegExp(searchTerm) {
    try {
        const userRegEx = new RegExp(searchTerm, 'i');
        let searchResults = []
        const searchedTags = allPosts.allPosts.filter(posts => userRegEx.test(posts.tags))
        if (searchedTags != []) {
            searchedTags.forEach(post => {
                searchResults.push(post)
            });
        }
        const searchedTitle = allPosts.allPosts.filter(posts => userRegEx.test(posts.title))
        if (searchedTitle != []) {
            searchedTitle.forEach(post => {
                searchResults.push(post)
            });
        }
       
        const searchedPoster = allPosts.allPosts.filter(posts => userRegEx.test(posts.poster))
        if (searchedPoster != []) {
            searchedPoster.forEach(post => {
                searchResults.push(post)
            });
        }

        searchResults = searchResults.filter((post, index, self) =>
            index === self.findIndex((t) => (
                t.postID === post.postID
            ))
        )
      
        return searchResults
    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    searchTitleWithRegExp,
    searchTagsWithRegExp,
    searchUsernameWithRegExp,
    searchAllWithRegExp
}