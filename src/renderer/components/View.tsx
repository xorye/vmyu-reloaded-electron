import * as React from 'react';
import WordsView from './WordsView';
import PagesView from './PagesView';
import './css/View.css';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import { ViewEnum } from '../store/currentView/types';

interface IProps {
    currentView: ViewEnum;
}

export class View extends React.Component<IProps> {
    render() {
        let view;

        if (this.props.currentView === ViewEnum.PAGES) {
            view = <PagesView />;
        } else {
            view = <WordsView />;
        }

        return <div className="view">{view}</div>;
    }
}
const mapStateToProps = (state: StoreInterface) => ({
    currentView: state.currentView.view
});

export default connect(mapStateToProps, {})(View);
