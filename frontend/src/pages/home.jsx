import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import { useParams } from 'react-router';
import Searchbar from '../components/Searchbar';
import { motion } from "framer-motion";
import Chats from "./Chats";

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
    }, [allPosts, nbOfDisplayedPosts])

    const loadMorePosts = () => {
        setNbOfDisplayedPosts(prevValue => prevValue += 8);
    }
    
    return (
        <ContentWrapper>
            { showSearch ? 
            <Searchbar allPosts={allPosts} />
            : 
            <div className={"postcard-flex-parent"}>
                <Sidebar>
                    <Chats />
                </Sidebar>
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
                        <div id={'load-more'} onClick={loadMorePosts}>
                            <p id={'load-more-text'}>Load more</p>
                            <motion.i className="medium material-icons"
                                animate={{ y: 8 }}
                                transition={{repeat: Infinity, repeatType: "reverse", duration: 1}}
                            >
                                expand_more
                            </motion.i>
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
        display: flex;
        justify-content: center;
        @media screen and (min-width: 1200px) {
            margin-left: 5%;
        }
    }

    /* above also affects Searchbar component */

    #load-more {
        margin-bottom: 30vh;
        margin-top: 50px;
        text-align: center;
        cursor: pointer;
        #load-more-text {
            margin: 0;
            color: #fff;
            font-size: 25px;
            font-weight: bold;
        }
    }

    @media screen and (min-width: 1200px) {
        background-color: #434343;
    }
`

const Sidebar = styled.div`
    display: none;
    height: 91%;
    background-color: #4c4c4c;
    position: fixed;
    left: 0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    @media screen and (min-width: 1200px) {
        display: flex;
    }
`

export default Home