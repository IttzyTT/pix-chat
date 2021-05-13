import React from 'react'
import logo from '/logga-light.svg';
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
    width: 110px;
`

const LogoText = styled.p`
    font-family: 'montserrat';
    font-size: 18px;
    padding-left: 5px;
`

const Settings = styled.i`
    position: absolute;
    right: 25px;
    font-size: 32px;
`

function topbar() {
    return (
        <div>
            <TopbarWrapper>
                <Con>
                    <LogoImg src={logo} />
                </Con>
                <Settings className='material-icons'>settings</Settings>
            </TopbarWrapper>
        </div>
    )
}

export default topbar
