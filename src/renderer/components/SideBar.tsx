import * as React from 'react';
import './css/SideBar.css';
import SideBarEntry from './SideBarEntry';
import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
import classNames from 'classnames';

interface IProps {
    sideBarOpened: boolean;
}

export class SideBar extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    render() {

        const classes = classNames({
            'SideBar': true,
            'SideBar__hide': !this.props.sideBarOpened
        });

        return <div className={classes}>
            <SideBarEntry text='Pages' />
            <SideBarEntry text='Words' />
            <SideBarEntry text='Data' />
        </div>
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    sideBarOpened: state.navStore.sideBarOpened
});

export default connect(mapStateToProps, {})(SideBar);