import React from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';

function ProfilePostInfo({ posts }) {

    let globalStore = useNamedContext('global');

    return (
        <>
            {posts.createdById !== globalStore.currentUserId ? '' : (
                    <Post src={posts.imageUrl} alt='' />
                )}
        </>
    )
}

export default ProfilePostInfo

const Post = styled.img` 
    width: 49.5%;
    margin-bottom: 5px;
    height: auto;
`