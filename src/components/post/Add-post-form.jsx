import axios from './../../api/axios';
import { Text, Textarea, Button, Input } from '@chakra-ui/react';
import { usePosts } from '../../State/PostsContext';
import { useAuth } from '../../State/AuthContext';

function AddPostForm(props) {
    const { updatePosts } = usePosts();
    const { userState } = useAuth();
    const user = userState.loggedUser;
    const addPost = async (e) => {
        e.preventDefault();
        const data = {
            content: e.target.content.value,
            title: e.target.title.value,
            UserId: user.id
        };
        const newPost = await axios.post(`/post`, data, {
            headers: {
                Authorization: `Bearer ${user.access_token}`
            }
        });
        e.target.content.value = '';
        e.target.title.value = '';
        updatePosts(newPost.data);
    };
    return (
        <form onSubmit={addPost}>
            <>
                <Text mb={'8px'}>title</Text>
                <Input type="text" placeholder='goes here' name='title' />
            </>
            <>
                <Text mb='8px'>give it your best</Text>
                <Textarea
                    placeholder='whats on your mind'
                    size='sm'
                    name='content'
                />
            </>
            <Button type='submit' bg='primary.300' color='action'>Post</Button>
        </form>

    );
}

export default AddPostForm;