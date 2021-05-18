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

//global store/variables
export default withContext(
  'global',
  {
    apiUrl: 'http://localhost:4000',
    allUsers: [],
    allPosts: [],
    currentUserId: '' //609d18eea634629d77501077
  },
  App
);


const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #434343;
`;

function App() {
  const globalStore = useNamedContext('global');
  
  useEffect(() => {
    fetchAllUsers(globalStore.apiUrl)
      .then(data => globalStore.allUsers = data);
  }, [])

  const loginCheck = (component) => (
    globalStore.currentUserId ? component : Login
  )

  return (
    <Router>
      <Wrapper className="App">
        <Topbar />
        <Switch>
          <Route path="/" exact component={loginCheck(Home)} />
          <Route path="/search/:showSearch" component={loginCheck(Home)} />
          <Route path="/camera" component={loginCheck(CapturePage)} />
          <Route path="/chats" component={loginCheck(Chats)} />
          <Route path="/chat/:id" component={loginCheck(PostChat)} />
          <Route path="/profile/:id" component={loginCheck(Profile)} />
          <Route path="/settings" component={loginCheck(Settings)} />
          <Route path="/editProfile/:id" component={loginCheck(EditProfile)} />
        </Switch>
        <Navbar />
      </Wrapper>
    </Router>
  );
}