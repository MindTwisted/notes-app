import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';

import {HappySmileSVG, SadSmileSVG} from "./icons/_SmilesSVG";

export default class Notification extends Component {
    constructor(props) {
        super(props);

        this.closeNotification = this.closeNotification.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.closeNotification, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    closeNotification() {
        this.props.deleteNotification();
    }

    render() {
        const notificationClassList = this.props.type === 'SUCCESS' ?
            'Notification Notification--isSuccess' :
            'Notification Notification--isError';
        const notificationTitle = this.props.type === 'SUCCESS' ? 'Success' : 'Error';
        const renderIcon = () => {
            return this.props.type === 'SUCCESS' ?
                <HappySmileSVG/> :
                <SadSmileSVG/>
        };

        return (
            <CSSTransitionGroup transitionName="slide"
                                transitionAppear={true}
                                transitionAppearTimeout={500}
                                transitionEnter={false}
                                transitionLeave={false}>
                <div className={notificationClassList}>
                    <div className="Notification__icon">
                        {renderIcon()}
                    </div>
                    <div className="Notification__message">
                        <div className="Notification__title">
                            {notificationTitle}
                        </div>
                        <div className="Notification__text">
                            {this.props.message}
                        </div>
                    </div>
                    <div className="Notification__close"
                         onClick={this.closeNotification}>&#10005;</div>
                </div>
            </CSSTransitionGroup>
        )
    }
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    deleteNotification: PropTypes.func.isRequired
};