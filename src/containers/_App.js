import React, {Component} from 'react';
import {
    HashRouter as Router,
    Route
} from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from '../components/_Navbar';
import Sidebar from "../components/_Sidebar";
import Dashboard from './_Dashboard';
import Notes from './_Notes';
import Categories from './_Categories';
import Settings from '../components/_Settings';
import Notification from '../components/_Notification';

import * as TodoActions from '../actions';

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
        this.props.dispatch(TodoActions.userActions.fetchUser());
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
        const userActions = TodoActions.userActions;
        const notificationActions = TodoActions.notificationActions;

        const renderSettings = () => {
            return this.state.isSettingsVisible ?
                <Settings hideSettings={this.hideSettings}
                          user={this.props.user}
                          updateUser={dispatch(userActions.updateUser)}
                          addSuccessNotification={dispatch(notificationActions.addSuccessNotification)}
                          deleteNotification={dispatch(notificationActions.removeNotification)}/> :
                null
        };

        const renderNotification = () => {
            return this.props.notification.message && this.props.notification.message.length > 0 ?
                <Notification message={this.props.notification.message}
                              type={this.props.notification.type}
                              deleteNotification={dispatch(notificationActions.removeNotification)}/> :
                null;
        };

        return (
            <Router>
                <div className="App">
                    {renderNotification()}
                    {renderSettings()}
                    <div className="App__navbar">
                        <Navbar user={this.props.user}
                                logout={dispatch(userActions.logout)}
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
    notification: state.notification
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);