import React, { useEffect, useState } from 'react';
import './normalize.css';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CapturePage from './pages/CapturePage';
import Chats from './pages/Chats';
import PostChat from './pages/PostChat';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import SplashScreen from './pages/SplashScreen';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withContext, useNamedContext } from 'react-easier';
import fetchAllUsers from './reusable-functions/fetchAllUsers';
import Login from './pages/Login';

const apiUrl = 'http://localhost:4000';

let messages = [];

//global store/variables
export default withContext(
  'global',
  {
    apiUrl: apiUrl,
    allUsers: [],
    currentUserId: '', //609d18eea634629d77501077
    messages: messages
  },
  App
);

//Opening up SSE
const sse = new EventSource(`${apiUrl}/sse`);

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #434343;
`;

function App() {
  const globalStore = useNamedContext('global');
  
  useEffect(async () => {
    let allUsers = await fetchAllUsers(globalStore.apiUrl);
    globalStore.allUsers = await allUsers;
  }, [])

  return (
    <Router>
      {globalStore.currentUserId ? 
        <Wrapper className="App">
          <Topbar />
          <Switch>
            <Route path="/" exact             render={props => <Home {...props} sse={sse} />} />
            <Route path="/search/:showSearch" render={props => <Home {...props} sse={sse} />} />
            <Route path="/camera"             render={props => <CapturePage {...props} sse={sse} />} />
            <Route path="/chats"              render={props => <Chats {...props} sse={sse} />} />
            <Route path="/chat/:id"           render={props => <PostChat {...props} sse={sse} />} />
            <Route path="/profile/:id"        render={props => <Profile {...props} sse={sse} />} />
            <Route path="/settings"           render={props => <Settings {...props} sse={sse} />} />
            <Route path="/editProfile/:id"    render={props => <EditProfile {...props} sse={sse} />} />
          </Switch>
          <Navbar />
        </Wrapper>
      : <Login />}
    </Router>
  );
}