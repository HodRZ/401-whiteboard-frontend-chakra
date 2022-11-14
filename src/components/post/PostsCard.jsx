import { Grid, GridItem } from '@chakra-ui/react';

import axios from './../../api/axios';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import EditPost from './EditPost';
import { usePosts } from '../../State/PostsContext';
import { actions } from '../../State/PostsReducer';
import { useAuth } from '../../State/AuthContext';


export default function PostsCard(props) {
    const { dispatch } = usePosts();
    const { userState, isAuthorized } = useAuth();
    const { loggedUser } = userState;

    const [post, setPost] = useState(props.post);
    const [showEdit, setShowEdit] = useState(false);

    const getPost = async () => {
        const id = props.post.id;
        const updatedPost = await axios.get(`/post/${id}`, {
            headers: {
                Authorization: `Bearer ${loggedUser.access_token}`
            }
        });
        setPost(updatedPost.data);
    };

    const addComment = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        const newCmnt = {
            content: e.target.comment.value,
            UserId: loggedUser.id
        };
        await axios.post(`/post/${id}/comment`, newCmnt, {
            headers: {
                Authorization: `Bearer ${loggedUser.access_token}`
            }
        });
        e.target.comment.value = '';
        getPost();
    };
    const editPost = async (e) => {
        e.preventDefault();
        const data = {
            content: e.target.content.value,
            title: e.target.title.value
        };
        await axios.put(`/post/${e.target.id}`, data, {
            headers: {
                Authorization: `Bearer ${loggedUser.access_token}`
            }
        })
            .then(res => {
                e.target.content.value = '';
                e.target.title.value = '';
            })
            .catch(e => alert(e.response.data));
        setShowEdit(false);
        getPost();
    };

    const deleteComment = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        await axios.delete(`/comment/${id}`, {
            headers: {
                Authorization: `Bearer ${loggedUser.access_token}`
            }
        });
        getPost();
    };


    const deletePost = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        await axios.delete(`/post/${id}`, {
            headers: {
                Authorization: `Bearer ${loggedUser.access_token}`
            }
        });
        dispatch({
            type: actions.deletePost,
            payload: parseInt(id)
        });
    };
    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            {showEdit &&
                <EditPost post={post} setShowEdit={setShowEdit} editPost={editPost} />
            }
            <Grid
                key={post?.id}
                templateAreas={`"name header delete"
                  "nav main main"
                  "nav comments comments"`}
                gridTemplateRows={'50px 1fr 4fr'}
                gridTemplateColumns={'150px 1fr 20px'}
                h='100%'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
            >
                <GridItem pl='2' bg='orange.300' area={'name'}>
                    {post.User?.username}
                </GridItem>
                <GridItem pl='2' bg='orange.300' area={'header'}>
                    {post?.title}
                </GridItem>
                <GridItem pl='2' bg='orange.300' area={'delete'}>
                    {
                        isAuthorized(post.UserId) &&
                        <>
                            <button onClick={() => { setShowEdit(true); }}><AiFillEdit /></button>
                            <form onSubmit={deletePost} id={post?.id}>
                                <button ><AiFillDelete /></button>
                            </form>
                        </>
                    }
                </GridItem>
                <GridItem pl='2' bg='pink.300' area={'nav'}>
                    nav
                </GridItem>
                <GridItem pl='2' bg='green.300' area={'main'}>
                    {post?.content}
                </GridItem>
                <GridItem pl='2' bg='blue.300' area={'comments'}>
                    {
                        post?.comments &&
                        post.comments.map((comment) => {
                            return <div key={comment.id}>
                                <p >{comment.content}</p>
                                <div >
                                    {
                                        isAuthorized(comment.User.id) &&
                                        <form id={comment.id} onSubmit={deleteComment}>
                                            <button><AiFillDelete /></button>
                                        </form>
                                    }
                                    <p>{comment?.User?.username}</p>
                                </div>
                            </div>;
                        })
                    }
                </GridItem>
            </Grid>
        </>
    );
}

// function PostsCardOld(props) {

//     return (
//         <>


//             {
//                 <div key={post?.id} className=' border shadow-xl flex flex-col border-slate-700 rounded-md h-fit '>
//                     <div className='flex justify-between'>
//                         <h2 className='text-center text-2xl mx-3 my-5'>{post?.title}</h2>
//                         <aside className='flex place-items-center'>
//                             <h3 className='text-center bg-black text-white rounded-lg p-2 text-md mx-3 my-5'>{post.User?.username}</h3>
//                             {
//                                 isAuthorized(post.UserId) &&
//                                 <>
//                                     <button onClick={() => { setShowEdit(true); }}><AiFillEdit /></button>
//                                     <form onSubmit={deletePost} id={post?.id} className='mt-3'>
//                                         <button className='text-xl'><AiFillDelete className='h-6 w-fit border-2 m-2 rounded-full   hover:text-slate-500' /></button>
//                                     </form>
//                                 </>
//                             }

//                         </aside>
//                     </div>
//                     <p className='px-3 py-8 bg-black bg-opacity-10 break-all'>{post?.content}</p>
//                     <div className=' flex flex-col gap-3 my-2'>
//                         {
//                             post?.comments &&
//                             post.comments.map((comment) => {
//                                 return <div key={comment.id} className='flex justify-between'>
//                                     <p className='px-5 border-y border-black break-all'>{comment.content}</p>
//                                     <div className='flex '>
//                                         {
//                                             isAuthorized(comment.User.id) &&
//                                             <form id={comment.id} onSubmit={deleteComment}>
//                                                 <button className='mx-2 text-sm border-y rounded-xl hover:bg-black hover:text-white border-black h-fit'  ><AiFillDelete className='h-fit w-fit border-2 rounded-full hover:text-slate-500' /></button>
//                                             </form>
//                                         }
//                                         <p className='px-2 border-y bg-black text-white border-x rounded-md border-black h-fit'>{comment?.User?.username}</p>
//                                     </div>
//                                 </div>;
//                             })
//                         }
//                     </div>
//                     <form className='flex flex-col my-3 place-items-center text-center' id={post?.id} onSubmit={addComment}>
//                         <input type="text" name='comment' placeholder='comment' className='w-full border-y border-black  my-4' />
//                         <button className='border-b-2  border-black shadow-xl hover:bg-action hover:text-purple-200 rounded-xl w-32'>comment</button>
//                     </form>
//                 </div>
//             }
//         </>
//     );
// }

// export default PostsCard;