import React from 'react';
import styled from 'styled-components';

export default function SplashScreen() {
  return (
    <Container>
      <div className="cirkel1">
        <div className="cirkel2">
          <div className="cirkel3">
            <div className="cirkel4">
              <div className="cirkel5">
                <div className="logo"></div>
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
