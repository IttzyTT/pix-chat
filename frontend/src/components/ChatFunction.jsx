import React, { useState } from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';


function ChatFunction({ post }) {
    const [chat, setChat] = useState({});
    let globalStore = useNamedContext('global');

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(post['_id']);
        await setChat({
            ...chat,
            createdById: globalStore.currentUserId,
            postId: post['_id'],
            [name]: value 
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // e.target.reset();

        try {
            await fetch(`${globalStore.apiUrl}/postMessages`, {
                method: 'POST', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chat) // body data type must match "Content-Type" header
            });

            // e.target.value = '';
            clearInputField();

        } catch (error) {
            console.log(error);
        }
    }

    const clearInputField = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
          setChat({});
    }

    return (
        <Wrapper>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                        <IWrapper2>
                            <Photo className='material-icons'>photo_library</Photo>
                        </IWrapper2>
                    <Yes>
                        <input
                            value={chat.content}
                            onChange={handleChange}
                            type="text"
                            placeholder="type message..."
                            name='content'
                        />
                    </Yes>
                        <IWrapper>
                            <button className="btn-flat"><Send className='material-icons'>send</Send></button>
                        </IWrapper>
                </form>
            </FormWrapper>
        </Wrapper>
    )
}

export default ChatFunction

const Wrapper = styled.div`
    background-color: #373737;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F3F3F3;
    height: 50px;
    position: fixed;
    width: 100%;
    bottom: 63px;
    z-index: 10;
`

const FormWrapper = styled.div`
    form {
        display: flex;
        justify-content: space-between;
        width: 90vw;
        input[type=text] {
            box-sizing: border-box;
            border: 0;
            margin: 0;
            padding: 0 0 0 10px;
            background-color: transparent;
            color: #F3F3F3;
            font-size: 1.4rem;
            font-weight: 200;
            &:focus {
                outline: 0;
            }
        }
        input[type=text]::placeholder {
            color: #F3F3F3;
        }
    }
`;

const IWrapper = styled.div`
    background-color: #7B78FD;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const IWrapper2 = styled.div`
    background-color: #7B78FD;
    border-radius: 50%;
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const Yes = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
border-radius: 30px;
background-color: #5a5a5a;
width: 100%;
margin: 0 10px 0 10px;
`

const Send = styled.i`
    color: #EFEFFF;
    font-size: 23px;
`

const Photo = styled.i`
    color: #EFEFFF;
    font-size: 23px;
`