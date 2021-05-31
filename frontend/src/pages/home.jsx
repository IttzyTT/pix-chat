import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import { useParams } from 'react-router';
import Searchbar from '../components/Searchbar';
import { motion } from "framer-motion";

function Home({ sse }) {
    let globalStore = useNamedContext('global');
    const [allPosts, setAllPosts] = useState([]);

    //pagination basic
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [nbOfDisplayedPosts, setNbOfDisplayedPosts] = useState(8); //increase on click

    const showSearch = useParams().showSearch;

    useEffect(async () => {
        setAllPosts(await fetchAllPosts(globalStore.apiUrl));
    }, [showSearch]);

    useEffect(() => {
        sse.addEventListener('posts', e => {
            setAllPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
        });
    }, [])

    //pagination
    useEffect(() => {
        setDisplayedPosts(allPosts.filter((v,i) => ( 
            i < nbOfDisplayedPosts
        )))
    }, [allPosts])

    const loadMorePosts = () => {
        setNbOfDisplayedPosts(prevValue => prevValue += 8);
        setDisplayedPosts(allPosts.filter((v,i) => ( 
            i < nbOfDisplayedPosts
        )))
    }
    
    return (
        <ContentWrapper>
            { showSearch ? 
            <Searchbar allPosts={allPosts} />
            : 
            <div className={"postcard-flex-parent"}>
                <motion.div 
                    className={"postcard-flex-it"}
                    variants={containerAni}
                    initial={"hidden"}
                    animate={"show"}
                >
                    { displayedPosts.map(post => (
                        <Postcard
                            key={ post['_id'] }
                            post={ post }
                        />
                    ))}
                    { allPosts.length === displayedPosts.length ?
                        null :
                        <div id={'load-more'}>
                            <p id={'load-more-text'} onClick={loadMorePosts}>Load more...</p>
                        </div>
                    }
                </motion.div>
            </div>
            }
        </ContentWrapper>
    )
}

//framer motion
const containerAni = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

//styled components
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

    #load-more {
        margin-bottom: 40vh;
        text-align: center;
        #load-more-text {
            margin: 0;
            padding: 1rem 0;
        }
    }
    @media only screen and (min-width: 768px) {
        --width: 400px;
        --height-4-3-aspect: calc(var(--width) * 0.75);
        #load-more {
            width: var(--width);
            height: var(--height-4-3-aspect);
            margin-bottom: 0;
            #load-more-text {
                position: relative;
                top: 50%;
            }
        }
    }
`

export default Home