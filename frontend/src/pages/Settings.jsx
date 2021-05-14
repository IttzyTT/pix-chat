import React from 'react'
import styled from 'styled-components';
import SettingsStyle from './settings.module.css';

function Settings() {
    return (
        <div>
            <div className={SettingsStyle.button} id={SettingsStyle.button1}>
                <input type="checkbox" className="checkbox" />
                <div className="knobs"></div>
            </div>
        </div>
    )
}

export default Settings
