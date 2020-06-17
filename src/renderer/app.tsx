import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { shell } from 'electron';

import App from './components/App';
import './components/css/index.css';
import './communication';

document.addEventListener('click', function (event: any) {
    if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
        event.preventDefault()
        shell.openExternal(event.target.href)
    }
})

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
