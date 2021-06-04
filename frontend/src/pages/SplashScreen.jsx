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
                  <img className="logoImage" src="./logo.png" alt="logo" />
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
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

.circle1,
.circle2,
.circle3,
.circle4,
.circle5,
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}


.circle1 {
  height: 50rem;
  width: 50rem;
  border-radius: 50%;
  background-color: #8381fd;

  animation-name: circle1;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.circle2 {
  height: 40rem;
  width: 40rem;
  border-radius: 50%;
  background-color: #8f8dfd;

  animation-name: circle2;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.circle3 {
  height: 32rem;
  width: 32rem;
  border-radius: 50%;
  background-color: #9d9bfa;

  animation-name: circle3;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.circle4 {
  height: 25rem;
  width: 25rem;
  border-radius: 50%;
  background-color: #b5b4ff;

  animation-name: circle4;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.circle5 {
  height: 18rem;
  width: 18rem;
  border-radius: 50%;
  background-color: rgba(253, 253, 253, 0.5);

  animation-name: circle5;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.logoImage{
  width: 200px;
  margin-left: 20px;
}
/*
@keyframes circle1 {
  from {
    height: 50rem;
    width: 50rem;
  }

  to {
    height: 51rem;
    width: 51rem;
  }
}

@keyframes circle2 {
  from {
    height: 40rem;
    width: 40rem;
  }

  to {
    height: 41rem;
    width: 41rem;
  }
}
@keyframes circle3 {
  from {
    height: 32rem;
    width: 32rem;
  }

  to {
    height: 33rem;
    width: 33rem;
  }
}
@keyframes circle4 {
  from {
    height: 25rem;
    width: 25rem;
  }

  to {
    height: 26rem;
    width: 26rem;
  }
}
@keyframes circle5 {
  from {
    height: 18rem;
    width: 18rem;
  }

  to {
    height: 19rem;
    width: 19rem;
  }
}*/
`;

const LogoDiv = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

