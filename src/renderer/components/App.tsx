import * as React from 'react';
import { Provider } from 'react-redux';

import './css/App.scss';

import Nav from './Nav';
import View from './View';
import store from '../store/store';
import SideBar from './SideBar';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Nav />
                    <SideBar />
                    <View />
                </div>
            </Provider>
        );
    }
}

export default App;
