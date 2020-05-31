import React from 'react';

const setupMenu = {
    'Space': 'Start game',
    'Enter': 'Add player'
}

const inGameMenu = {
    'Space': 'Next player',
    'Enter': 'Pause timer'
}

export const Legend = ({isStarted}) => {

    const menu = isStarted ? inGameMenu : setupMenu;

    return (
        <div style={{position:"absolute", bottom:"0px"}}>
            {Object.keys(menu).map(key => {
                return <p key={key}>{`${key} - ${menu[key]}`}</p>
            })}            
        </div>
    )
};