import * as React from 'react';
import './css/WordEntryCueCard.scss';
import { Word } from '../types';

interface IProps {
    word: Word;
}

export class WordEntryCueCard extends React.Component<IProps> {
    render() {
        return (
            <div className='WordEntryCueCard'>
                <div className='WordEntryCueCard__word'>{this.props.word.wordString}</div>
                <div className='WordEntryCueCard__definition'>{this.props.word.definitions}</div>
            </div>
        );
    }
}

export default WordEntryCueCard;
