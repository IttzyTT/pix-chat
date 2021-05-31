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
        let chatPreviews = yourMessages.map(message => message = {
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
        return chatPreviews;
    }

    //Function to show both http-pictures and uploaded ones
    const typeOfPicture = (url) => (
        url.substring(0, 4) === 'http' ?
        url :
        `/uploads/${url}`
    )

    return (
        <Wrapper>
            <Title>Chats</Title>
            <ChatsContainer>
                { createChatPreview().map(chat => (
                        <Link to={`/chat/${chat.postId}`} key={chat['_id']}>
                    <Chat>
                            <img src={typeOfPicture(chat.imageUrl)} />
                            <div className={'chat-text'}>
                                <div className="chat-top-text">
                                    <h5>{chat.caption}</h5>
                                    <p className={'chat-date'}>{chat.createdAt}</p>
                                </div>
                                <p className={'chat-content'}>{chat.content}</p>
                            </div>
                    </Chat>
                        </Link>
                )) }
            </ChatsContainer>
        </Wrapper>
        
        
    )
}

export default Chats

const Wrapper = styled.div`
    width: 90%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 100px;
`
const Title = styled.h1`
    font-size: 20px;
`
const ChatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    a {
        width: 100%;
        color: #F3F3F3;
    }
`
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
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        object-fit: cover;
    }
    h5 {
        margin: 0 0 0 0;
        flex-grow: 1;
    }
    .chat-top-text {
        display: flex;
        width: 100%;
    }
    .chat-content {
        margin: 0.5rem 0 0 0;
        flex-grow: 1;
    }
    .chat-date {
        margin: 0 0 0.1rem 0;
        align-self: flex-end;
        color: #f3f3f38d
    }
`