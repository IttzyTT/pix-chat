import React, { useEffect } from 'react';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import fetchAllUsers from '../reusable-functions/fetchAllUsers';
import { useNamedContext } from 'react-easier';
import styled from 'styled-components';
import ProfilePostInfo from '../components/ProfilePostInfo';
import ProfileUserInfo from '../components/ProfileUserInfo';

function Profile() {

    let globalStore = useNamedContext('global');

    useEffect(() => {
        fetchAllPosts(globalStore.apiUrl)
            .then(data => globalStore.allPosts = data);
        fetchAllUsers(globalStore.apiUrl)
            .then(data => globalStore.allUsers = data);
    }, []);

    return (
        <div>
            {globalStore.allUsers.map( user => (
                <ProfileUserInfo 
                    key={ user['_id'] }
                    user={ user }
                />
            ))}

            <InfoNumber>
                <Posts>
                    <p>Posts</p>
                    <p>{globalStore.allPosts.length}</p>
                </Posts>
                <Favorites>
                    <p>Favorites</p>
                    <p>4</p>
                </Favorites>
            </InfoNumber>
            <Pictures>
                {globalStore.allPosts.map( posts => (
                    <ProfilePostInfo 
                        key={ posts['_id']  }
                        posts={ posts }
                    />
                ))}
            </Pictures>
        </div>
    )
}

export default Profile

const InfoNumber = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 60px 0 60px;
    font-size: 16px; 
    color: white; 
`
const Posts = styled.div` 
    text-align: center;
`
const Favorites = styled.div` 
    text-align: center;
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