import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';


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

    // const checkPost = () => {
    //     if(thispost.include(you)) {
    //         work
    //     }
    // }

    const allPosts = posts.map(post => {
        return post
    });
    const allMessages = messages.map(message => {
        return message
    });

    console.log(allPosts, allMessages);

    let combinedStuff = [...allPosts, ...allMessages];
    console.log(combinedStuff);

    const filterAllThings = () => {
        combinedStuff.filter(stuff => {
            return (
                stuff.createdById.includes(globalStore.currentUserId)
            )
        });
    }

    // const typeOfPicture = (url) => (
    //     url.substring(0, 4) === 'http' ?
    //     url :
    //     `/uploads/${url}`
    // ) 

    return (
        <Wrapper>
            <Title>Chats</Title>
            <div>
                {combinedStuff.map(stuff => {
                    console.log(stuff.imageUrl);
                    let check = stuff.createdById.includes(globalStore.currentUserId);
                    return (
                        <div>
                            {check ? (
                                <>
                                <img src={stuff.imageUrl} width="100"/>
                                <p>{stuff.caption}</p>
                                    <p>{stuff.content}</p>
                                </>
                            ) : null}
                            
                        </div>
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