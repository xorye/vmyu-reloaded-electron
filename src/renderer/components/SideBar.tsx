import * as React from 'react';
import './css/SideBar.scss';
import SideBarEntry from './SideBarEntry';
import { changeView } from '../store/currentView/actions';
import { clearWords } from '../store/words/actions';
import { clearPages } from '../store/pages/actions';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { ViewEnum } from '../store/currentView/types';

interface IProps {
    changeView: (newView: ViewEnum) => any;
    clearWords: () => any;
    clearPages: () => any;
    sideBarOpened: boolean;
    currentView: ViewEnum;
}

export class SideBar extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.createChangeView = this.createChangeView.bind(this);
    }
    createChangeView(view: ViewEnum) {
        return () => {
            if (this.props.currentView === view) {
                return;
            }
            this.props.clearWords();
            this.props.clearPages();
            this.props.changeView(view);
        }
    }

    render() {
        const classes = classNames({
            'SideBar': true,
            'SideBar__hide': !this.props.sideBarOpened
        });

        return <div className={classes}>
            <SideBarEntry text='Pages' isSelected={this.props.currentView === ViewEnum.PAGES} onClick={this.createChangeView(ViewEnum.PAGES)} />
            <SideBarEntry text='Words' isSelected={this.props.currentView === ViewEnum.WORDS} onClick={this.createChangeView(ViewEnum.WORDS)} />
        </div>
    }
}
const mapStateToProps = (state: StoreInterface) => ({
    sideBarOpened: state.navStore.sideBarOpened,
    currentView: state.currentView.view
});

export default connect(mapStateToProps, {
    changeView,
    clearWords,
    clearPages
})(SideBar);
