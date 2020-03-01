import * as React from 'react';
import './css/Dropdown.css';
import classNames from 'classnames';

export interface DropdownOption {
    optionText: string;
    optionAction: (event: React.MouseEvent) => any;
}

interface IProps {
    options: DropdownOption[];
}

interface IState {
    optionsVisible: boolean;
}

export class Dropdown extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            optionsVisible: false
        };
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked() {
        const visible: boolean = this.state.optionsVisible;
        this.setState({ optionsVisible: !visible });
    }

    optionActionClicked(event: React.MouseEvent, action: (event: React.MouseEvent) => any) {
        this.setState({ optionsVisible: false });
        action(event);
    }
    render() {
        let dropdownOptions: JSX.Element | string = '';
        if (this.state.optionsVisible) {
            const optionDivs = this.props.options.map((option: DropdownOption) => (
                <div
                    className="dropdown-option"
                    onClick={e => this.optionActionClicked(e, option.optionAction)}
                >
                    {option.optionText}
                </div>
            ));

            dropdownOptions = <div className="dropdown-options">{optionDivs}</div>;
        }

        const dropdownClasses = classNames({
            dropdown: true,
            'increase-z-index': this.state.optionsVisible
        });
        return (
            <div className={dropdownClasses}>
                <div className="dropdown-button" onClick={this.buttonClicked}></div>
                {dropdownOptions}
            </div>
        );
    }
}
export default Dropdown;
