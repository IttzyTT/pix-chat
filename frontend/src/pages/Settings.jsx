import React from 'react'
import styled from 'styled-components';
import SettingsStyle from '../settings.module.css';

const Wrapper = styled.div `
    padding-top: 100px;
`

function Settings() {
    return (
        <Wrapper>
            <h1>Settings</h1>

            <div className={SettingsStyle.button} id={SettingsStyle.button1}>
                <input type="checkbox" className="checkbox" />
                <div className="knobs"></div>
            </div>
        </Wrapper>
    )
}

export default Settings
