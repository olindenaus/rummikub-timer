import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { Timer } from './components/Timer/Timer';
import { NameInput } from './components/NameInput/NameInput';
import { Legend } from './components/Legend';

function App() {

  const [names, setNames] = useState(['Oskar', 'Hubert']);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const handleSpaceBar = useCallback((event) => {
    const { keyCode } = event;
    if (keyCode === 32 && !isStarted) {
      setIsStarted(true);
    }
  }, [isStarted])

  useEffect(() => {
    window.addEventListener('keypress', handleSpaceBar);
    return () => {
      window.removeEventListener('keypress', handleSpaceBar);
    }
  }, [handleSpaceBar]);

  const onSwitch = () => {
    console.log("onSwitch()");
    
    let i = ((counter + 1) % (names.length));
    setCounter(counter => counter + 1);
    setIndex(index => i);
  }

  const addName = (name) => {
    setNames(names => [...names, name]);
  }

  let setup =
    <>{
      isStarted ? null : (<>{names.toString()}
        <NameInput onNameAdd={addName} />
        {/*<button onClick={() => setIsStarted(true)}>Start</button>*/}</>)
    }</>;

  return (
    <div className="App">
      <header className="App-header">
        {setup}
        {isStarted ? <Timer onSwitch={onSwitch} name={names[index]} /> : null}
        <Legend isStarted={isStarted} />
      </header>
    </div>
  );
}

export default App;
