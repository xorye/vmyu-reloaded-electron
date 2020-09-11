import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { shell } from 'electron';

import App from './components/App';
import './components/css/index.scss';
import './communication';

// Ensure links clicked within Electron are opened in the user's default browser
document.addEventListener('click', function (event: any) {
    if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
        event.preventDefault()
        shell.openExternal(event.target.href)
    }
})

const mainElement = document.createElement('div');
mainElement.id = 'root';
document.body.appendChild(mainElement);

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        mainElement
    );
};

render();
