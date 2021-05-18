import React, { useEffect, useState } from 'react'
import { useNamedContext } from 'react-easier';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import displayCreatorName from '../reusable-functions/displayCreatorName';

function Postcard({ post }) {
    const globalStore = useNamedContext('global');
    const [likeToggle, setLikeToggle] = useState(false);

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

    return (
        <Section>
            <Div>
                <Link to={`/profile/${post['_id']}`}>{displayCreatorName(post, globalStore.allUsers)}</Link>
                <p>{post.location.city}, {post.location.country} <Location className='material-icons'>location_on</Location></p>
            </Div>
            <TextTags>
                <Link to={`/chat/${post['_id']}`}>
                    <ImgCon>
                        <Image src={post.imageUrl} alt={post.caption} />
                    </ImgCon>
                </Link>
                <TitleCon>
                    <Link to={`/chat/${post['_id']}`}>
                        <Title>{post.caption}</Title>
                    </Link>

                    <IconCon>
                        <div onClick={likeHandler}>
                            {
                                !likeToggle ?
                                    <i className='material-icons'>favorite_border</i>
                                    :
                                    <i className='material-icons'>favorite</i>
                            }
                        </div>
                        <i className='material-icons'>chat_bubble_outline</i>
                    </IconCon>
                </TitleCon>
                <Date>{createdAt}</Date>
                <Tags>
                    {post.tags.map((tag, index) => (
                        <Tag key={index}>
                            <TagText>{tag}</TagText>
                        </Tag>
                    ))}
                </Tags>
            </TextTags>
        </Section>
    )
}

export default Postcard;

const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    color: #F3F3F3;
    width: 95%;
    margin: 0 auto;
`
const TitleCon = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
`
const IconCon = styled.div`
    display: flex;
    justify-content: space-between;
    width: 55px;
`
const TextTags = styled.div`
    color: #7B78FD;
`
const Title = styled.h3`
    margin: 0;
    padding-bottom: 7px;
    font-size: 30px;
    color: #F3F3F3;
`
const Tags = styled.div`
    margin-left: 20px;
    display: flex;
    margin-left: 20px;
`
const Tag = styled.div`
   width: 80px;
   height: 20px;
   border: 1px solid #7B78FD;
   border-radius: 50px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   margin-right: 10px;
`

const TagText = styled.p`
    margin: 0;
    padding: 0;
    padding-bottom: 3.5px;
`

const Location = styled.i`
    font-size: 12px;
`

const Date = styled.p`
    color: #F3F3F3;
    margin-left: 20px;
    margin-top: -25px; 
    font-size: 10px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ImgCon = styled.div`
    width: 100%;
    height: 300px;
`

const Section = styled.section`
    margin-bottom: 20px;
`