import * as React from 'react';
import './css/Nav.css';
import { changeView } from '../store/currentView/actions';
import { clearWords } from '../store/words/actions';
import { clearPages } from '../store/pages/actions';
import { ViewEnum } from '../store/currentView/types';
import { connect } from 'react-redux';
import { StoreInterface } from '../store/store';
import { View } from './View';

interface IProps {
    changeView: (newView: ViewEnum) => any;
    clearWords: () => any;
    clearPages: () => any;
    currentView: ViewEnum;
}

class Nav extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.changeView = this.changeView.bind(this);
        this.getCurrentTitle = this.getCurrentTitle.bind(this);
        this.getBackButton = this.getBackButton.bind(this);
    }

    changeView(view: ViewEnum): void {
        if (this.props.currentView === view) {
            return;
        }
        this.props.clearWords();
        this.props.clearPages();
        this.props.changeView(view);
    }

    render() {
        return (
            <div className="nav">
                {this.getBackButton()}
                <div className="nav__button_container">
                    {this.getCurrentTitle()}

                    {/* <div
            className='nav__button'
            onClick={() => this.changeView(ViewEnum.PAGES)}
          >
            Pages
          </div> */}
                </div>
            </div>
        );
    }
    getCurrentTitle(): JSX.Element {
        if (this.props.currentView === ViewEnum.WORDS) {
            return <span className="nav__text">Words</span>;
        } else {
            return <span className="nav__text">Pages</span>;
        }
    }

    getBackButton(): JSX.Element | string {
        if (this.props.currentView === ViewEnum.WORDS) {
            return (
                <div className="nav__backButton" onClick={() => this.changeView(ViewEnum.PAGES)}>
                    ←
                </div>
            );
        } else {
            return <span className="nav__text">Pages</span>;
        }
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    currentView: state.currentView.view
});

export default connect(mapStateToProps, {
    changeView,
    clearWords,
    clearPages
})(Nav);
