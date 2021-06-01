import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import { Link } from "react-router-dom";


function Chats() {
    const [posts, setPost] = useState ([]);
    const [messages, setMessage] = useState ([]);
    let globalStore = useNamedContext('global');


    useEffect(() => {
       fetchAllPosts();
       fetchAllMessages();
    }, [])

    const fetchAllMessages = async () => {
       
        try {
            const response = await fetch(`http://localhost:4000/postMessages`);
            const data = await response.json(); 
            setMessage(data);
            } catch (error) {
                console.log(error)
            }
    }

    const fetchAllPosts = async () => {

        try {
            const response = await fetch(`http://localhost:4000/posts`);
            const data = await response.json(); 
            setPost(data);
        } catch (error) {
            console.log(error)
        }
    }

    const createChatPreview = () => {
        let yourMessages = messages.filter(message => message.createdById === globalStore.currentUserId);
        let uniquePostIds = new Set(yourMessages.map(m => m.postId));
        //add corresponding images and imagecaptions to messages
        yourMessages = yourMessages.map(message => message = {
                                                                ...message, 
                                                                'imageUrl': posts
                                                                            .filter(post => message.postId === post['_id'])
                                                                            .map(post => post.imageUrl)
                                                                            .toString(),
                                                                'caption': posts
                                                                            .filter(post => message.postId === post['_id'])
                                                                            .map(post => post.caption)
                                                                            .toString(),
                                                                'createdAt': new window.Date(message.createdAt).toLocaleDateString()
                                                                }
                                            )
                                        .sort((a,b) => (
                                            a.createdAt > b.createdAt ? -1 : 1
                                        ))
        let chatPreviews = [];
        //only the latest message sent by you in each chatroom
        uniquePostIds.forEach(id => chatPreviews.unshift(yourMessages.filter(m => m.postId === id)[0]))
        return chatPreviews;
    }

    //Function to show both http-pictures and uploaded ones
    const typeOfPicture = (url) => (
        url.substring(0, 4) === 'http' ?
        url :
        `/uploads/${url}`
    )

    return (
        <AllWrapper> 
            <Wrapper>
                <Title>Your latest sent chats</Title>
                <ChatsContainer>
                    { createChatPreview().map(chat => (
                            <Link to={`/chat/${chat.postId}`} key={chat['_id']}>
                                <Chat>
                                    <img src={typeOfPicture(chat.imageUrl)} />
                                    <div className={'chat-text'}>
                                        <h5>{chat.caption}</h5>
                                        <p className={'chat-content'}>You: {chat.content}</p>
                                        <p className={'chat-date'}>Sent: {chat.createdAt}</p>
                                    </div>
                                </Chat>
                            </Link>
                    )) }
                </ChatsContainer>
            </Wrapper>
        </AllWrapper>
        
        
    )
}

export default Chats

const Wrapper = styled.div`
    width: 90%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 100px;
    padding-bottom: 100px;
   
`;

const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 3rem;

      @media screen and (min-width: 481px) and (max-width: 768px) {
        font-size: 25px;
        margin-bottom: 3rem;   
    } 
        @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 30px;
    }
`;

const ChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    a {
        width: 100%;
        color: #F3F3F3;    
    }
        @media screen and (max-width: 480px){
        font-size: 20px;
        margin: 0;
    }

`;

const Chat = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;

    .chat-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        gap: 0;       
        border-bottom: 1px solid #f3f3f334;
           
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        object-fit: cover;
    }
    h5 {
        margin: 0.7rem 0 0 0;
        flex-grow: 1;
        @media screen and (min-width: 768px) and (max-width: 1024px) {
            font-size: 2rem;  
        }
        
    }
    .chat-content {
        margin: 0.5rem 0 0 0;
        color: #f3f3f3a7;
        font-size: 15px;
        @media screen and (min-width: 768px) and (max-width: 1024px) {
            font-size: 23px;
        }
    }
    .chat-date {
        margin: 0.2rem 0 1.1rem 0;
        color: #f3f3f3a7;
        font-size: 15px;   
        @media screen and (min-width: 768px) and (max-width: 1024px) {
            font-size: 23px;
        }
    }
    
`;

const AllWrapper = styled.div `

    img {
        @media screen and (max-width: 480px) {
            width: 100px;
            height: 100px;
            border-radius: 50px;
            object-fit: cover;
    }
        @media screen and (min-width: 481px) and (max-width: 768px) {
            width: 125px;
            height: 125px;
            border-radius: 75px;
            object-fit: cover;
    }
        @media screen and (min-width: 768px) and (max-width: 1024px) {
            width: 150px;
            height: 150px;
            border-radius: 100px;
            object-fit: cover;
        }
    }
`;