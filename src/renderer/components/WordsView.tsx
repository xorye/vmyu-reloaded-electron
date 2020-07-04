import * as React from 'react';

import './css/WordsView.css';
import WordsGrid from './WordsGrid';
import WordsViewHeader from './WordsViewHeader';

export class WordsView extends React.Component {
    render() {
        return <div className='WordsView'>
            <WordsViewHeader />
            <WordsGrid />
        </div >;
    }
}