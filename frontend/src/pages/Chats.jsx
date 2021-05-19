import React from 'react'
import styled from 'styled-components'
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import fetchAllUsers from '../reusable-functions/fetchAllUsers';


const Wrapper = styled.div`
padding-top: 100px;
`
const Title = styled.h1`
font-size: 20px;
`
const Date = styled.p`
color: #FFFF;
`
const Caption = styled.h2`
color: #5590e7;
`


function Chats() {

    const getAllPosts = async () = {
       
    }
    try {
            const response = await fetch(`http://localhost:4000/postsmessages/`);
            const data = await response.json(); 
            console.log(data)
        } catch (error) {
            console.log(error)
    }


    return (
        <Wrapper>
            <Title>Chats</Title>
            
        <Date>{createdAt}</Date>
        <Caption>{post.caption}</Caption>

        <MessageList>
            <p> Her comes a message list!</p>
        </MessageList>

        </Wrapper>
        
        
    )
}

export default Chats
