import React, { useEffect, useState } from 'react';
import logo from '/logga-light.svg';
import { useLocation, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import Searchbar from './Searchbar';

function Topbar() {
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
          <Link to="/">
            <LogoImg src={logo} />
          </Link>
          <Search to='/search/true'>
          <SearchIcon className="material-icons">search</SearchIcon>
          <SearchText>Search</SearchText>
          </Search>
          <Profile to={`/profile/${globalStore.currentUserId}`}>
            <ProfileIcon className="material-icons">account_circle</ProfileIcon>
          </Profile>
        </Con>
      </TopbarWrapper>
    </>
  );
}

export default Topbar;

const TopbarWrapper = styled.div`
  background-color: #434343;
  display: flex;
  color: white;
  min-height: 70px;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  z-index: 1;
  @media screen and (min-width: 1200px) {
    justify-content: flex-start;
    margin: 0 auto;
  }
`;

const Con = styled.div`
  display: flex;
  align-items: center;
  
  margin: 0 auto;
  @media screen and (min-width: 1200px) {
    width: 80%;
    justify-content: space-between;
  }
`;

const Profile = styled(Link)`
  color: #fff;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const ProfileIcon = styled.i`
  font-size: 45px;
`

const Search = styled(Link)`
  display: flex;
  align-items: center;
  color: #fff;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const SearchIcon = styled.i`
  font-size: 45px;
`;

const SearchText = styled.span`

`;

const LogoImg = styled.img`
  width: 150px;
`;

const LogoText = styled.p`
  font-family: 'montserrat';
  font-size: 18px;
  padding-left: 5px;
`;

const BackButton = styled.i`
  position: absolute;
  cursor: pointer;
  left: 25px;
  color: #fff;
`;

const Burger = styled.div`
  display: none;
  @media screen and (min-width: 1200px) {
    display: flex;
  }
`