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
            const page: Page = { title: this.props.page.title, url: this.props.page.url };
            await database.removePage(1, page);
            await this.props.removePage(page);
        } catch (e) {
            // do nothing
        }
    }

    render() {
        const dropdownOptions: DropdownOption[] = this.getDropdownOptions();
        const pageTitle: string = shortenStringIfRequired(this.props.page.title);
        const numOfWords: number = Math.floor(Math.random() * 11);
        return (
            <div className='PageEntry' data-page-id={this.props.page.id}>
                <a href={this.props.page.url} className='page-title'>{pageTitle}</a>
                {/* <Dropdown options={dropdownOptions} /> */}

                <div className='PageEntry__word_count_div'>
                    <span className='PageEntry__word_count_num_text'>{numOfWords}</span>
                    <span className='PageEntry__word_count_text'> word{numOfWords === 1 ? '' : 's'}</span>
                </div>
                <div className='PageEntry__button_div'>
                    <div className='PageEntry__button coloured' onClick={this.viewWords}>View words</div>
                    <div className='PageEntry__button danger' onClick={this.removeCurrentPage}>Remove page</div>
                </div>
                <span className="page-domain">{this.state.urlHostName}</span>
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
