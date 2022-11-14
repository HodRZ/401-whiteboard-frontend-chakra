import React from 'react';
import AddPostForm from './Add-post-form';
import PostsCard from './PostsCard';
import { Grid, GridItem } from '@chakra-ui/react';
import { usePosts } from '../../State/PostsContext';
import { useAuth } from '../../State/AuthContext';
function Post(props) {
    const { state } = usePosts();
    const { userState } = useAuth();


    return (
        <>
            <AddPostForm />
            <Grid
                h='100%'
                gap={4}
                autoFlow="row dense"
                color='blackAlpha.700'
                fontWeight='bold'
            >
                {state.posts &&
                    state.posts.map((post) => {
                        let author = {};
                        if (post.UserId === userState.loggedUser.id) {
                            author = userState.loggedUser;
                        }
                        return (
                            <GridItem
                                border="2px"
                                borderColor="blackAlpha.400"
                                key={post.id}
                            >
                                <PostsCard post={post} author={author} />
                            </GridItem>
                        );
                    })
                }
            </Grid>
        </>
    );
}

export default Post;