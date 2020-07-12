import * as React from 'react';
import './css/WordEntryCueCard.scss';
import { Word } from '../types';

interface IProps {
    word: Word;
}

interface IState {
}
export class WordEntryCueCard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
        }

    }
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
