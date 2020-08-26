import * as React from 'react';
import './css/PageEntry.scss';
import { Page } from '../types';
import { DropdownOption } from './Dropdown';
import { getDomain } from './utils';
import { getDatabase } from '../database/getDatabase';
import { IDatabase } from '../database/IDatabase';

interface IProps {
    changeView: (url: string) => any;
    removePage: (page: Page) => any;
    page: Page;
}

interface IState {
    urlHostName: string;
}

export class PageEntry extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.viewWords = this.viewWords.bind(this);
        this.removeCurrentPage = this.removeCurrentPage.bind(this);

        this.state = {
            urlHostName: getDomain(this.props.page.url)!
        };
    }

    viewWords() {
        this.props.changeView(this.props.page.url);
    }

    async removeCurrentPage() {
        const database: IDatabase | undefined = await getDatabase();
        if (!database) {
            return;
        }

        try {
            await database.removePage(1, this.props.page);
            await this.props.removePage(this.props.page);
        } catch (e) {
            // do nothing
        }
    }

    render() {
        const pageTitle: string = this.props.page.title;
        const numOfWords: number = this.props.page.wordCount;
        return (
            <div className='PageEntry' data-page-id={this.props.page.id}>
                <div className='PageEntry__left_col'>
                    <div className='PageEntry__title_div'>
                        <a href={this.props.page.url} className='PageEntry__title'>{pageTitle}</a>
                    </div>
                    <div className='PageEntry__footer'>
                        <span className='PageEntry__domain_name'>{this.state.urlHostName}</span>
                        <span className='PageEntry__small_button' onClick={this.viewWords}>View words</span>
                        <span className='PageEntry__small_button' onClick={this.removeCurrentPage}>Delete page</span>
                    </div>
                </div>
                <div className='PageEntry__right_col'>
                    <div className='PageEntry__word_count_div'>
                        <span className='PageEntry__word_count_num_text'>{numOfWords}</span>
                        <span className='PageEntry__word_count_text'> word{numOfWords === 1 ? '' : 's'}</span>
                    </div>
                </div>
            </div>
        );
    }

    getDropdownOptions(): DropdownOption[] {
        const options: DropdownOption[] = [];
        options.push({
            optionText: 'Change title',
            optionAction: this.viewWords
        });
        options.push({
            optionText: 'Remove page',
            optionAction: this.viewWords
        });
        return options;
    }
}

export default PageEntry;
