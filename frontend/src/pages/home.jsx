import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import fetchAllPosts from '../reusable-functions/fetchAllPosts';
import { useParams } from 'react-router';
import Searchbar from '../components/Searchbar';
import { motion } from "framer-motion";
import Chats from "./Chats";

let sseEventlistenerAddedCount = 0;

function Home({ sse }) {
    let globalStore = useNamedContext('global');
    const [allPosts, setAllPosts] = useState([]);

    //experimenting with pagination on Home.jsx
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPosts, setTotalPosts] = useState();

    const showSearch = useParams().showSearch;

    useEffect(async () => {
        try {
            setAllPosts(await fetchAllPosts(globalStore.apiUrl));
        } catch (error) {
            console.log(error);
        }
    }, [showSearch]);

    //pagination experiment on Home.jsx
    useEffect(async () => {
        try {
            let responsePaginated = await fetch(`${globalStore.apiUrl}/posts/pagination?page=${page}`);
            let dataPaginated = await responsePaginated.json();
            setPaginatedPosts(prevArray => [...prevArray, ...dataPaginated.posts]);
            setTotalPosts(dataPaginated.totalPosts);
            console.log('fetch paginated posts ran, set state');
        } catch (error) {
            console.log(error);
        }
        console.log('page var: ' + page);
    }, [page]);
    
    //bug sse eventlistener runs twice when you create a new post
    //bug but fortunately, only one database entry is created
    //bug the variable sseEventlistenerAddedCount is a hack to make it run only once
    useEffect(() => {
        sseEventlistenerAddedCount++;
        if (sseEventlistenerAddedCount === 1) {
            sse.addEventListener('posts', e => {
                setAllPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
                setPaginatedPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
                console.log('sse ran and set state');
            });
        };
    }, [])


    const loadMorePosts = async () => {
        setPage(prevValue => prevValue + 1);
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
                    { paginatedPosts.map(post => (
                        <Postcard
                            key={ post['_id'] }
                            post={ post }
                        />
                    ))}
                    { paginatedPosts.length >= totalPosts ?
                        null :
                        <div id={'load-more'}>
                            <p id={'load-more-text'} onClick={loadMorePosts}>Load more</p>
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
            margin-left: 31%;
        }
    }

    /* above also affects Searchbar component */

    #load-more {
        margin-bottom: 30vh;
        margin-top: 50px;
        text-align: center;
        #load-more-text {
            cursor: pointer;
            margin: 0;
            color: #fff;
            font-size: 25px;
            font-weight: bold;
        }
    }

    @media screen and (min-width: 1200px) {
        background-color: #434343;
        // margin-left: 35%;
    }
`

const Sidebar = styled.div`
    display: none;
    height: 91%;
    width: 30%;
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