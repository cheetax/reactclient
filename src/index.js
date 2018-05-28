import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import stylesheet from './materialize/css/materialize.css'
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
