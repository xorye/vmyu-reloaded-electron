import * as React from 'react';
import './css/SearchBar.css';

class SearchBar extends React.Component {
    render() {
        return <div className='SearchBar'>
            <input className='SearchBar__input' type='text' placeholder='Search words'></input>
        </div>
    }
}

export default SearchBar