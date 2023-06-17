import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.css';

function Popup() {
  return (
    <div className='font-bold bg-red-800'>
      <p>Commanders, if you are seeing this message, then the configuration was successful</p>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));
