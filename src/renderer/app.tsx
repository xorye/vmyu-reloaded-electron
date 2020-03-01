import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import './components/css/index.css';
import './communication';

// Create main element
const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

// Render components
const render = () => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        mainElement
    );
};

render();
