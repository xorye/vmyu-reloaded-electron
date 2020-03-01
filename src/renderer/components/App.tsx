import * as React from 'react';
import { Provider } from 'react-redux';

import './css/App.css';

import Nav from './Nav';
import Footer from './Footer';
import View from './View';
import store from '../store/store';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Nav />
                    <View />
                </div>
            </Provider>
        );
    }
}

export default App;
