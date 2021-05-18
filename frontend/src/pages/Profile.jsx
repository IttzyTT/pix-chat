import React, { useEffect, useState } from 'react';
// import fetchAllPosts from '../reusable-functions/fetchAllPosts';
// import fetchAllUsers from '../reusable-functions/fetchAllUsers';
import { useNamedContext } from 'react-easier';
import { useLocation, Link } from "react-router-dom";
import styled from 'styled-components';
// import ProfilePostInfo from '../components/ProfilePostInfo';
// import ProfileUserInfo from '../components/ProfileUserInfo';

function Profile({ match }) {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const loc = useLocation();
    let globalStore = useNamedContext('global');

    useEffect(() => {
        fetchUser();
        fetchPosts();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${match.params.id}`);
            const data = await response.json();
            setUser(data)
        } catch(error) {
            console.log(error)
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:4000/posts/${match.params.id}`);
            const data = await response.json();
            setPosts(data)
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* {globalStore.allUsers.map( user => (
                <ProfileUserInfo 
                    key={ user['_id'] }
                    user={ user }
                />
            ))} */}
            <Con>
                <Icon className='material-icons'>account_circle</Icon>
                <InfoEdit>
                    <Name>{ user.name }</Name>
                    {loc.pathname !== `/profile/${globalStore.currentUserId}` ? '' : (
                        <Link to={`/editProfile/${user['_id']}`}><Btn>Edit Profile</Btn></Link>
                    )}
                </InfoEdit>
            </Con>

            <InfoNumber>
                <Posts>
                    <p>Posts</p>
                    <p>{posts.length}</p>
                </Posts>
                <Favorites>
                    <p>Favorites</p>
                    <p>4</p>
                </Favorites>
            </InfoNumber>
            <Pictures>
            <Post key={posts['_id']} src={posts.imageUrl} alt='' />
                {/* {posts.map( post => {
                    return <Post key={post['_id']} src={post.imageUrl} alt='' />
                    
                    // <ProfilePostInfo 
                    //     key={ posts['_id']  }
                    //     posts={ posts }
                    // />
                })} */}
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
const Post = styled.img` 
    width: 49.5%;
    margin-bottom: 5px;
    height: auto;
`