import React from 'react';
import styled from 'styled-components';

export default function SplashScreen() {
  return (
    <Container>
      <div className="circle1">
        <div className="circle2">
          <div className="circle3">
            <div className="circle4">
              <div className="circle5">
                <div className="logo">
                  <img src="./logo.png" alt="app logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #7b78fd;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
