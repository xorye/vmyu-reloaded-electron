import React, { Component, ChangeEvent } from 'react';
import './css/WordEntry.css';
import { InputLine } from './WordEntry';

interface IProps {
  editMode: boolean;
  inputLine: InputLine;
}

export class WordEntryDefinition extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
  }

  inputChanged(event: ChangeEvent<HTMLInputElement>) {
    this.props.inputLine.line = event.target.value;
  }

  render() {
    const content = this.props.editMode ? (
      <input
        className='line line-input'
        defaultValue={this.props.inputLine.line}
        onChange={this.inputChanged}
      />
    ) : (
      <span className='line'>{this.props.inputLine.line}</span>
    );
    return content;
  }
}

export default WordEntryDefinition;
