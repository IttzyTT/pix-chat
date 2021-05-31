import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
import Postcard from './Postcard';
import { motion } from "framer-motion";

function Searchbar({ allPosts }) {
    const [searchInput, setSearchInput] = useState('');
    const [dropdownValue, setDropdownValue] = useState('tag');

    const params = useParams()

    useEffect(() => {
        //For when somebody clicks a tag or a city from another page
        if (!params.query) {
            return
        } else if (params.query.startsWith('tag=')) {
            setDropdownValue('tag')
            setSearchInput(params.query.substring(4));
        } else if (params.query.startsWith('city=')) {
            setDropdownValue('city')
            setSearchInput(params.query.substring(5));
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.nodeName === "INPUT") {
            setSearchInput(e.target.value);
        } else if (e.target.nodeName === "SELECT") {
            setDropdownValue(e.target.value);
        }
    }

    const filterSearch = (post, dropdownValue) => {
        if (dropdownValue === 'tag') {
            return post.tags;
        } else if (dropdownValue === 'city') {
            return post.location.city;
        }
    }
    
    return (
        <SearchReturnDiv>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            value={searchInput}
                            onChange={handleChange}
                            type="text"
                            placeholder="Search..."
                            name="searchstring"
                            id="searchstring"
                        />
                        <select name="typeOf" id="typeOf" value={dropdownValue} onChange={handleChange}>
                            <option value="tag">Tag</option>
                            <option value="city">City</option>
                        </select>
                    </div>
                </form>
            </FormWrapper>
            <div className={"postcard-flex-parent"}>
                <motion.div 
                    className={"postcard-flex-it"}
                    variants={containerAni}
                    initial={"hidden"}
                    animate={"show"}
                >
                    { !searchInput ? 
                        <Placeholder>
                            <i className={"material-icons"}>search</i>
                        </Placeholder> 
                        : 
                        null 
                    }
                    { allPosts
                        .filter(post => (
                            !searchInput ?
                            null :
                            new RegExp(searchInput, 'gi').test(filterSearch(post, dropdownValue)?.toString())
                        ))
                        .map(post => (
                            <Postcard
                                key={ post['_id'] }
                                post={ post }
                            />
                        ))
                    }
                </motion.div>
            </div>
        </SearchReturnDiv>
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
const SearchReturnDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 768px) {
            
        }
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 30px;
    width: 90vw;
    background-color: #5a5a5a;
    margin-bottom: 25px;
    @media screen and (min-width: 768px) {
            width: 60vw;
        }
        @media screen and (min-width: 1024px) {
            width: 40vw;
        }
    form {
        width: 88%;
        div {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
        }
        input[type=text], select {
            box-sizing: border-box;
            border: 0;
            margin: 0;
            padding: 0;
            background-color: transparent;
            color: #F3F3F3;
            font-size: 1.4rem;
            font-weight: 200;
        }
        input[type=text] {
            flex-grow: 1;
        }
        select {
            flex-shrink: 1;
            display: block;
            width: fit-content;
            background-color: #5a5a5a;
        }
    }
`;

const Placeholder = styled.div`
    i {
        font-size: 10rem;
        color: #3C3B3B;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Searchbar;