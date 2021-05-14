import React, { useState } from 'react'
import styled from 'styled-components';
import wolf from '/wolf.jpg';

export default function Home() {
    return (
        <div>
            <section>
                <Div>
                    <p>Kevin</p>
                    <p>Geo Location <Location className='material-icons'>location_on</Location></p>
                </Div>
                <img scr={test} alt=''/>
                <TextTags>
                    <TitleCon>
                        <Title>Cool Nature</Title>
                        <IconCon>
                            <i className='material-icons'>favorite_border</i>
                            <i className='material-icons'>chat_bubble_outline</i>
                        </IconCon>
                    </TitleCon>
                        <Time>2021-05-11</Time>
                    <Tags>
                        <Tag>nature</Tag>
                        <Tag>cool</Tag>
                    </Tags>
                </TextTags>

            </section>
        </div>
    )
}


const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    color: #F3F3F3;
    width: 95%;
    margin: 0 auto;
`
const TitleCon = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
`
const IconCon = styled.div`
    display: flex;
    justify-content: space-between;
    width: 55px;
`
const TextTags = styled.div`
    color: #7B78FD;
`
const Title = styled.h3`
    margin: 0;
    padding-bottom: 7px;
    font-size: 30px;
    color: #F3F3F3;
`
const Tags = styled.div`
    margin-left: 20;px;
    display: flex;
    margin-left: 20px;
`
const Tag = styled.div`
   width: 80px;
   height: 20px;
   border: 1px solid #7B78FD;
   border-radius: 50px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   margin-right: 10px;
`

const TagText = styled.p`
    margin: 0;
    padding: 0;
    padding-bottom: 3.5px;
`

const Location = styled.i`
    font-size: 12px;
`

const Date = styled.p`
    color: #F3F3F3;
    margin-left: 20px;
    margin-top: -25px; 
    font-size: 10px;
`

const Wolf = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ImgCon = styled.div`
    width: 100%;
    height: 300px;
`

const ContentWrapper = styled.div`
    padding: 70px 0;
`

const Section = styled.section`
    margin-bottom: 20px;
`


function Home() {
    const [toggle, setToggle] = useState(false);

    const toggleTrueFalse = () => setToggle(!toggle);

    return (
        <ContentWrapper>
            <Section>
                <Div>
                    <p>Kevin</p>
                    <p>Geo Location <Location className='material-icons'>location_on</Location></p>
                </Div>
                <TextTags>
                    <ImgCon>
                        <Wolf src={wolf} alt='' />
                    </ImgCon>
                    <TitleCon>
                        <Title>Cool Nature</Title>

                        <IconCon>
                            <div onClick={toggleTrueFalse}>
                                {
                                    !toggle ?
                                        <i className='material-icons'>favorite_border</i>
                                        :
                                        <i className='material-icons'>favorite</i>
                                }
                            </div>
                            <i className='material-icons'>chat_bubble_outline</i>
                        </IconCon>
                    </TitleCon>
                    <Date>2021-05-11</Date>
                    <Tags>
                        <Tag>
                            <TagText>cool</TagText>
                        </Tag>
                        <Tag>
                            <TagText>wolf</TagText>
                        </Tag>
                    </Tags>
                </TextTags>

            </Section>
            <Section>
                <Div>
                    <p>Kevin</p>
                    <p>Geo Location <Location className='material-icons'>location_on</Location></p>
                </Div>
                <TextTags>
                    <ImgCon>

                        <Wolf src={wolf} alt='' />
                    </ImgCon>
                    <TitleCon>
                        <Title>Cool Nature</Title>

                        <IconCon>
                            <div onClick={toggleTrueFalse}>
                                {
                                    !toggle ?
                                        <i className='material-icons'>favorite_border</i>
                                        :
                                        <i className='material-icons'>favorite</i>
                                }
                            </div>
                            <i className='material-icons'>chat_bubble_outline</i>
                        </IconCon>
                    </TitleCon>
                    <Date>2021-05-11</Date>
                    <Tags>
                        <Tag>
                            <TagText>cool</TagText>
                        </Tag>
                        <Tag>
                            <TagText>wolf</TagText>
                        </Tag>
                    </Tags>
                </TextTags>

            </Section>
        </ContentWrapper>
    )
}

export default Home