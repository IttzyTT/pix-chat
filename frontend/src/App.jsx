import React, { useState } from 'react';
import './normalize.css';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import CapturePage from './pages/CapturePage';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SplashScreen from './pages/SplashScreen';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #434343;
`

function App() {
  return (
    <Router>
      <Wrapper className="App">
        <Topbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/camera" component={CapturePage} />
          <Route path="/chats" component={Chats} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={Settings} />
        </Switch>
        <Navbar />
      </Wrapper>
    </Router>
  );
}
export default App;
