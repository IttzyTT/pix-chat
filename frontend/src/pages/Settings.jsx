import React from 'react'
import styled from 'styled-components';


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
            <ConBtn>
                <LogOut className='btn-flat'>Log out</LogOut>
            </ConBtn>
        </Wrapper>
    )
}

export default Settings

const Wrapper = styled.div `
    padding: 100px 20px 0;
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

const ConBtn = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #434343;
   font-size: 18px;
   width: 140px;
   height: 40px;
   margin: 80px  auto 0;
   border: 1px solid #7B78FD;
   border-radius: 50px;
`
const LogOut = styled.button`
    color: #fff;
    text-align: center;
`