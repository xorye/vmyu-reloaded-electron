import * as React from 'react';

import './css/WordsViewHeader.scss';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import { changeWordsViewMode } from '../store/words/actions';
import { WordsViewMode } from '../store/words/types';

interface IProps {
    changeWordsViewMode: (wordsViewMode: WordsViewMode) => any;
    wordsViewMode: WordsViewMode;
}

class WordsViewHeader extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.selectChanged = this.selectChanged.bind(this);
    }
    selectChanged(event: React.ChangeEvent<HTMLSelectElement>) {
        let newMode: WordsViewMode;
        if (event.target.value === 'Compact') {
            newMode = WordsViewMode.Compact;
        } else if (event.target.value === 'Cue card') {
            newMode = WordsViewMode.CueCard;
        } else if (event.target.value === 'Uniform') {
            newMode = WordsViewMode.Uniform;
        } else {
            return;
        }
        this.props.changeWordsViewMode(newMode);
    }

    render() {
        return <div className='WordsViewHeader'>
            <span className='WordsViewHeader__text'>View: </span>
            <select className='WordsViewHeadwer__select' onChange={this.selectChanged}>
                <option
                    value='Compact'
                    selected={this.props.wordsViewMode === WordsViewMode.Compact}>
                    Compact
                </option>
                <option
                    value='Uniform'
                    selected={this.props.wordsViewMode === WordsViewMode.Uniform}>
                    Uniform
                </option>
                <option
                    value='Cue card'
                    selected={this.props.wordsViewMode === WordsViewMode.CueCard}>
                    Cue card
                </option>
            </select>
        </div >;
    }
}
const mapStateToProps = (state: StoreInterface) => ({
    wordsViewMode: state.wordsStore.wordsViewMode
});

export default connect(mapStateToProps, { changeWordsViewMode })(WordsViewHeader);