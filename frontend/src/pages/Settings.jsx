import React from 'react'
import styled from 'styled-components';
import SettingsStyle from '../settings.module.css';


function Settings() {
    return (
        <Wrapper>
            <SettingTitle>Settings</SettingTitle>
            <Toggler>
                <TogglerSettingText>Notifications</TogglerSettingText>
                <div className="switch">
                    <label>
                    <input type="checkbox" />
                    <span className="lever"></span>
                    </label>
                </div>
            </Toggler>

            <Toggler>
                <TogglerSettingText>Sound on/off</TogglerSettingText>
                <div className="switch">
                    <label>
                    <input type="checkbox" />
                    <span className="lever"></span>
                    </label>
                </div>
            </Toggler>

            <Toggler>
                <TogglerSettingText>Dark theme</TogglerSettingText>
                <div className="switch">
                    <label>
                    <input type="checkbox" />
                    <span className="lever"></span>
                    </label>
                </div>
            </Toggler>

            <Toggler>
                <TogglerSettingText>Save in cache</TogglerSettingText>
                <div className="switch">
                    <label>
                    <input type="checkbox" />
                    <span className="lever"></span>
                    </label>
                </div>
            </Toggler>
            
            <Toggler>
                <TogglerSettingText>Geolocation on/off</TogglerSettingText>
                <div className="switch">
                    <label>
                    <input type="checkbox" />
                    <span className="lever"></span>
                    </label>
                </div>
            </Toggler>
        </Wrapper>
    )
}

export default Settings

const Wrapper = styled.div `
    padding: 100px 20px;
`

const Toggler = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const TogglerSettingText = styled.p `
    font-size: 22px;
    color: #fff;
`

const SettingTitle = styled.h1 `
    color: #fff;
`