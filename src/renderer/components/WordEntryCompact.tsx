import * as React from 'react';
import './css/WordEntryCompact.scss';
import { Word, USER_ID } from '../types';
import WordEntryDefinition from './WordEntryDefinition';
import { getDatabase } from '../database/getDatabase';
import { IDatabase } from '../database/IDatabase';
import Dropdown, { DropdownOption } from './Dropdown';
import { WordsViewMode } from '../store/words/types';
import classNames from 'classnames';

interface IProps {
    word: Word;
    wordsViewMode: WordsViewMode;
}

interface IState {
    word: string;
    editMode: boolean;
    inputLines: InputLine[];
}

export interface InputLine {
    line: string;
}

export class WordEntryCompact extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            editMode: false,
            inputLines: [],
            word: this.props.word.wordString
        };
        this.changeMode = this.changeMode.bind(this);
        this.saveEditsToDatabase = this.saveEditsToDatabase.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.trimWordAndDefs = this.trimWordAndDefs.bind(this);
        this.getCompactWordEntries = this.getCompactWordEntries.bind(this);
        this.props.word.definitions.forEach((s: string) => {
            this.state.inputLines.push({ line: s });
        });
    }

    changeMode(): void {
        if (this.state.editMode) {
            this.saveEditsToDatabase();
            this.setState({ editMode: false });
        } else {
            this.setState({ editMode: true });
        }
    }

    saveEditsToDatabase(): void {
        const { word, inputLines } = this.trimWordAndDefs();
        const database: IDatabase | undefined = getDatabase();
        if (!database) return;
        const definitions: string[] = inputLines.map((i: InputLine) => i.line);
        database.updateWord(USER_ID, this.props.word.id!, word, definitions);
    }

    trimWordAndDefs(): { word: string; inputLines: InputLine[] } {
        const trimmedWord: string = this.state.word.trim();
        const trimmedDefs: InputLine[] = this.state.inputLines.map((i: InputLine) => {
            return {
                line: i.line.trim()
            };
        });

        this.setState({ word: trimmedWord, inputLines: trimmedDefs });
        return {
            word: trimmedWord,
            inputLines: trimmedDefs
        };
    }

    inputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ word: event.target.value });
    }

    getCompactWordEntries() {
        const definitions = this.state.inputLines.map((i: InputLine) => (
            <WordEntryDefinition editMode={this.state.editMode} inputLine={i} />
        ));

        const wordContent = this.state.editMode ? (
            <input className="word" defaultValue={this.state.word} onChange={this.inputChanged} />
        ) : (
                <span className="word">{this.state.word}</span>
            );

        const dropdownOptions: DropdownOption[] = this.getDropdownOptions();
        return <React.Fragment>
            {wordContent}
            {definitions}
            {this.props.word.timestamp?.toString()}
            <Dropdown options={dropdownOptions} />
        </React.Fragment>
    }

    render() {
        const classes = classNames({
            WordEntryCompact: true,
            WordEntryCompact__uniform: this.props.wordsViewMode === WordsViewMode.Uniform
        })
        return (
            <div className={classes} data-word-id={this.props.word.id}>
                {this.getCompactWordEntries()}
            </div>
        );
    }

    getDropdownOptions(): DropdownOption[] {
        const options: DropdownOption[] = [];
        options.push({
            optionText: this.state.editMode ? 'Save' : 'Edit',
            optionAction: this.changeMode
        });
        options.push({
            optionText: 'Remove word',
            optionAction: () => { }
        });
        return options;
    }
}

export default WordEntryCompact;
