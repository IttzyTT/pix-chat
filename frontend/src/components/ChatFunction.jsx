import React, { useState } from 'react';
import styled from 'styled-components';
import { useNamedContext } from 'react-easier';

const Wrapper = styled.div`
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #F3F3F3;
    height: 50px;
    position: fixed;
    width: 100%;
    bottom: 63px;
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
            font-size: 1.4rem;
            font-weight: 200;
        }
        input[type=text]::placeholder {
            color: #222;
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
background-color: #EAE8E8;
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

// const Test = styled.div`
//     height: 80%;
// `

function ChatFunction({ post, startSSE }) {
    const [chat, setChat] = useState({});
    let globalStore = useNamedContext('global');

    const handleChange = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        await setChat({
            ...chat,
            createdById: globalStore.currentUserId,
            postId: post['_id'],
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch(`${globalStore.apiUrl}/postMessages`, {
                method: 'POST', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chat) // body data type must match "Content-Type" header
            });

            startSSE();

        } catch (error) {
            console.log(error);
        }
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