import * as React from 'react';
import './css/Nav.scss';
import { changeView } from '../store/currentView/actions';
import { clearWords } from '../store/words/actions';
import { clearPages } from '../store/pages/actions';
import { sideBarChanged } from '../store/nav/actions';
import { ViewEnum } from '../store/currentView/types';
import { connect } from 'react-redux';
import { StoreInterface } from '../store/store';
import SearchBar from './SearchBar';
import classNames from 'classnames';
import { isMac } from './utils';

interface IProps {
    changeView: (newView: ViewEnum) => any;
    clearWords: () => any;
    clearPages: () => any;
    sideBarChanged: () => any;
    currentView: ViewEnum;
    sideBarOpened: boolean;
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
        const buttonClasses = classNames({
            'hamburger': true,
            'hamburger--3dx': true,
            'is-active': this.props.sideBarOpened
        });

        const macDragBar = isMac() ? <div className='Nav__mac_drag_bar'></div> : '';
        return (
            <div className='Nav'>
                {macDragBar}
                <div className='Nav__content'>
                    <button className={buttonClasses} onClick={this.props.sideBarChanged} type='button'>
                        <span className='hamburger-box'>
                            <span className='hamburger-inner'></span>
                        </span>
                    </button>
                    <span className='Nav__logo'>VMyu</span>
                    <SearchBar />
                    <span className='Nav__name'>David Kwon</span>
                </div>
            </div >
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
    sideBarOpened: state.navStore.sideBarOpened,
    currentView: state.currentView.view
});

export default connect(mapStateToProps, {
    changeView,
    clearWords,
    clearPages,
    sideBarChanged
})(Nav);
