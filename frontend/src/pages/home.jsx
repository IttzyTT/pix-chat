import React from 'react'
import styled from 'styled-components';
import test from '/home-fig.png';

export default function Home() {
    return (
        <div>
            <section>
                <Div>
                    <p>Kevin</p>
                    <p>Geo Location</p>
                </Div>
                <img scr={test} alt='' />
                <TextTags>
                    <TitleCon>
                        <Title>Cool Nature</Title>

                        <IconCon>
                            <i className='material-icons'>favorite_border</i>
                            <i className='material-icons'>chat_bubble_outline</i>
                        </IconCon>
                    </TitleCon>
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
    margin: 20px;
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
`
const Tags = styled.div`
    margin-left: 20px;
    display: flex;
`
const Tag = styled.p`
   width: 80px;
   margin: 0px;
   margin-right: 16px;
   text-align: center;
   padding: 0px;
   padding: 4px;
   border: 1px solid #7B78FD;
   border-radius: 50px;
`




