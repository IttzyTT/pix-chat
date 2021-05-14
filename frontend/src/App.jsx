import React, { useState } from 'react';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SplashScreen from './pages/SplashScreen';
import styled from 'styled-components';

const Wrapper = styled.html`
    background-color: #434343;
    min-height: 100vh;
`

function App() {
  return (
    <Wrapper className="App">
      <Topbar />
      <Home />
      <Navbar />
    </Wrapper>
  );
}
export default App;
