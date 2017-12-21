import React, {Component} from 'react';
import {
    HashRouter as Router,
    Route
} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from '../Navbar/_Navbar';
import Sidebar from "../Sidebar/_Sidebar";
import Dashboard from '../Dashboard/_Dashboard';
import Notes from '../Notes/_Notes';
import Categories from '../Categories/_Categories';
import Settings from '../Settings/_Settings';
import Notification from '../common/_Notification';
import Preloader from '../common/_Preloader';

import * as Actions from '../../redux/actions/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSettingsVisible: false
        };

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
    }

    componentDidMount() {
        const dispatch = this.props.dispatch;
        const userActions = Actions.userActions;
        const fetchActions = Actions.fetchActions;

        dispatch(userActions.fetchUser());
        dispatch(fetchActions.fetchData());
    }

    showSettings() {
        this.setState((prevState) => {
            return {
                ...prevState,
                isSettingsVisible: true
            }
        })
    }

    hideSettings() {
        this.setState((prevState) => {
            return {
                ...prevState,
                isSettingsVisible: false
            }
        })
    }

    render() {
        const dispatch = this.props.dispatch;
        const userActions = Actions.userActions;
        const notificationActions = Actions.notificationActions;
        const authActions = Actions.authActions;

        const renderSettings = () => {
            return this.state.isSettingsVisible ?
                <Settings hideSettings={this.hideSettings}
                          user={this.props.user}
                          updateUserEmail={dispatch(userActions.updateUserEmail)}
                          updateUserPassword={dispatch(userActions.updateUserPassword)}
                          updateUserName={dispatch(userActions.updateUserName)}
                          reAuthUser={dispatch(authActions.reAuthenticateRequest)}
                          deleteUser={dispatch(authActions.deleteAccountRequest)}/> :
                null
        };

        const renderNotification = () => {
            return this.props.notification.message && this.props.notification.message.length > 0 ?
                <Notification message={this.props.notification.message}
                              type={this.props.notification.type}
                              deleteNotification={dispatch(notificationActions.removeNotification)}/> :
                null;
        };

        const renderPreloader = () => {
            return this.props.appSettings.isLoading ? <Preloader/> : null;
        };

        return (
            <Router>
                <div className="App">
                    {renderPreloader()}
                    {renderNotification()}
                    {renderSettings()}
                    <div className="App__navbar">
                        <Navbar user={this.props.user}
                                logout={dispatch(authActions.signOutRequest)}
                                showSettings={this.showSettings}/>
                    </div>
                    <div className="App__content">
                        <div className="App__sidebar">
                            <Sidebar/>
                        </div>
                        <div className="App__components">
                            <Route exact
                                   path="/"
                                   component={Dashboard}/>
                            <Route path="/notes"
                                   component={Notes}/>
                            <Route path="/categories"
                                   component={Categories}/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    notification: state.notification,
    appSettings: state.appSettings
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);