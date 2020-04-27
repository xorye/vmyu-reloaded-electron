import * as React from 'react';
import { connect } from 'react-redux';
import { StoreInterface } from '../store/store';
import { Word } from '../types';
import WordEntry from './WordEntry';
import { addWords, changeWordsByUrl } from '../store/words/actions';
import './css/WordsView.css';
import Masonry from 'react-masonry-component';

interface IProps {
    addWords: (words: Word[]) => any;
    changeWordsByUrl: (url: string) => any;
    words: Word[];
    currentUrl: string | undefined;
}

export class WordsView extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    async componentDidMount() {
        if (this.props.currentUrl) {
            await this.props.changeWordsByUrl(this.props.currentUrl);
        }
    }
    render() {
        const masonryOptions: Masonry.MasonryOptions = {
            horizontalOrder: true,
            gutter: 10,
            fitWidth: true
        }
        const resultEntries = this.props.words
            .sort((wordA, wordB) => wordA.timestamp!.getTime() - wordB.timestamp!.getTime())
            .map((word: Word) => <WordEntry word={word} />);
        return <Masonry className='WordsView' options={masonryOptions}>{resultEntries}</Masonry>;
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    words: state.wordsStore.words,
    currentUrl: state.currentUrl.url
});

export default connect(mapStateToProps, { addWords, changeWordsByUrl })(WordsView);
