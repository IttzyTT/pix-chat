import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components';
import Postcard from './Postcard';

function Searchbar({ allPosts }) {
    const [searchInput, setSearchInput] = useState('');
    const [dropdownValue, setDropdownValue] = useState('tag');

    const params = useParams()

    useEffect(() => {
        //For when somebody clicks a tag or a city
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
            {allPosts
            .filter(post => (
                !searchInput ?
                post :
                filterSearch(post, dropdownValue).includes(searchInput)
            ))
            .map(post => (
                <Postcard
                    key={ post['_id'] }
                    post={ post }
                />
            ))}
        </SearchReturnDiv>
    )
}

const SearchReturnDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 30px;
    width: 90vw;
    background-color: #5a5a5a;
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
            /* height: initial; */
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
        }
    }
`;

export default Searchbar;