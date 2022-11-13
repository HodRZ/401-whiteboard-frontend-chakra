export function postsReducer(state, action) {
    switch (action.type) {
        case 'loadPosts': {
            return {
                ...state,
                posts: action.payload
            }
        }
        case 'deletePost': {
            const { posts } = state
            let updatedPosts = posts.filter(post => post.id !== action.payload)
            return {
                ...state,
                posts: [...updatedPosts]
            }
        }


        default:
            throw Error('Unknown action: ' + action.type)
    }
}

export const actions = {
    loadPosts: 'loadPosts',
    deletePost: 'deletePost'
}

export const initialPostsState = {
    posts: []
}