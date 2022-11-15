import { axiosPrivate } from './../../api/axios';
import React, { useState } from 'react';
import base64 from 'base-64';
import { useAuth } from '../../State/AuthContext';
import { Box, Button, Flex, Grid, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react';

const Auth = (props) => {
    const [newUser, setNewUser] = useState();
    const { login } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const handleClickPass = () => setShowPass(!showPass);

    const userForm = () => {
        setNewUser(!newUser);
    };

    const singup = async (e) => {
        e.preventDefault();
        const newUser = {
            "email": e.target.email.value,
            "password": e.target.password.value,
            "username": e.target.username.value
        };
        await axiosPrivate.post(`/signUp`, newUser)
            .then(res => {
                login(res.data);
            })
            .catch(e => alert(e.response.data));
    };
    const signin = async (e) => {
        e.preventDefault();
        const userData = {
            "email": e.target.email.value,
            "password": e.target.password.value
        };
        const encodedData = base64.encode(`${userData.email}:${userData.password}`);
        await axiosPrivate.post(`/signin`, {}, { headers: { Authorization: `Basic ${encodedData}` } })
            .then(res => {
                login(res.data);
            })
            .catch(e => alert(e.response.data));
    };
    return (
        <Box
            p='100'
            borderColor='primary.300'
            border="1px"
            borderRadius='lg'
        >
            <Heading
                p='5'
            >Welcome to our Whiteboard!</Heading>
            <Flex
                mt='10'
                mb='5'
                gap='1'
                fontWeight='bold'
                justify='center'
            >
                <Button onClick={userForm} color='primary.100' bg={`${(!newUser) ? 'secondary.200' : 'primary.200'}`} >Log in</Button>
                <Button onClick={userForm} color='primary.100' bg={`${(newUser) ? 'action' : 'primary.200'}`}>Join the tribe!</Button>
            </Flex>
            {newUser &&
                <form onSubmit={singup}>
                    <Grid
                        h='100%'
                        gap='1'
                        color='primary.200'
                        fontWeight='bold'
                    >
                        <Input
                            pr='4.5rem'
                            type='text'
                            placeholder='Username'
                            required
                        />
                        <Input
                            pr='4.5rem'
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            required
                        />
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={showPass ? 'text' : 'password'}
                                placeholder='Enter password'
                                name='password'
                                required
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClickPass}>
                                    {showPass ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button type='submit' color='primary.300' bg='action'>Sign Up</Button>
                    </Grid>
                </form>

            }
            {!newUser &&

                <form onSubmit={signin}>
                    <Grid
                        h='100%'
                        gap='1'
                        color='primary.200'
                        fontWeight='bold'
                    >
                        <Input
                            pr='4.5rem'
                            type='text'
                            placeholder='Username'
                            required
                        />
                        <Input
                            pr='4.5rem'
                            type='email'
                            placeholder='Enter email'
                            name='email'
                            required
                        />
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={showPass ? 'text' : 'password'}
                                placeholder='Enter password'
                                name='password'
                                required
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClickPass}>
                                    {showPass ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button type='submit' color='primary.100' bg='secondary.200'>Log in</Button>
                    </Grid>
                </form>

            }
        </Box >
    );
};

export default Auth;