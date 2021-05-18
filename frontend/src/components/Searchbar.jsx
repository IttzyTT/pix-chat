import React, { Component } from 'react'
import styled from 'styled-components';
import Postcard from './Postcard';

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

export class Searchbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            searchInput: '',
            dropdownValue: 'tag'
        }
        
    }


    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = (e) => {
        e.preventDefault();

        if (e.target.nodeName === "INPUT") {
            this.setState({
                searchInput: e.target.value
            })
        
        } else if (e.target.nodeName === "SELECT") {
            this.setState({
                dropdownValue: e.target.value
            })
        }
    }

    filterSearch = (post, dropdownValue) => {
        if (dropdownValue === 'tag') {
            return post.tags;
        } else if (dropdownValue === 'city') {
            return post.location.city;
        }
    }
    
    render() {
        return (
            <SearchReturnDiv>
                <FormWrapper>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input
                                value={this.state.searchInput}
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Search..."
                                name="searchstring"
                                id="searchstring"
                            />
                            <select name="typeOf" id="typeOf" value={this.state.dropdownValue} onChange={this.handleChange}>
                                <option value="tag">Tag</option>
                                <option value="city">City</option>
                            </select>
                        </div>
                    </form>
                </FormWrapper>
                {this.props.allPosts
                .filter(post => (
                    !this.state.searchInput ?
                    post :
                    this.filterSearch(post, this.state.dropdownValue).includes(this.state.searchInput)
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
}