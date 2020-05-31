import React, { useState, useEffect, useCallback } from 'react';
import './NameInput.css';

export const NameInput = ({ onNameAdd }) => {

    const [name, setName] = useState('');

    const handleEnterPress = useCallback(event => {
        const { keyCode } = event;

        if (keyCode === 13) {
            addName();
        }
    }, [name]);

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);
        return () => {
            window.removeEventListener('keydown', handleEnterPress);
        };
    }, [handleEnterPress]);

    const addName = () => {
        onNameAdd(name);
        setName('');
    }

    const onInputChange = (event) => {
        setName(event.target.value);
    }

    return (
        <div className="name-input-container">
            <p>Input names:</p>
            <input type='text' onChange={onInputChange} value={name} />
            {/* <button onClick={addName}>Add</button> */}
        </div>
    )
};