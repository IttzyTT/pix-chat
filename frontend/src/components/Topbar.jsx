import React from 'react';
import logo from '/logga-light.svg';
import { useLocation, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';

function topbar() {
  const loc = useLocation();
  const history = useHistory();
  const globalStore = useNamedContext('global');

  return (
    <>
      <TopbarWrapper>
        {loc.pathname == '/camera' || loc.pathname == `/editProfile/${globalStore.currentUserId}` ? (
          <BackButton onClick={history.goBack} className="material-icons">
            arrow_back_ios
          </BackButton>
        ) : ''}
        <Con>
          <LogoImg src={logo} />
        </Con>
      </TopbarWrapper>
    </>
  );
}

export default topbar;

const TopbarWrapper = styled.div`
  background-color: #434343;
  display: flex;
  color: white;
  min-height: 70px;
  align-items: center;
  width: 100%;
  position: fixed;
`;

const Con = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const LogoImg = styled.img`
  width: 110px;
`;

const LogoText = styled.p`
  font-family: 'montserrat';
  font-size: 18px;
  padding-left: 5px;
`;

const BackButton = styled.i`
  position: absolute;
  left: 25px;
  color: #fff;
`;
