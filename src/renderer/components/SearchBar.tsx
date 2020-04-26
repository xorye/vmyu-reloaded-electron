import * as React from 'react';
import './css/SearchBar.css';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import { searchQueryChanged } from '../store/nav/actions';

interface IProps {
    searchQueryChanged: (str: string) => any;
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

    handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            this.props.searchQueryChanged(this.state.inputValue);
        }
    }

    updateInputValue(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        return <div className='SearchBar'>
            <input className='SearchBar__input' type='text' placeholder='Search words'
                onKeyDown={this.handleKeyDown}
                onChange={this.updateInputValue}
            ></input>
        </div>
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    sideBarOpened: state.navStore.sideBarOpened,
    currentView: state.currentView.view
});

export default connect(mapStateToProps, {
    searchQueryChanged
})(SearchBar);
