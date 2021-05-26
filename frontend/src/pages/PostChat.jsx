import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ChatFunction from '../components/ChatFunction';
import { useNamedContext } from 'react-easier';

function PostChat({ match, sse }) {

    const [post, setPost] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    let createdAt = new window.Date(post.createdAt).toLocaleDateString();
    let globalStore = useNamedContext('global');

    useEffect(() => {
        getSinglePost();
        getMessages();
        // getUsers();
        // startSSE();
    }, []);

    const startSSE = () => {
    
        sse.addEventListener('postMessages', e => {
            setAllPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
        });
      }
      
    const getSinglePost = async () => {
        try {
            const response = await fetch(`${globalStore.apiUrl}/posts/${match.params.id}`);
            const data = await response.json();
            console.log(data);
            setPost(data);
        } catch (error) {
            console.log(error)
        }
    }

    

    const getMessages = async () => {
        try {
            const response = await fetch(`http://localhost:4000/postMessages`);
            const data = await response.json();
            console.log(data);
            setMessages(data);
        } catch (error) {
            console.log(error)
        }
    }


    // const getUsers = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/users`);
    //         const data = await response.json();
    //         console.log(data);
    //         setUsers(data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    
    const filterMessages = messages => {
        return(
            messages.filter(message => (
                message.postId === match.params.id
            ))
        )
        
    }

    return (
        <Wrapper>
            <Content>
                <ImgCon>
                    <Img src={post.imageUrl} />
                </ImgCon>
                <InfoCon>
                    {/* <p>{post.location.city}, {post.location.country} <Location className='material-icons'>location_on</Location></p> */}
                    <Date>{createdAt}</Date>
                    <Caption>{post.caption}</Caption>
                </InfoCon>
            </Content>

            <MessageSection>
                {filterMessages(messages).map(message => {
                    return (    
                        <ChatCon key={message['_id']}>
                            <Messages>{message.content}</Messages>
                        </ChatCon>
                    )
                })}

                {/* {users.map(user => {
                    return(
                        <p>{user.name}</p>
                    )
                })} */}
            </MessageSection>

            <div>
                <ChatFunction post={post} startSSE={startSSE} />
            </div>
        </Wrapper>
    )
}

export default PostChat

const Content = styled.div`
    height: 150px;
    background-color: #373737;
    display: flex;
    align-items: center;
    color: #F3F3F3;
`

const InfoCon = styled.div`
    width: 200px;
`

const Wrapper = styled.div`
    padding-top: 70px;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ImgCon = styled.div`
    width: 40%;
    height: 80%;
    margin: 0 14px 0 14px;
`

const Location = styled.i`
    font-size: 12px;
`

const Date = styled.p`
    font-size: 10px;
`

const Caption = styled.h1`
    font-size: 20px;
`

const MessageSection = styled.section`
    overflow-y: scroll;
    height: 60vh;
    // padding-bottom: 80px;
`

const ChatCon = styled.div`
    margin-left: 30px;
`

const Messages = styled.p`
    color: #F3F3F3;
`
