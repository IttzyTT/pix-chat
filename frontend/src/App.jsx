import React, { useEffect, useState } from 'react';
import './normalize.css';
import './App.css';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Camera from './pages/Camera';
import Chats from './pages/Chats';
import PostChat from './pages/PostChat';
import Profile from './pages/Profile';
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

//global store/variables
export default withContext(
  'global',
  {
    apiUrl: apiUrl,
    allUsers: [],
    currentUserId: '' //609d18eea634629d77501077
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
  const [triggerPostsFetch, setTriggerPostsFetch] = useState([]);
  const [loading, setLoading] = useState(true)

  //the idea is to trigger a new "normal fetch" with the sse-message to avoid duplicates-bug
  useEffect(() => {
    sse.addEventListener('posts', e => {
      setTriggerPostsFetch([...JSON.parse(e.data)]);
    });
  }, [])
  
  useEffect(async () => {
    let allUsers = await fetchAllUsers(globalStore.apiUrl);
    globalStore.allUsers = await allUsers;
  }, [])

  //Loading 
  useEffect(() => {
      setTimeout(() => setLoading(false), 4000)
  }, [])

  return (
    <>
    {loading === false ? (
    <Router>
    {globalStore.currentUserId ? 
      <Wrapper className="App">
        <Topbar />
        <Switch>
          <Route path="/" exact>
            <Home triggerPostsFetch={triggerPostsFetch} />
          </Route>
          <Route path="/search/:showSearch/:query?" render={props => <Home {...props} sse={sse} />} />
          <Route path="/camera"                     render={props => <Camera {...props} sse={sse} globalStore={globalStore} />} />
          <Route path="/chats"                      render={props => <Chats {...props} sse={sse} />} />
          <Route path="/chat/:id"                   render={props => <PostChat {...props} sse={sse} />} />
          <Route path="/profile/:id"                render={props => <Profile {...props} sse={sse} />} />
          <Route path="/editProfile/:id"            render={props => <EditProfile {...props} sse={sse} />} />
        </Switch>
        <Navbar />
      </Wrapper>
    : <Login />}
  </Router>

    ) : (
      <SplashScreen />
    )}
  
    </>

  );
}