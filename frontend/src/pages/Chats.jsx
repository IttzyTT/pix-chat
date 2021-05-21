// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components'


// const Wrapper = styled.div`
// padding-top: 100px;
// `
// const Title = styled.h1`
// font-size: 20px;
// `
// const Date = styled.p`
// color: #FFFF;
// `
// const Caption = styled.h2`
// color: #5590e7;
// `


// function Chats() {
//     const [user, setUser] = useState ({})
//     const [messages, setMessage] = useState ([])

//     useEffect(() => {
//        fetchAllUsers
//        fetchAllPosts
//     }, [])

//     const fetchAllPosts = async () => {
       
//         try {
//                 const response = await fetch(`http://localhost:4000/postsMessages`);
//                 const data = await response.json(); 
//                 console.log(data)
//             } catch (error) {
//                 console.log(error)
//         }
//     }

//     const fetchAllUsers = async () => {

//         try {
//             const response = await fetch(`http://localhost:4000/users`);
//             const data = await response.json(); 
//             console.log(data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return (
//         <Wrapper>
//             <Title>Chats</Title>
//                 <Date>{createdAt}</Date>
//                     <Caption>{post.caption}</Caption>
                    
//                     <MessageList>
//                         <p> Her comes a message list!</p>
//                     </MessageList>
//         </Wrapper>
        
        
//     )
// }

// export default Chats
