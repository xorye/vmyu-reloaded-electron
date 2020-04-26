import * as React from 'react';
import './css/SideBarEntry.css';
import classNames from 'classnames';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';

interface IProps {
    text: string
    isSelected: boolean
    onClick: () => any;
}

export class SideBarEntry extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    clicked(): void {
        if (this.props.isSelected) {
            return;
        }
        this.props.onClick();
    }

    render() {
        const classes = classNames({
            'SideBarEntry': true,
            'SideBar__selected': this.props.isSelected
        });
        return <div className={classes}>
            <span className='SideBar__text' onClick={this.clicked}>{this.props.text}</span>
        </div>
    }
}

export default SideBarEntry;