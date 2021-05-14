import React from 'react'
import styled from 'styled-components'
import wolf from '/wolf.jpg';

const Con = styled.div` 
    display: flex;
    justify-content: space-between;
    margin: 0 50px 40px 50px;
`
const Icon = styled.i`
    color: white;
    font-size: 100px;
    margin-top: 100px;
`
const InfoEdit = styled.div` 
    display: flex;
    flex-direction: column;
    margin-top: 88px;
`
const Name = styled.p` 
    color: white;
    font-size: 20px; 
`
const Btn = styled.button`
    background-color: #434343; 
    color: white;
    width: 120px;
    height: 34px;
    border: 1px solid white;
    border-radius: 3px;
    text-align: center;
    font-size: 16px; 
`
const InfoNumber = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 60px 0 60px;
    font-size: 16px; 
    color: white; 
`
const Pictures = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%; 
    height: 450px;
    flex-wrap: wrap;
    border-top: 1px solid white; 
    overflow-y: scroll;
`
const Posts = styled.div` 
    text-align: center;
`
const Favorites = styled.div` 
    text-align: center;
`
const ImgCon = styled.div`
    width: 49.5%;
    margin-bottom: 4.8px;
`
const Wolf = styled.img` 
    width: 100%;
    height: 100%;
    object-fit: cover;
`

function Profile() {
    return (
        <div>
            <Con>
                <Icon className='material-icons'>account_circle</Icon>
                <InfoEdit>
                    <Name>Kevin</Name>
                    <Btn>Edit Profile</Btn>
                </InfoEdit>
            </Con>
            <InfoNumber>
                <Posts>
                    <p>Posts</p>
                    <p>13</p>
                </Posts>
                <Favorites>
                    <p>Favorites</p>
                    <p>20</p>
                </Favorites>
            </InfoNumber>
            <Pictures>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>
                <ImgCon>
                    <Wolf src={wolf} alt='' />
                </ImgCon>

            </Pictures>
        </div>
    )
}

export default Profile
