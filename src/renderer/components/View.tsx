import * as React from 'react';
import PagesView from './PagesView';
import './css/View.scss';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import { ViewEnum } from '../store/currentView/types';
import classNames from 'classnames';
import { WordsView } from './WordsView';
import { isMac } from './utils';

interface IProps {
    currentView: ViewEnum;
    sideBarOpened: boolean;
}

export class View extends React.Component<IProps> {
    render() {
        let view;
        if (this.props.currentView === ViewEnum.PAGES) {
            view = <PagesView />;
        } else {
            view = <WordsView />;
        }

        const classes = classNames({
            'View': true,
            'View__mac': isMac(),
            'View__sidebar_opened': this.props.sideBarOpened
        });

        return <div className={classes}>{view}</div>;
    }
}
const mapStateToProps = (state: StoreInterface) => ({
    currentView: state.currentView.view,
    sideBarOpened: state.navStore.sideBarOpened
});

export default connect(mapStateToProps, {})(View);
