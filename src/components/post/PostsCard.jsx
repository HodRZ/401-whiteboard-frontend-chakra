import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react";


export default function PostsCard() {
    return (
        <Flex
            bg="#edf3f8"
            _dark={{ bg: "#3e3e3e" }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                px={8}
                py={4}
                rounded="lg"
                shadow="lg"
                bg="white"
                _dark={{ bg: "gray.800" }}
                maxW="2xl"
            >
                <Flex justifyContent="space-between" alignItems="center">
                    <chakra.span
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: "gray.400" }}
                    >
                        Mar 10, 2019
                    </chakra.span>
                    <Link
                        px={3}
                        py={1}
                        bg="gray.600"
                        color="gray.100"
                        fontSize="sm"
                        fontWeight="700"
                        rounded="md"
                        _hover={{ bg: "gray.500" }}
                    >
                        Design
                    </Link>
                </Flex>

                <Box mt={2}>
                    <Link
                        fontSize="2xl"
                        color="gray.700"
                        _dark={{ color: "white" }}
                        fontWeight="700"
                        _hover={{
                            color: "gray.600",
                            _dark: {
                                color: "gray.200",
                            },
                            textDecor: "underline",
                        }}
                    >
                        Accessibility tools for designers and developers
                    </Link>
                    <chakra.p mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                        expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
                        enim reprehenderit nisi, accusamus delectus nihil quis facere in
                        modi ratione libero!
                    </chakra.p>
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                    <Link
                        color="brand.600"
                        _dark={{ color: "brand.400" }}
                        _hover={{ textDecor: "underline" }}
                    >
                        Read more
                    </Link>

                    <Flex alignItems="center">
                        <Image
                            mx={4}
                            w={10}
                            h={10}
                            rounded="full"
                            fit="cover"
                            display={{ base: "none", sm: "block" }}
                            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                            alt="avatar"
                        />
                        <Link
                            color="gray.700"
                            _dark={{ color: "gray.200" }}
                            fontWeight="700"
                            cursor="pointer"
                        >
                            Khatab wedaa
                        </Link>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};


// import axios from './../../api/axios';
// import React, { useEffect, useState } from 'react';
// import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
// import EditPost from './EditPost';
// import { usePosts } from '../../State/PostsContext';
// import { actions } from '../../State/PostsReducer';
// import { useAuth } from '../../State/AuthContext';

// function PostsCard(props) {
//     const { dispatch } = usePosts()
//     const { userState, isAuthorized } = useAuth()
//     const { loggedUser } = userState

//     const [post, setPost] = useState(props.post)
//     const [showEdit, setShowEdit] = useState(false)

//     const getPost = async () => {
//         const id = props.post.id
//         const updatedPost = await axios.get(`/post/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${loggedUser.access_token}`
//             }
//         })
//         setPost(updatedPost.data)
//     }

//     const addComment = async (e) => {
//         e.preventDefault()
//         const id = e.target.id
//         const newCmnt = {
//             content: e.target.comment.value,
//             UserId: loggedUser.id
//         }
//         await axios.post(`/post/${id}/comment`, newCmnt, {
//             headers: {
//                 Authorization: `Bearer ${loggedUser.access_token}`
//             }
//         })
//         e.target.comment.value = ''
//         getPost()
//     }
//     const editPost = async (e) => {
//         e.preventDefault()
//         const data = {
//             content: e.target.content.value,
//             title: e.target.title.value
//         }
//         await axios.put(`/post/${e.target.id}`, data, {
//             headers: {
//                 Authorization: `Bearer ${loggedUser.access_token}`
//             }
//         })
//             .then(res => {
//                 e.target.content.value = ''
//                 e.target.title.value = ''
//             })
//             .catch(e => alert(e.response.data))
//         setShowEdit(false)
//         getPost()
//     }

//     const deleteComment = async (e) => {
//         e.preventDefault()
//         const id = e.target.id
//         await axios.delete(`/comment/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${loggedUser.access_token}`
//             }
//         })
//         getPost()
//     }


//     const deletePost = async (e) => {
//         e.preventDefault()
//         const id = e.target.id
//         await axios.delete(`/post/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${loggedUser.access_token}`
//             }
//         })
//         dispatch({
//             type: actions.deletePost,
//             payload: parseInt(id)
//         })
//     }
//     useEffect(() => {
//         getPost()
//     }, [])
//     return (
//         <>
//             {showEdit &&
//                 <EditPost post={post} setShowEdit={setShowEdit} editPost={editPost} />
//             }

//             {
//                 <div key={post?.id} className=' border shadow-xl flex flex-col border-slate-700 rounded-md h-fit '>
//                     <div className='flex justify-between'>
//                         <h2 className='text-center text-2xl mx-3 my-5'>{post?.title}</h2>
//                         <aside className='flex place-items-center'>
//                             <h3 className='text-center bg-black text-white rounded-lg p-2 text-md mx-3 my-5'>{post.User?.username}</h3>
//                             {
//                                 isAuthorized(post.UserId) &&
//                                 <>
//                                     <button onClick={() => { setShowEdit(true) }}><AiFillEdit /></button>
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
//                                 </div>
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