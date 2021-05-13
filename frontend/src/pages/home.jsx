import React from 'react'
import styled from 'styled-components';

export default function Home() {
    return (
        <div>
           <section>
                <Div>
                    <p>Kevin</p>
                    <p>Geo Location</p>
                </Div>
                <img scr='' alt='' />
                <DivContainer>
                    <TextTags>
                        <h3>Cool Nature</h3>
                        <p>nature</p>
                        <p>cool</p>
                    </TextTags>
                        <i className="material-icons">favorite_border</i>
                        <i className="material-icons">chat_bubble_outline</i>
                </DivContainer>
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
const DivContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px;
`
const TextTags = styled.div`
    color: red;
`




