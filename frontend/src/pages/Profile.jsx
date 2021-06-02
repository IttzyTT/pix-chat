import React, { useEffect, useState } from 'react';
import { useNamedContext } from 'react-easier';
import { useLocation, Link } from "react-router-dom";
import styled from 'styled-components';

function Profile({ match }) {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [toggle, setToggle] = useState(false);
    const loc = useLocation();
    let globalStore = useNamedContext('global');

    useEffect(() => {
        fetchUser();
        fetchPosts();
    }, [match.params.id]);

    const filterPosts = (posts) => {
        return (posts.filter((post) => (
            post.createdById === match.params.id
        )))
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`${globalStore.apiUrl}/users/${match.params.id}`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${globalStore.apiUrl}/posts/`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.log(error)
        }
    }

    const typeOfPicture = (url) => (
        url.substring(0, 4) === 'http' ?
            url :
            `/uploads/${url}`
    )
    

    return (
        <Wrap>
            <Con>
                <Icon className='material-icons'>account_circle</Icon>
                <InfoEdit>
                    <Name>{user.name}</Name>
                    {loc.pathname !== `/profile/${globalStore.currentUserId}` ? '' : (
                        <Link to={`/editProfile/${user['_id']}`}><Btn>Settings</Btn></Link>
                    )}
                </InfoEdit>
            </Con>
            <InfoNumber>
                <Posts onClick={() => setToggle(false)}>
                    <p>Posts</p>
                    <p>{filterPosts(posts).length}</p>
                </Posts>
                <Favorites onClick={() => setToggle(true)}>
                    <p>Favorites</p>
                    <p>{posts.filter((post) => (
                        post.likedBy.includes(match.params.id)
                    )).length}</p>
                </Favorites>
            </InfoNumber>
            <PicCon>
                <Pictures>
                    {toggle ? (
                        posts.map((post) => (
                            post.likedBy.includes(match.params.id) ?
                            <div>
                                <Post key={post['_id']} src={typeOfPicture(post.imageUrl)} alt='' /> 
                            </div>
                            : ''
                        ))
                    ) : (
                        filterPosts(posts).map((post) => (
                            <div>
                                <Post key={post['_id']} src={typeOfPicture(post.imageUrl)} alt='' />
                            </div>
                        )))}
                </Pictures>
            </PicCon>
        </Wrap>
    )
}

export default Profile

const Wrap = styled.div` 
    @media screen and (min-width: 1280px) {
       margin: 0 280px 0 280px 
    }
`
const Con = styled.div` 
    display: flex;
    justify-content: flex-start;
    margin: 0px 0px 40px 40px;
    align-items: center;
    @media screen and (min-width: 768px) {
        margin-left: 60px;
    }
`
const Icon = styled.i`
    color: white;
    font-size: 100px;
    padding-top: 100px;
    margin-right: 20px;
    @media screen and (min-width: 768px) {
        font-size: 140px;
    }
`
const InfoEdit = styled.div` 
    display: flex;
    flex-direction: column;
    padding-top: 62px; 
`
const Name = styled.p` 
    color: white;
    font-size: 20px;
    @media screen and (min-width: 768px) {
        font-size: 28px;
    }
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
    cursor: pointer;
`
const InfoNumber = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 60px 0 60px;
    font-size: 16px; 
    color: white;
    @media screen and (min-width: 768px) {
        margin: 0px 110px 0 110px;
        font-size: 20px;
    }   
`
const Posts = styled.div` 
    text-align: center;
    cursor: pointer;
`
const Favorites = styled.div` 
    text-align: center;
    cursor: pointer;
`
const PicCon = styled.div`
    height: 490px;
    overflow-y: scroll;
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #3C3B3B;
    }

    &::-webkit-scrollbar {
        width: 12px;
        background-color: #3C3B3B;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }

    @media screen and (min-width: 768px) {
        height: 660px;
    }
    @media screen and (min-width: 1024px) {
        height: 910px;
    }
    @media screen and (min-width: 1280px) {
        height: 800px;
    }
`
const Pictures = styled.div`
    display: flex;
    width: 100%;
    border-top: 1px solid white;
    padding-bottom: 2px;
    flex-wrap: wrap;
    padding-bottom: 6px;
    justify-content: flex-start;
    @media screen and (min-width: 375px) and (max-width: 760px) {
        padding-bottom: 68px;
    }
    @media screen and (min-width: 768px) {
        padding-bottom: 68px;
    }
    @media screen and (min-width: 1024px) {
        padding-bottom: 0;
    }
    @media screen and (min-width: 1280px) {
        padding-bottom: 0;
    }

    div {
        width: 48.9%;
        height: 130px; 
        margin: 2px 2px 2px 2px;
        @media screen and (min-width: 768px) {
            width: 32.48%;
            height: 180px;
            margin: 4px 2.5px 2.5px 4px;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
        @media screen and (min-width: 1024px) {
            width: 32.48%;
            height: 240px;
            margin: 4px 6px 6px 4px;
            &:nth-child(3n) {
                margin-right: 0;
            }
            @media screen and (min-width: 1280px) {
            width: 32%;
            margin: 4px 6px 6px 4px;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
`
const Post = styled.img`
    width: 100%;
    height: 100%;
    display: block;

`