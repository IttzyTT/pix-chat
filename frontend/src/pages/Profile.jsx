import React, { useEffect } from 'react'
import styled from 'styled-components'
import wolf from '/wolf.jpg';
import { Link } from "react-router-dom";
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import displayCreatorName from '../reusable-functions/displayCreatorName';
import { useNamedContext } from 'react-easier';

function Profile() {

    let globalStore = useNamedContext('global');

console.log(globalStore.allUsers);

    useEffect(() => {
        fetchAllPosts(globalStore.apiUrl)
            .then(data => globalStore.allPosts = data);
    }, []);

    return (
        <div>
            <Con>
                <Icon className='material-icons'>account_circle</Icon>
                <InfoEdit>
                    <Name>{displayCreatorName(post, globalStore.allUsers)}</Name>
                    <Link to='/editProfile'><Btn>Edit Profile</Btn></Link>
                </InfoEdit>
            </Con>
            <InfoNumber>
                <Posts>
                    <p>Posts</p>
                    <p>13</p>
                </Posts>
                <Favorites>
                    <p>Favorites</p>
                    <p>20</p>
                </Favorites>
            </InfoNumber>
            <Pictures>
                <Wolf src={wolf} alt='' />
                <Wolf src={wolf} alt='' />
                <Wolf src={wolf} alt='' />
                <Wolf src={wolf} alt='' />
                <Wolf src={wolf} alt='' />
            </Pictures>
        </div>
    )
}

export default Profile

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
const InfoNumber = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 60px 0 60px;
    font-size: 16px; 
    color: white; 
`
const Pictures = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    border-top: 1px solid white;
    padding-bottom: 2px;
    flex-wrap: wrap;
    justify-content: space-between
`
const Posts = styled.div` 
    text-align: center;
`
const Favorites = styled.div` 
    text-align: center;
`

const Wolf = styled.img` 
    width: 49.5%;
    margin-bottom: 5px;
    height: auto;
`