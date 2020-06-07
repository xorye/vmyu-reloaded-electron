import * as React from 'react';
import './css/SearchBar.css';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import { searchQueryChanged } from '../store/nav/actions';
import { ViewEnum } from '../store/currentView/types';

interface IProps {
    searchQueryChanged: (str: string, view: ViewEnum) => any;
    currentView: ViewEnum;
    pageSearchQuery: string,
    wordSearchQuery: string
}

interface IState {
    inputValue: string;
}

class SearchBar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { inputValue: '' };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    componentDidUpdate(prev: IProps) {
        if (this.props.currentView !== prev.currentView) {
            this.setState({ inputValue: this.getInputValue(this.props) });
        }
    }

    getInputValue(props: IProps): string {
        return props.currentView === ViewEnum.PAGES ? props.pageSearchQuery : props.wordSearchQuery;
    }

    handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            this.props.searchQueryChanged(this.state.inputValue, this.props.currentView);
        }
    }

    updateInputValue(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        const placeHolder: string = this.props.currentView === ViewEnum.PAGES ? 'pages' : 'words';
        const defaultVal: string = this.getInputValue(this.props);
        return <div className='SearchBar'>
            <input className='SearchBar__input'
                type='text'
                placeholder={'Search ' + placeHolder}
                value={this.state.inputValue}
                onKeyDown={this.handleKeyDown}
                onChange={this.updateInputValue}
            ></input>
        </div>
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    sideBarOpened: state.navStore.sideBarOpened,
    currentView: state.currentView.view,
    pageSearchQuery: state.navStore.pageSearchQuery,
    wordSearchQuery: state.navStore.wordSearchQuery
});

export default connect(mapStateToProps, {
    searchQueryChanged
})(SearchBar);
