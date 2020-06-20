import * as React from 'react';
import './css/PageEntry.css';
import { Page } from '../types';
import { Dropdown, DropdownOption } from './Dropdown';
import { shortenStringIfRequired, getDomain } from './utils';
import { getDatabase } from '../database/getDatabase';
import { IDatabase } from '../database/IDatabase';
import { removePage } from '../store/pages/actions';

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
        const dropdownOptions: DropdownOption[] = this.getDropdownOptions();
        const pageTitle: string = shortenStringIfRequired(this.props.page.title);
        const numOfWords: number = this.props.page.wordCount;
        return (
            <div className='PageEntry' data-page-id={this.props.page.id}>
                <a href={this.props.page.url} className='page-title'>{pageTitle}</a>
                {/* <Dropdown options={dropdownOptions} /> */}

                <div className='PageEntry__word_count_div'>
                    <span className='PageEntry__word_count_num_text'>{numOfWords}</span>
                    <span className='PageEntry__word_count_text'> word{numOfWords === 1 ? '' : 's'}</span>
                </div>
                <div className='PageEntry__footer'>
                    <span className='PageEntry__domain_name'>{this.state.urlHostName}</span>
                    <span className='PageEntry__small_button' onClick={this.viewWords}>View words</span>
                    <span className='PageEntry__small_button' onClick={this.removeCurrentPage}>Delete page</span>
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
