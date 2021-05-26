import React, { useEffect, useRef, useState } from 'react'
import { useNamedContext } from 'react-easier';
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom";
import displayCreatorName from '../reusable-functions/displayCreatorName';

function Postcard({ post }) {
    const globalStore = useNamedContext('global');
    const [likeToggle, setLikeToggle] = useState(false);
    const [postCaption, setPostCaption] = useState(post.caption);
    const captionRef = useRef(null);

    let createdAt = new window.Date(post.createdAt).toLocaleDateString();

    const isLiked = ({ likedBy }, currentUserId) => (
        Boolean(likedBy.filter(v => v === currentUserId).length)
    )

    const patchThisPost = (patchBodyObject) => (
        fetch(`${globalStore.apiUrl}/posts/${post['_id']}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchBodyObject)
        })
    )

    const likeHandler = async () => {
        let patchedPost;
        if (likeToggle) {
            patchedPost = {
                ...post,
                'likedBy':
                    [...post.likedBy
                        .filter(id => id !== globalStore.currentUserId)]
            };
            try {
                await patchThisPost(patchedPost);
            } catch (error) {
                console.log(error);
            }
            setLikeToggle(false);
        } else {
            patchedPost = {
                ...post,
                'likedBy':
                    [...post.likedBy, globalStore.currentUserId]
            };
            try {
                await patchThisPost(patchedPost);
            } catch (error) {
                console.log(error);
            }
            setLikeToggle(true);
        }
    }

    useEffect(() => {
        setLikeToggle(isLiked(post, globalStore.currentUserId));
    }, [post])

    //Function to show both http-pictures and uploaded ones
    const typeOfPicture = (url) => (
        url.substring(0, 4) === 'http' ?
        url :
        `/uploads/${url}`
    )

    //Shorten the caption-text if overflow
    useEffect(() => {
        if (captionRef.current.scrollWidth > captionRef.current.clientWidth) {
            setPostCaption(prevValue => prevValue.substring(0, (prevValue.length - 4)).concat('...'));
        }
    },[postCaption]);
    
    return (
        <Section>
            <Div>
                <Link to={`/profile/${post.createdById}`}>{displayCreatorName(post, globalStore.allUsers)}</Link>
                { post.location.show ?
                <Link to={`/search/true/city=${post.location.city}`}>
                    <p>{post.location.city}, {post.location.country} <Location className='material-icons'>location_on</Location></p>
                </Link>
                : null }
            </Div>
            <Link to={`/chat/${post['_id']}`}>
                <ImgCon className={'postcard-img-container'}>
                    <Image src={typeOfPicture(post.imageUrl)} alt={post.caption} className={'postcard-img'} />
                </ImgCon>
            </Link>
            <div className="just-below-image">
                <TitleCon>
                    <Link to={`/chat/${post['_id']}`}>
                        <Title ref={captionRef}>{postCaption}</Title>
                    </Link>
                    <IconCon>
                        <div onClick={likeHandler}>
                            {
                                !likeToggle ?
                                    <i className='material-icons like-icon-btn'>favorite_border</i>
                                    :
                                    <i className='material-icons like-icon-btn'>favorite</i>
                            }
                        </div>
                        <i className='material-icons chat-icon-btn'>chat_bubble_outline</i>
                    </IconCon>
                </TitleCon>
                <Date>{createdAt}</Date>
            </div>
            <TextTags>
                <Tags>
                    { post.tags[0].length ?
                        post.tags.map((tag, index) => (
                            <Link to={`/search/true/tag=${tag}`} key={index}>
                                <Tag key={index}>
                                    <TagText>{tag}</TagText>
                                </Tag>
                            </Link>
                        ))
                        : null
                    }
                </Tags>
            </TextTags>
        </Section>
    )
}

export default Postcard;

const loadAni = keyframes`
    from    { opacity: 0 }
    to      { opacity: 1 }
`

const Section = styled.section`
    --text-color: #F3F3F3;
    --theme-color: #7B78FD;
    --heart-color: #FD8078;
    animation: ${loadAni} .3s linear;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
    width: 100vw;
    a {
        color: var(--text-color);
    }
    .just-below-image {

    }
    /* ipad and above */
    @media only screen and (min-width: 768px) {
        --width: 400px;
        --height-4-3-aspect: calc(var(--width) * 0.75);
        width: var(--width);
        .postcard-img {
            object-fit: cover;
            width: var(--width);
            height: var(--height-4-3-aspect);
            position: relative;
        }
        .postcard-img-container {
            width: var(--width);
            height: var(--height-4-3-aspect);
            padding-bottom: 0%;
        }
    }
`

const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    color: var(--text-color);
    width: 95%;
    p {
        margin: 0
    }
`
const TitleCon = styled.div`
    width: calc(100% - 40px);
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 55px;
    a {
        overflow: hidden;
    }
    margin: 0 20px;
`
const IconCon = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 55px;
    div {
        display: flex;
        align-items: center;
    }
    div > * {
        transform: translateY(-1px);
    }
    .like-icon-btn {
        color: var(--heart-color);
    }
    .chat-icon-btn {
        color: var(--theme-color);
    }
`
const TextTags = styled.div`
    color: var(--theme-color);
`
const Title = styled.h3`
    margin: 0;
    font-size: 30px;
    color: var(--text-color);
    white-space: nowrap;
`
const Tags = styled.div`
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-left: 20px;
`
const Tag = styled.div`
   width: 80px;
   height: 20px;
   border: 1px solid var(--theme-color);
   border-radius: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
`

const TagText = styled.p`
    margin: 0;
    padding: 0;
    padding-bottom: 3.5px;
    color: var(--theme-color);
`

const Location = styled.i`
    font-size: 12px;
`

const Date = styled.p`
    color: var(--text-color);
    margin: 0 20px;
    font-size: 10px;
`

const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
`

const ImgCon = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 75%;
    background-color: transparent;
`