import * as React from 'react';
import PagesView from './PagesView';
import './css/View.scss';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import { ViewEnum } from '../store/currentView/types';
import { sideBarChanged } from '../store/nav/actions';
import classNames from 'classnames';
import { WordsView } from './WordsView';
import { isMac } from './utils';

interface IProps {
    sideBarChanged: () => any
    currentView: ViewEnum;
    sideBarOpened: boolean;
}

export class View extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.createGreyScreen = this.createGreyScreen.bind(this);
        this.greyScreenClicked = this.greyScreenClicked.bind(this);
    }

    createGreyScreen() {
        return <div className='View__grey_screen' onClick={this.props.sideBarChanged}></div>
    }

    greyScreenClicked() {

    }

    render() {
        let view;
        if (this.props.currentView === ViewEnum.PAGES) {
            view = <PagesView />;
        } else {
            view = <WordsView />;
        }

        const classes = classNames({
            'View': true,
            'View__mac': isMac()
        });

        return <div className={classes}>
            {view}
            {this.props.sideBarOpened ? this.createGreyScreen() : ''}
        </div>;
    }
}
const mapStateToProps = (state: StoreInterface) => ({
    currentView: state.currentView.view,
    sideBarOpened: state.navStore.sideBarOpened
});

export default connect(mapStateToProps, { sideBarChanged })(View);
