import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';


function Chats() {
    const [post, setPost] = useState ({});
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
            console.log(data['createdAt']);
            setMessage(data);
            } catch (error) {
                console.log(error)
            }
    }

    const fetchAllPosts = async () => {

        try {
            const response = await fetch(`http://localhost:4000/posts`);
            const data = await response.json(); 
            console.log(data.createdAt);
            setPost(data);
        } catch (error) {
            console.log(error)
        }
    }

    // const filterMessages = (post) => {
    //     return(
    //         post.filter(p => (
    //             p.createdById.include(globalStore.currentUserId)
    //         ))
    //     ) 
    // }

    return (
        <Wrapper>
            <Title>Chats</Title>
            <div>
                {post.map(p => {
                    return (
                         
                        console.log('lots of posts')


                    )
                })}
            </div>
        </Wrapper>
        
        
    )
}

export default Chats

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