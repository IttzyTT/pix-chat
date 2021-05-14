import React from 'react'
import styled from 'styled-components'

const ChangePicture = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-direction: column;
   padding-top: 100px;
   margin: 0;
   width: 300px;
   margin: 0 auto;
`
const Icon = styled.i`
    color: white;
    font-size: 100px;
    margin-bottom: 10px;
`

const ChangeInfoText = styled.input`
    color: white;
    opacity: 50%;
    margin: 0 0 40px 40px;
`
const Btn = styled.button`
    background-color: #434343; 
    color: white;
    width: 200px;
    height: 32px;
    margin-bottom: 80px;
    border: 1px solid white;
    border-radius: 4px;
    text-align: center;
    font-size: 16px; 
`
const Con = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 80%;
    margin: 0 auto;
`
const Con2 = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`
const Con3 = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`
const SaveBtn = styled.button`
    background-color: #434343; 
    color: white;
    width: 80px;
    height: 30px;
    border: 1px solid white;
    border-radius: 4px;
`

function EditProfile() {
    return (
        <div>
        <ChangePicture>
            <Icon className='material-icons'>account_circle</Icon>
            <Btn>Change profile picture</Btn>
        </ChangePicture>
        <Con>
            <Con2>
                <ChangeInfoText type="text" placeholder="Username" />
                <ChangeInfoText type="text" placeholder='Password' />
            </Con2>
            <Con3>
                <SaveBtn>Save</SaveBtn>
                <SaveBtn>Save</SaveBtn>
            </Con3>
        </Con>
        </div>
    )
}

export default EditProfile
