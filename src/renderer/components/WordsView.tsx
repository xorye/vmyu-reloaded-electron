import * as React from 'react';
import { connect } from 'react-redux';
import { StoreInterface } from '../store/store';
import { Word } from '../types';
import WordEntry from './WordEntry';
import { addWords, changeWordsByUrl } from '../store/words/actions';
import './css/WordsView.css';

interface WordsViewProps {
    addWords: (words: Word[]) => any;
    changeWordsByUrl: (url: string) => any;
    words: Word[];
    currentUrl: string | undefined;
}

export class WordsView extends React.Component<WordsViewProps> {
    async componentDidMount() {
        if (this.props.currentUrl) {
            await this.props.changeWordsByUrl(this.props.currentUrl);
        }
    }
    render() {
        const resultEntries = this.props.words.map((word: Word) => <WordEntry word={word} />);
        return <div className="WordsView">{resultEntries}</div>;
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    words: state.wordsStore.words,
    currentUrl: state.currentUrl.url
});

export default connect(mapStateToProps, { addWords, changeWordsByUrl })(WordsView);
