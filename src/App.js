import React from 'react';
import {
  ChakraProvider,
  Box,
  Spinner,
  VStack,
  Grid,
} from '@chakra-ui/react';
import Hero from './components/main/Hero';
import Sidebar from './components/main/Sidebar';
import Post from './components/post/Post';
import Auth from './components/user/Auth';
import { AppDataProvider } from './State/PostsContext';
import { useAuth } from './State/AuthContext';
import { newTheme } from './theme';

function App() {
  const { userState, loading } = useAuth();
  return (
    <ChakraProvider theme={newTheme}>
      <Sidebar />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Hero />
            <AppDataProvider>
              {(loading) ?
                <Spinner /> :
                ((userState.isLoggedIn && userState.loggedUser) ?
                  <Post /> :
                  <Auth />)
              }
            </AppDataProvider>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
