import * as React from 'react';
import { connect } from 'react-redux';
import { setCurrentUrl } from '../store/currentUrl/actions';
import { changeView } from '../store/currentView/actions';
import { ViewEnum } from '../store/currentView/types';
import { addPages, removePage, clearPages, fetchAllPagesFromDatabase } from '../store/pages/actions';
import { StoreInterface } from '../store/store';
import { Page } from '../types';
import './css/PagesView.scss';
import { PageEntry } from './PageEntry';
const stringSimilarity = require('kor-string-similarity');

interface PagesViewProps {
    changeView: (newView: ViewEnum) => any;
    addPages: (words: Page[]) => any;
    removePage: (page: Page) => any;
    setCurrentUrl: (url: string) => any;
    clearPages: () => any;
    fetchAllPagesFromDatabase: () => any;
    pages: Page[];

    searchQuery: string
}

export class PagesView extends React.Component<PagesViewProps> {
    constructor(props: PagesViewProps) {
        super(props);
        this.state = { isToggleOn: true };
        this.changeToWordView = this.changeToWordView.bind(this);
    }
    async componentDidMount() {
        await this.props.fetchAllPagesFromDatabase();
    }

    changeToWordView(url: string) {
        this.props.changeView(ViewEnum.WORDS);
        this.props.setCurrentUrl(url);
        this.props.clearPages();
    }

    pageCompare(first: Page, second: Page) {
        if (!first.timestamp && !second.timestamp) {
            return first.title.localeCompare(second.title);
        }
        if (!second.timestamp) {
            return -1
        }
        if (!first.timestamp) {
            return 1;
        }
        return second.timestamp.getTime() - first.timestamp.getTime();
    }

    render() {
        const resultEntries = this.props.pages
            .sort((pageA: Page, pageB: Page) => {
                if (this.props.searchQuery.length === 0) {
                    return this.pageCompare(pageA, pageB);
                }
                const similarityA: number = stringSimilarity.compareTwoStrings(this.props.searchQuery, pageA.title);
                const similarityB: number = stringSimilarity.compareTwoStrings(this.props.searchQuery, pageB.title);
                return similarityB - similarityA;
            })
            .map((page: Page) => (
                <PageEntry removePage={this.props.removePage} page={page} changeView={this.changeToWordView} />
            ));
        return <div className="PagesView">{resultEntries}</div>;
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    pages: state.pagesStore.pages,
    searchQuery: state.navStore.pageSearchQuery
});

export default connect(mapStateToProps, {
    addPages,
    removePage,
    changeView,
    setCurrentUrl,
    clearPages,
    fetchAllPagesFromDatabase
})(PagesView);
