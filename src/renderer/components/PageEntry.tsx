import * as React from 'react';
import './css/PageEntry.css';
import { Page } from '../types';
import { Dropdown, DropdownOption } from './Dropdown';
import { shortenStringIfRequired, getDomain } from './utils';

interface IProps {
    changeView: (url: string) => any;
    page: Page;
}

interface IState {
    urlHostName: string;
}

export class PageEntry extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.viewWords = this.viewWords.bind(this);
        this.state = {
            urlHostName: getDomain(this.props.page.url)!
        };
    }

    viewWords() {
        this.props.changeView(this.props.page.url);
    }

    render() {
        const dropdownOptions: DropdownOption[] = this.getDropdownOptions();
        const pageTitle: string = shortenStringIfRequired(this.props.page.title);
        return (
            <div className="PageEntry" data-page-id={this.props.page.id}>
                <span className="page-title">{pageTitle}</span>
                <Dropdown options={dropdownOptions} />
                <span className="page-domain">{this.state.urlHostName}</span>
            </div>
        );
    }

    getDropdownOptions(): DropdownOption[] {
        const options: DropdownOption[] = [];
        options.push({
            optionText: 'View words',
            optionAction: this.viewWords
        });
        options.push({
            optionText: 'Copy url to clipboard',
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
