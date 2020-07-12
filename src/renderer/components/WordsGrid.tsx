import * as React from 'react';
import { connect } from 'react-redux';
import { StoreInterface } from '../store/store';
import { Word } from '../types';
import WordEntryCompact from './WordEntryCompact';
import { addWords, changeWordsByUrl } from '../store/words/actions';
import './css/WordsGrid.scss';
import Masonry from 'react-masonry-component';
import { WordsViewMode } from '../store/words/types';
import WordEntryCueCard from './WordEntryCueCard';
const stringSimilarity = require('kor-string-similarity');

interface IProps {
    addWords: (words: Word[]) => any;
    changeWordsByUrl: (url: string) => any;
    words: Word[];
    currentUrl: string | undefined;
    searchQuery: string;
    wordsViewMode: WordsViewMode;
}

export class WordsGrid extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.getWordEntries = this.getWordEntries.bind(this);
    }

    async componentDidMount() {
        if (this.props.currentUrl) {
            await this.props.changeWordsByUrl(this.props.currentUrl);
        }
    }

    componentDidUpdate(prev: IProps) {
        if (this.props.searchQuery !== prev.searchQuery) {
            this.forceUpdate();
        }
    }

    getWordEntries() {
        return this.props.words
            .sort((wordA: Word, wordB: Word) => {
                if (this.props.searchQuery.length === 0) {
                    return wordA.timestamp!.getTime() - wordB.timestamp!.getTime();
                }
                const similarityA: number = stringSimilarity.compareTwoStrings(this.props.searchQuery, wordA.wordString);
                const similarityB: number = stringSimilarity.compareTwoStrings(this.props.searchQuery, wordB.wordString);
                return similarityB - similarityA;
            })
            .map((word: Word) => {
                if (this.props.wordsViewMode === WordsViewMode.Compact || this.props.wordsViewMode === WordsViewMode.Uniform) {
                    return <WordEntryCompact word={word} wordsViewMode={this.props.wordsViewMode} key={word.id} />;
                } else if (this.props.wordsViewMode === WordsViewMode.CueCard) {
                    return <WordEntryCueCard word={word} key={word.id} />
                }
            });
    }

    render() {
        const masonryOptions: Masonry.MasonryOptions = {
            horizontalOrder: true,
            gutter: 10,
            fitWidth: true
        }
        const resultEntries = this.getWordEntries();
        return <Masonry className='WordsGrid' options={masonryOptions}>{resultEntries}</Masonry>;
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    words: state.wordsStore.words,
    currentUrl: state.currentUrl.url,
    searchQuery: state.navStore.wordSearchQuery,
    wordsViewMode: state.wordsStore.wordsViewMode
});

export default connect(mapStateToProps, { addWords, changeWordsByUrl })(WordsGrid);
