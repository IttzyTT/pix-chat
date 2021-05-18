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
    bottom: 64px;
    
`

const Input = styled.input`
    width: 80%;
    background-color: #EAE8E8;
    border: 1px solid red;
`
function PostChat({ match }) {

    const [post, setPost] = useState({});

    let createdAt = new window.Date(post.createdAt).toLocaleDateString();

    useEffect(() => {
        getSinglePost();
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
                <p>messages goes here</p>
            </MessageSection>

            <InputSection>
                <Input type="text" placeholder='write a message!'/>
            </InputSection>
        </Wrapper>
    )
}

export default PostChat
