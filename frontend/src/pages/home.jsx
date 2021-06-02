import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';
import Postcard from '../components/Postcard';
import { useParams } from 'react-router';
import Searchbar from '../components/Searchbar';
import { motion } from "framer-motion";
import Chats from "./Chats";

function Home({ sse }) {

    //bug sometimes 2 posts occur from one posting 
    //bug but fortunately, only one database entry is created 
    //comment Kan ha att göra med useEffect-cleanup, kanske behöver mer av det 

    let globalStore = useNamedContext('global');

    //experimenting with pagination on Home.jsx
    const [paginatedPosts, setPaginatedPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPosts, setTotalPosts] = useState();
    
    const showSearch = useParams().showSearch;

    //pagination experiment on Home.jsx
    useEffect(async () => {
        try {
            let responsePaginated = await fetch(`${globalStore.apiUrl}/posts/pagination?page=${page}`);
            let dataPaginated = await responsePaginated.json();
            setPaginatedPosts(prevArray => [...prevArray, ...dataPaginated.posts]);
            setTotalPosts(dataPaginated.totalPosts);
            console.log('fetch paginated posts ran, set state');
            sse.addEventListener('posts', e => {
                setPaginatedPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
            });
            console.log('sse event ran', paginatedPosts);
        } catch (error) {
            console.log(error);
        }
        console.log('page var: ' + page);
        return () => {
            sse.removeEventListener('posts', e => {
                setPaginatedPosts(prevArray => [...JSON.parse(e.data), ...prevArray]);
            })
        }
    }, [page]);

    const loadMorePosts = async () => {
        setPage(prevValue => prevValue + 1);
        console.log('load more posts function ran');
    }
    
    return (
        <ContentWrapper>
            { showSearch ? 
            <Searchbar />
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

// [
//     {
//         "location":{"city":"Stockholm","country":"Sweden","show":true},
//         "tags":["app","android","live-experience"],
//         "likedBy":[],
//         "_id":"60b74cba7354d008e0bf22ce",
//         "caption":"Looks like an app to me",
//         "imageUrl":"60a3c33d5a4a1f1472c71ee9_1622625466973.jpeg",
//         "createdById":"60a3c33d5a4a1f1472c71ee9",
//         "createdAt":"2021-06-02T09:17:46.972Z",
//         "updatedAt":"2021-06-02T09:17:46.972Z",
//         "__v":0
//     },
//     {"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["yeey","what-a-looker"],"likedBy":[],"_id":"60b74b367354d008e0bf22cb","caption":"pixlchat on a phone!","imageUrl":"60a3c33d5a4a1f1472c71ee9_1622625078772.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-06-02T09:11:18.771Z","updatedAt":"2021-06-02T09:11:18.771Z","__v":0},{"location":{"city":"","country":"","show":true},"tags":["App-in-app","Mobile-test"],"likedBy":["60a407d405ee2828a4839ec6","60acd2efd1168f289ca2373b"],"_id":"60b63151e7b0b2128e183e37","caption":"Meta 😆","imageUrl":"60a3c33d5a4a1f1472c71ee9_1622552913913.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-06-01T13:08:33.912Z","updatedAt":"2021-06-02T10:59:28.868Z","__v":0},{"location":{"city":"","country":"","show":false},"tags":["kamera"],"likedBy":["60af933ebd08c82aa4020d8b","60a407d405ee2828a4839ec6"],"_id":"60b4a7631abbdf7538132bbd","caption":"kamera","imageUrl":"60ae32b420fd2816347307cf_1622452067073.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-31T09:07:47.072Z","updatedAt":"2021-06-02T10:59:15.135Z","__v":0},{"location":{"city":"","country":"","show":false},"tags":["duude"],"likedBy":["60af933ebd08c82aa4020d8b","60a407d405ee2828a4839ec6"],"_id":"60b4a38b053c16746e80316a","caption":"HEEEEJ","imageUrl":"60ae32b420fd2816347307cf_1622451083200.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-31T08:51:23.199Z","updatedAt":"2021-06-02T10:59:16.581Z","__v":0},{"location":{"city":"","country":"","show":false},"tags":["kamera"],"likedBy":["60af933ebd08c82aa4020d8b","60a407d405ee2828a4839ec6"],"_id":"60b4a08f9799d673654c46de","caption":"hej","imageUrl":"60ae32b420fd2816347307cf_1622450319885.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-31T08:38:39.885Z","updatedAt":"2021-06-02T10:59:18.881Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["kamera"],"likedBy":["60af933ebd08c82aa4020d8b"],"_id":"60b4a0819799d673654c46dd","caption":"HEEEEJ","imageUrl":"60ae32b420fd2816347307cf_1622450305153.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-31T08:38:25.152Z","updatedAt":"2021-06-02T10:46:20.343Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["kamera","duude"],"likedBy":["60a3c33d5a4a1f1472c71ee9","60af933ebd08c82aa4020d8b"],"_id":"60b4976009a8196d2565ccba","caption":"fett kul med PWA","imageUrl":"60ae32b420fd2816347307cf_1622447968721.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-31T07:59:28.720Z","updatedAt":"2021-06-02T10:46:22.686Z","__v":0},{"location":{"city":"Rosersberg","country":"Sweden","show":true},"tags":["confused","daily"],"likedBy":["60adfb0e0029660a4c9e4939","60af933ebd08c82aa4020d8b"],"_id":"60aff947c8b03144bce97c9f","caption":"Me 99% of the time","imageUrl":"60a407d405ee2828a4839ec6_1622145352011.jpeg","createdById":"60a407d405ee2828a4839ec6","createdAt":"2021-05-27T19:55:52.010Z","updatedAt":"2021-06-02T10:46:24.150Z","__v":0},{"location":{"city":"Stockholms kommun","country":"Sweden","show":true},"tags":["amsterdam"],"likedBy":["60af933ebd08c82aa4020d8b"],"_id":"60afa08ca2e28f4cd1aadf2f","caption":"red light ","imageUrl":"60ae32b420fd2816347307cf_1622122636381.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-27T13:37:16.380Z","updatedAt":"2021-06-02T11:06:00.470Z","__v":0},{"location":{"city":"Stockholms kommun","country":"Sweden","show":true},"tags":["duude"],"likedBy":["60ae32b420fd2816347307cf","60acd2a075b3871e14f51783","60acd2efd1168f289ca2373b","60af933ebd08c82aa4020d8b"],"_id":"60af8a64e2e43340667b637d","caption":"hej","imageUrl":"60ae32b420fd2816347307cf_1622116964752.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-27T12:02:44.752Z","updatedAt":"2021-05-31T11:07:00.432Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":[""],"likedBy":["60ae32b420fd2816347307cf"],"_id":"60ae38236510a92d7eab832e","caption":"kamera","imageUrl":"60ae32b420fd2816347307cf_1622030371253.jpeg","createdById":"60ae32b420fd2816347307cf","createdAt":"2021-05-26T11:59:31.253Z","updatedAt":"2021-05-27T12:20:22.305Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["duude2222"],"likedBy":["60ae32b420fd2816347307cf","60a407d405ee2828a4839ec6","60af933ebd08c82aa4020d8b"],"_id":"60ae369e6510a92d7eab832c","caption":"funka dååå","imageUrl":"60a7785e54686855958d9614_1622029982353.jpeg","createdById":"60a7785e54686855958d9614","createdAt":"2021-05-26T11:53:02.353Z","updatedAt":"2021-06-02T10:56:59.935Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["kamera"],"likedBy":["60ae32b420fd2816347307cf","60af933ebd08c82aa4020d8b"],"_id":"60ae35486510a92d7eab832b","caption":"kamera","imageUrl":"60a7785e54686855958d9614_1622029640442.jpeg","createdById":"60a7785e54686855958d9614","createdAt":"2021-05-26T11:47:20.441Z","updatedAt":"2021-06-02T10:56:58.971Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["ej","kamera"],"likedBy":["60ae32b420fd2816347307cf"],"_id":"60ae35276510a92d7eab832a","caption":"uppladdad bild ej kamera","imageUrl":"60a7785e54686855958d9614_1622029607215.jpeg","createdById":"60a7785e54686855958d9614","createdAt":"2021-05-26T11:46:47.215Z","updatedAt":"2021-05-27T12:21:20.425Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["lampa"],"likedBy":["60ae32b420fd2816347307cf","60acd2efd1168f289ca2373b"],"_id":"60ae30c66d36fb091e572541","caption":"fick en idé","imageUrl":"60a3c33d5a4a1f1472c71ee9_1622028486379.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-05-26T11:28:06.379Z","updatedAt":"2021-05-27T12:47:48.163Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["frontend","colors"],"likedBy":["60ae32b420fd2816347307cf","60a407d405ee2828a4839ec6"],"_id":"60ae30676d36fb091e572540","caption":"Screenshot från dattan","imageUrl":"60a3c33d5a4a1f1472c71ee9_1622028391725.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-05-26T11:26:31.724Z","updatedAt":"2021-05-27T12:22:46.854Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":[""],"likedBy":["60acd2a075b3871e14f51783"],"_id":"60abb3100e7932250a41bb5e","caption":"Test utan tags","imageUrl":"60a3c33d5a4a1f1472c71ee9_1621865232267.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-05-24T14:07:12.266Z","updatedAt":"2021-05-26T07:49:26.917Z","__v":0},{"location":{"city":"","country":"","show":false},"tags":["rapé","götet","göttmos"],"likedBy":["60a767d4c751d5075e4d14e9","60adfd40b503a0efac2c8091","60ae32b420fd2816347307cf"],"_id":"60ab905108bac423e18f4a85","caption":"snuuus","imageUrl":"60a3c33d5a4a1f1472c71ee9_1621856337579.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-05-24T11:38:57.578Z","updatedAt":"2021-05-27T12:01:18.416Z","__v":0},{"location":{"city":"Stockholm","country":"Sweden","show":true},"tags":["coffee","grind"],"likedBy":["60a3c55056f1a6f890132e1c","60adfb0e0029660a4c9e4939","60af933ebd08c82aa4020d8b"],"_id":"60ab87f0aa0e2b219568df04","caption":"coffeetime","imageUrl":"60a3c33d5a4a1f1472c71ee9_1621854192600.jpeg","createdById":"60a3c33d5a4a1f1472c71ee9","createdAt":"2021-05-24T11:03:12.599Z","updatedAt":"2021-06-02T10:57:09.602Z","__v":0}]