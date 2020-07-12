import * as React from 'react';
import './css/Footer.scss';

import { StoreInterface } from '../store/store';
import { connect } from 'react-redux';
type FooterProps = {
    currentUrl: string | undefined;
};

interface FooterState {
    currentUrl: string;
}

export class Footer extends React.Component<FooterProps, FooterState> {
    render() {
        return (
            <div className="footer">
                <span className="footer__text">Current page: {this.props.currentUrl}</span>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreInterface) => ({
    currentUrl: state.currentUrl.url
});

export default connect(mapStateToProps, {})(Footer);
