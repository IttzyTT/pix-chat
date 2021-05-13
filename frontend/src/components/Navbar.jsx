import React from 'react'
// import {Link} from "react-router-dom";
import styled from 'styled-components'

const Navbar = styled.div `
    background-color: #434343;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
`

const NavbarList = styled.ul `
    display: flex;
    list-style-type: none;
    justify-content: space-around;
    padding: 0;
    position: relative;
`
const NavbarListItem = styled.li `

`
const NavbarListItemLink = styled.a `

`
const LinkIcon = styled.i `
    font-size: 32px;
    color: #fff;
`



function navbar() {
    return (
        <Navbar>
            <NavbarList>
            <NavbarListItem><NavbarListItemLink to='/'><LinkIcon className='material-icons'>home</LinkIcon></NavbarListItemLink></NavbarListItem> 
            <NavbarListItem><NavbarListItemLink to='/'><LinkIcon className='material-icons'>search</LinkIcon></NavbarListItemLink></NavbarListItem> 
            <NavbarListItem><NavbarListItemLink to='/'><LinkIcon className='material-icons'>photo_camera</LinkIcon></NavbarListItemLink></NavbarListItem> 
            <NavbarListItem><NavbarListItemLink to='/'><LinkIcon className='material-icons'>chat_bubble</LinkIcon></NavbarListItemLink></NavbarListItem> 
            <NavbarListItem><NavbarListItemLink to='/'><LinkIcon className='material-icons'>account_circle</LinkIcon></NavbarListItemLink></NavbarListItem> 
            </NavbarList>
        </Navbar>
    )
}

export default navbar
