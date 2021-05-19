import React, { useState } from 'react';

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="content" onChange={handleChange} value={chat.content}/>
            </form>
        </div>
    )
}

export default ChatFunction