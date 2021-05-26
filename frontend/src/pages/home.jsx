import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import { useParams } from 'react-router';
import Searchbar from '../components/Searchbar';

function Home({ sse }) {
    let globalStore = useNamedContext('global');
    const [allPosts, setAllPosts] = useState([]);

    const showSearch = useParams().showSearch;

    useEffect(async () => {
        setAllPosts(await fetchAllPosts(globalStore.apiUrl));
    }, [showSearch]);

    useEffect(() => {
        sse.addEventListener('posts', e => {
            setAllPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
        });
    }, [])
    
    return (
        <ContentWrapper>
            { showSearch ? 
            <Searchbar allPosts={allPosts} />
            : 
            <div className={"postcard-flex-parent"}>
                <div className={"postcard-flex-it"}>
                    {allPosts.map(post => (
                        <Postcard
                            key={ post['_id'] }
                            post={ post }
                        />
                    ))}
                </div>
            </div>}
        </ContentWrapper>
    )
}

const ContentWrapper = styled.div`
    padding: 70px 0;

    /* below also affects Searchbar component */
    .postcard-flex-parent {
        overflow-x: hidden;
        /* ipad and above */
        @media only screen and (min-width: 768px) {
            width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
        }
    }
    .postcard-flex-it {
        --gap: 20px;
        display: flex;
        flex-direction: column;
        gap: var(--gap);
        /* ipad and above */
        @media only screen and (min-width: 768px) {
            flex-direction: row;
            width: fit-content;
            padding: 0 var(--gap);
        }
    }
    /* above also affects Searchbar component */
`

export default Home