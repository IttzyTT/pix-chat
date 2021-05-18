import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

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
    padding-top: 100px;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ImgCon = styled.div`
    width: 40%;
    height: 80%;
    margin-right: 10px;
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

`

const InputSection = styled.section`
    background-color: #F3F3F3;
    position: absolute;
    width: 100%;
    height: 40px;
    bottom: 64px;
    padding-left: 20px;
    display: flex;
    align-items: center;
`

const InputConCon = styled.div`
    width: 80%;
    height: 70%;
    background-color: #EAE8E8;
    position: relative;
`

const InputCon = styled.div`
    width: 80%;
    margin: 0 auto;
    position: relative;
`

const Input = styled.input`
    padding: 40px;
    height: 70%;
    color: black;
`

const ChatCon = styled.div`
    margin-left: 30px;
`

const Messages = styled.p`
    color: #F3F3F3;
`

function PostChat({ match }) {

    const [post, setPost] = useState([]);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    let createdAt = new window.Date(post.createdAt).toLocaleDateString();

    useEffect(() => {
        getSinglePost();
        getMessages();
        // getUsers();
    }, [])

    const getSinglePost = async () => {
        try {
            const response = await fetch(`http://localhost:4000/posts/${match.params.id}`);
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
                {messages.map(message => {
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

            <InputSection>
                <InputConCon>
                    <InputCon>
                        <Input type="text" placeholder='write a message!' />
                    </InputCon>
                </InputConCon>
            </InputSection>
        </Wrapper>
    )
}

export default PostChat
