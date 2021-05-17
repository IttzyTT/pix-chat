import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNamedContext } from 'react-easier';

function ProfileUserInfo({ user }) {
    console.log(user)

    let globalStore = useNamedContext('global');

    return (
        <>
            {user.isLoggedIn == false || user['_id'] !== globalStore.currentUserId ? '' : (
                <Con>
                    <Icon className='material-icons'>account_circle</Icon>
                    <InfoEdit>
                        <Name>{ user.name }</Name>
                        <Link to={`/editProfile/${user['_id']}`}><Btn>Edit Profile</Btn></Link>
                    </InfoEdit>
                </Con>
            )}
        </>
    )
}

export default ProfileUserInfo

const Con = styled.div` 
    display: flex;
    justify-content: flex-start;
    margin: 0px 0px 40px 40px;
`
const Icon = styled.i`
    color: white;
    font-size: 100px;
    padding-top: 100px;
    margin-right: 20px;
`
const InfoEdit = styled.div` 
    display: flex;
    flex-direction: column;
    padding-top: 88px;
`
const Name = styled.p` 
    color: white;
    font-size: 20px; 
`
const Btn = styled.button`
    background-color: #434343; 
    color: white;
    width: 120px;
    height: 32px;
    padding-bottom: 4px;
    border: 1px solid white;
    border-radius: 4px;
    text-align: center;
    font-size: 16px; 
`
