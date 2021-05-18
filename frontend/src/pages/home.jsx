import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import { useParams } from 'react-router';

const ContentWrapper = styled.div`
    padding: 70px 0;
`
function Home() {
    let globalStore = useNamedContext('global');

    const showSearch = useParams().showSearch;
    if (showSearch) {
        console.log('show the searchbar');
    } else {
        console.log('no searchbar for you');
    }

    useEffect(() => {
        fetchAllPosts(globalStore.apiUrl)
            .then(data => globalStore.allPosts = data);
    }, []);
    
    return (
        <ContentWrapper>
            {globalStore.allPosts.map(post => (
                <Postcard 
                    key={ post['_id'] } 
                    post={ post } 
                />
            ))}
        </ContentWrapper>
    )
}

export default Home