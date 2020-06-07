import * as React from 'react';

import './css/WordsView.css';
import WordsGrid from './WordsGrid';

export class WordsView extends React.Component {
    render() {
        return <div className='WordsView'><WordsGrid /></div >;
    }
}