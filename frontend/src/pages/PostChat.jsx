import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScrollableFeed from 'react-scrollable-feed';
import { motion } from "framer-motion";
import ChatFunction from "../components/ChatFunction";
import { useNamedContext } from "react-easier";
import displayCreatorName from "../reusable-functions/displayCreatorName";

function PostChat({ match, sse }) {

  const [post, setPost] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  let createdAt = new window.Date(post.createdAt).toLocaleDateString();
  let globalStore = useNamedContext("global");

  useEffect(() => {
    getSinglePost();
    getMessages();
    // getUsers();
    startSSE();
  }, []);

  const startSSE = () => {
    sse.addEventListener("postMessages", (e) => {
      setMessages((prevArray) => [...prevArray, ...JSON.parse(e.data)]);
    });
  };

  const getSinglePost = async () => {
    try {
      const response = await fetch(
        `${globalStore.apiUrl}/posts/${match.params.id}`
      );
      const data = await response.json();
      console.log(data);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch(`http://localhost:4000/postMessages`);
      const data = await response.json();
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };


  // const getUsers = async () => {
  //     try {
  //         const response = await fetch(`http://localhost:4000/users`);
  //         const data = await response.json();
  //         console.log(data);
  //         setUsers(data);
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  
  // const typeOfPicture = (url) => {
  //     return (
  //         url.substring(0, 4) === 'http' ?
  //         url :
  //         `/uploads/${url}`
  //     )
  // }
 

  const filterMessages = (messages) => {
    return messages.filter((message) => message.postId === match.params.id);
  };

  return (
    <Wrapper>
      <ContentWrapper>
      <Content>
        <ImgCon>
          <Img src={post.imageUrl} />
          {/* <Img src={typeOfPicture(post.imageUrl)} alt={post.caption} /> */}
        </ImgCon>
        <InfoCon>
          {/* <p>{post.location.city}, {post.location.country} <Location className='material-icons'>location_on</Location></p> */}

          <Date>{createdAt}</Date>
          <Caption>{post.caption}</Caption>
        </InfoCon>
      </Content>

      <MessageSection>
        <ScrollableFeed>
        {filterMessages(messages).map((message) => {
          const check = globalStore.currentUserId === message.createdById;
          let messageTimeStamp = new window.Date(
            message.createdAt
          ).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
          // console.log(check);
          return (
            <ChatWrapper>
              <ChatCon
                key={message["_id"]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {!check ? (
                  <Con1>
                    <User>
                      {displayCreatorName(message, globalStore.allUsers)}
                    </User>
                    <Messages>
                      <Time>{messageTimeStamp}</Time>
                      <Chat>{message.content}</Chat>
                    </Messages>
                  </Con1>
                ) : (
                  <Con2>
                    <UserMessages>
                      <Time>{messageTimeStamp}</Time>
                      <Chat>{message.content}</Chat>
                    </UserMessages>
                    <User>
                      {displayCreatorName(message, globalStore.allUsers)}
                    </User>
                  </Con2>
                )}
              </ChatCon>
            </ChatWrapper>
          );
        })}

        {/* {users.map(user => {
                    return(
                        <p>{user.name}</p>
                    )
                })} */}
        </ScrollableFeed>
      </MessageSection>
      </ContentWrapper>

      <div>
        <ChatFunction post={post} />
      </div>
    </Wrapper>
  );
}

export default PostChat;

const Content = styled.div`
  height: 150px;
  background-color: #373737;
  display: flex;
  align-items: center;
  color: #f3f3f3;
  @media screen and (min-width: 768px) {
    height: 240px;
  }
  @media screen and (min-width: 1024px) {
    height: 300px;
  }
  @media screen and (min-width: 1200px) {
    height: 560px;
    width: 40%;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 10px;
    box-shadow: 0px 2px 3px 1px #191818;
  }
`;

const ContentWrapper = styled.div`
@media screen and (min-width: 1200px) {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
`

const InfoCon = styled.div`
  width: 200px;
`;

const Wrapper = styled.div`
  padding-top: 70px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ImgCon = styled.div`
  width: 40%;
  height: 80%;
  margin: 0 14px 0 14px;
  @media screen and (min-width: 768px) {
    width: 34%;
    height: 80%;
    margin: 0 26px 0 26px;
  }
  @media screen and (min-width: 1024px) {
    width: 30%;
    height: 80%;
    margin: 0 30px 0 30px;
  }
  @media screen and (min-width: 1200px) {
    width: 90%;
    height: 70%;
    margin-top: 10px;
  }
`;

const Location = styled.i`
  font-size: 12px;
`;

const Date = styled.p`
  font-size: 10px;
  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }
`;

const Caption = styled.h1`
  font-size: 20px;
  @media screen and (min-width: 1024px) {
    font-size: 30px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 22px;
  }
`;

const MessageSection = styled.section`
  overflow-y: scroll;
  height: 59vh;
  // padding-bottom: 80px;
  @media screen and (max-height: 568px) {
    height: 42vh;
  }
  @media screen and (min-height: 569px) and (max-height: 667px) {
    height: 50vh;
  }
  @media screen and (min-height: 668px) and (max-height: 736px) {
    height: 55vh;
  }
  @media screen and (min-width: 768px) {
    height: 56vh;
  }
  @media screen and (min-width: 1024px) {
    height: 61vh;
  }
  @media screen and (min-width: 1200px) {
    &::-webkit-scrollbar {
      display: none;
    }
    width:40%;
    height: 76vh;
  }
`;

const ChatWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 auto;
`;

const ChatCon = styled(motion.div)`
  color: white;
`;

const Con1 = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
`;

const Con2 = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;
`;

const Chat = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  @media screen and (min-width: 1024px) {
    font-size: 30px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 20px;
  }
  
`;

const Time = styled.div`
  margin: 0;
  padding: 0;
  font-size: 10px;
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 16px;
  }
`;

const Messages = styled.div`
  margin-left: 15px;
  margin-right: 25%;
  background-color: #6a6a6a;
  position: relative;
  border-radius: 20px;
  padding: 8px 15px;
  display: inline-block;
  @media screen and (min-width: 1024px) {
    margin-left: 54px;
  }
  @media screen and (min-width: 1200px) {
    margin-left: 44px;
  }

  &:before {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: -7px;
    height: 20px;
    width: 20px;
    background: #6a6a6a;
    border-bottom-right-radius: 15px;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: -10px;
    width: 10px;
    height: 21px;
    background: #434343;
    border-bottom-right-radius: 10px;
  }
`;
const UserMessages = styled.div`
  margin-right: 15px;
  margin-left: 25%;
  background: linear-gradient(to bottom, #00d0ea 0%, #7b78fd 100%);
  border-radius: 20px;
  padding: 10px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;

  margin-left: 25%;
  background-attachment: fixed;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    right: -8px;
    height: 20px;
    width: 20px;
    background: linear-gradient(to bottom, #00d0ea 0%, #7b78fd 100%);
    background-attachment: fixed;
    border-bottom-left-radius: 15px;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: -10px;
    width: 10px;
    height: 21px;
    background: #434343;
    border-bottom-left-radius: 10px;
  }
`;

const User = styled.div`
  width: 30px;
  z-index: 2;
  @media screen and (min-width: 1024px) {
    font-size: 25px;
  }
  @media screen and (min-width: 1200px) {
    font-size: 20px;
  }
`;

// const Messages = styled.p`
//     color: #F3F3F3;
// `
