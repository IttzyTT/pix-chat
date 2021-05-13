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

const Navbar_list = styled.ul `
    display: flex;
    list-style-type: none;
    justify-content: space-around;
    padding: 0;
    position: relative;
`
const Navbar_list_item = styled.li `

`
const Navbar_list_item_link = styled.a `

`
const Link_icon = styled.i `
    font-size: 32px;
    color: #fff;
`



function navbar() {
    return (
        <Navbar>
            <Navbar_list>
            <Navbar_list_item><Navbar_list_item_link to='/'><Link_icon className='material-icons'>home</Link_icon></Navbar_list_item_link></Navbar_list_item> 
            <Navbar_list_item><Navbar_list_item_link to='/'><Link_icon className='material-icons'>search</Link_icon></Navbar_list_item_link></Navbar_list_item> 
            <Navbar_list_item><Navbar_list_item_link to='/'><Link_icon className='material-icons'>photo_camera</Link_icon></Navbar_list_item_link></Navbar_list_item> 
            <Navbar_list_item><Navbar_list_item_link to='/'><Link_icon className='material-icons'>chat_bubble</Link_icon></Navbar_list_item_link></Navbar_list_item> 
            <Navbar_list_item><Navbar_list_item_link to='/'><Link_icon className='material-icons'>account_circle</Link_icon></Navbar_list_item_link></Navbar_list_item> 
            </Navbar_list>
        </Navbar>
    )
}

export default navbar
