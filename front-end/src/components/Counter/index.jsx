import React, { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button type="button" onClick={ (() => setCounter(counter - 1)) }>-</button>
      <input type="text" value={ counter } />
      <button type="button" onClick={ (() => setCounter(counter + 1)) }>+</button>
    </div>
  );
}

export default Counter;
