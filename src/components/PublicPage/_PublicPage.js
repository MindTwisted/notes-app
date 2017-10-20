import React, {Component} from 'react';
import {connect} from 'react-redux';

import Button from '../common/_Button';
import RegisterUser from './_RegisterUser';
import SignInUser from './_SignInUser';
import Notification from '../common/_Notification';

import * as Actions from '../../redux/actions/index';

class PublicPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeForm: ''
        };

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
    }

    handleRegisterClick() {
        this.setState({
            ...this.state,
            activeForm: 'REGISTER'
        })
    }

    handleSignInClick() {
        this.setState({
            ...this.state,
            activeForm: 'SIGN-IN'
        })
    }

    handleCloseForm() {
        this.setState({
            ...this.state,
            activeForm: ''
        })
    }

    render() {
        const dispatch = this.props.dispatch;
        const authActions = Actions.authActions;
        const notificationActions = Actions.notificationActions;

        const renderForm = () => {
            let form;

            if (this.state.activeForm === 'REGISTER') {
                form = <RegisterUser onClose={this.handleCloseForm}
                                     onSubmit={dispatch(authActions.registerUserRequest)}/>;
            } else if (this.state.activeForm === 'SIGN-IN') {
                form = <SignInUser onClose={this.handleCloseForm}
                                   onSubmit={dispatch(authActions.signInRequest)}/>;
            } else {
                form = null;
            }

            return form;
        };

        const renderNotification = () => {
            return this.props.notification.message && this.props.notification.message.length > 0 ?
                <Notification message={this.props.notification.message}
                              type={this.props.notification.type}
                              deleteNotification={dispatch(notificationActions.removeNotification)}/> :
                null;
        };

        return (
            <div className="PublicPage">
                {renderNotification()}
                {renderForm()}
                <div className="PublicPage__content">
                    <h1 className="PublicPage__title">
                        Welcome to Notes App
                    </h1>
                    <p className="PublicPage__description">
                        Please
                        &nbsp;
                        <Button text="Sign In"
                                size="small"
                                onClick={this.handleSignInClick}/>
                        &nbsp;
                        or
                        &nbsp;
                        <Button text="Register"
                                size="small"
                                onClick={this.handleRegisterClick}/> to use app
                        &nbsp;
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    notification: state.notification
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublicPage);