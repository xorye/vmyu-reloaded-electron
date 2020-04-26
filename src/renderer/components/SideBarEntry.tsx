import * as React from 'react';
import './css/SideBarEntry.css';

interface IProps {
    text: string
}


class SideBarEntry extends React.Component<IProps> {
    render() {
        return <div className='SideBarEntry SideBar__selected'>{this.props.text}</div>
    }
}

export default SideBarEntry