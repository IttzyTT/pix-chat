import React from 'react'
import logo from '/logo.png';
import styled from 'styled-components';

const TopbarWrapper = styled.div`
    background-color: #434343;
    display: flex;
    color: white;
    min-height: 70px;
    align-items: center;
    width: 100%;
`

const Con = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
`

const LogoImg = styled.img`
    width: 28px;
    height: 28px;
`

const LogoText = styled.p`
    font-family: montserrat;
    font-size: 18px;
    padding-left: 5px;
`

const Settings = styled.i`
    position: absolute;
    right: 30px;
`

function topbar() {
    return (
        <div>
            <TopbarWrapper>
                <Con>
                    <LogoImg src={logo} />
                    <LogoText>pix|chat</LogoText>
                </Con>
                <Settings className='material-icons'>settings</Settings>
            </TopbarWrapper>
        </div>
    )
}

export default topbar
