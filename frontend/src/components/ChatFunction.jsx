import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #F3F3F3;
    height: 50px;
    position: absolute;
    width: 100%;
    bottom: 63px;
`

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 30px;
    width: 80vw;
    background-color: #EAE8E8;
    width: 70%;
    form {
        width: 88%;
        input[type=text] {
            box-sizing: border-box;
            border: 0;
            margin: 0;
            padding: 0;
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

const Send = styled.i`
    color: #EFEFFF;
    font-size: 23px;
`

// const Test = styled.div`
//     height: 80%;
// `

function ChatFunction() {
    const [chat, setChat] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(value)
        setChat({
            ...chat,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetch('http://localhost:4000/postMessages', {
                method: 'POST', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chat) // body data type must match "Content-Type" header
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <IWrapper>
                <i className='material-icons'>photo_library</i>
            </IWrapper>
            <FormWrapper>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            value={chat.content}
                            onChange={handleChange}
                            type="text"
                            placeholder="type message..."
                            name="content"
                        />
                    </div>
                </form>
            </FormWrapper>
            <IWrapper>
                <Send className='material-icons'>send</Send>
            </IWrapper>
        </Wrapper>
    )
}

export default ChatFunction