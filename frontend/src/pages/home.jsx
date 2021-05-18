import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import { useParams } from 'react-router';
import { Searchbar } from '../components/Searchbar';

const ContentWrapper = styled.div`
    padding: 70px 0;
`
function Home() {
    let globalStore = useNamedContext('global');

    const showSearch = useParams().showSearch;

    useEffect(() => {
        fetchAllPosts(globalStore.apiUrl)
            .then(data => globalStore.allPosts = data);
    }, []);
    
    return (
        <ContentWrapper>
            { showSearch ? <Searchbar allPosts={globalStore.allPosts} /> 
            : globalStore.allPosts.map(post => (
                <Postcard 
                    key={ post['_id'] } 
                    post={ post } 
                />
            ))}
        </ContentWrapper>
    )
}

export default Home