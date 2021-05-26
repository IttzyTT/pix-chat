import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'


function EditProfile({ match }) {
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        fetchUser();
    }, []);
    
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://localhost:4000/users/${match.params.id}`);
            const data = await response.json();
            setUser(data)
        } catch(error) {
            console.log(error)
        }
    }
    const updateUser = async (e) => {
        e.preventDefault()
        try {
            await fetch(`http://localhost:4000/users/${user['_id']}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            history.push('/profile')
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({  
            ...user,
            [name]: value            
        })
    }

    return (
        <form onSubmit={updateUser}>
            <ChangePicture>
                <Icon className='material-icons'>account_circle</Icon>
                {/* <Btn>Change profile picture</Btn> */}
            </ChangePicture>
            <Con>
                <Con2>
                    <ChangeInfoText type="text" name='name' onChange={handleUpdate} value={user.name} placeholder="Username" />
                    <ChangeInfoText type="password" name='password' onChange={handleUpdate} value={user.password} placeholder='Password' />
                </Con2>
                <Con3>
                    <SaveBtn>Save</SaveBtn>
                </Con3>
            </Con>
        </form>
    )
}

export default EditProfile

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
    @media screen and (min-width: 768px) {
        font-size: 160px;
    }
`
const ChangeInfoText = styled.input`
    color: white;
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
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    @media screen and (min-width: 768px) {
        width: 60%
    }
    @media screen and (min-width: 992px) {
        width: 50%
    }
    @media screen and (min-width: 1280px) {
        width: 40%
    }
`
const Con2 = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`
const Con3 = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    margin-top: 20px;
`
const SaveBtn = styled.button`
    background-color: #434343; 
    color: white;
    width: 80px;
    height: 30px;
    border: 1px solid white;
    border-radius: 4px;
    cursor: pointer;
`