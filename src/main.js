import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/widget';

function app(window) {
  window.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(<Calculator />, document.getElementById('energy_calculator'));
  })
}



app(window);

export default app;
