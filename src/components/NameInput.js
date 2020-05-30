import React, { useState } from 'react';

export const NameInput = ({onNameAdd}) => {

    const [name, setName] = useState('');

    const addName = () => {
        onNameAdd(name);
        setName('');
    }

    const onInputChange = (event) => {
        setName(event.target.value);
    }

    return (
        <div>
            <input type='text' onChange={onInputChange} value={name}></input>
            <button onClick={addName}>Add</button>
        </div>
    )
};