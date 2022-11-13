
import { createContext, useEffect, useReducer, useContext } from 'react';
import axios from '../api/axios';

import { postsReducer, initialPostsState, actions } from './PostsReducer';

const AppDataContext = createContext({})

export const usePosts = () => useContext(AppDataContext)

export const AppDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, initialPostsState)

    const getPosts = async () => {
        const postsData = await axios.get(`/postAll`)
        dispatch({
            type: actions.loadPosts,
            payload: postsData.data
        })
    }
    const updatePosts = (post) => {
        dispatch({
            type: actions.loadPosts,
            payload: [...state.posts, post]
        })

    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <AppDataContext.Provider
            value={{
                state, dispatch,
                getPosts, updatePosts
            }
            }>
            {children}
        </AppDataContext.Provider>
    );
}

export default AppDataContext;