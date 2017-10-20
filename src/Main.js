import React, {Component} from 'react';
import {connect} from 'react-redux';

import App from './components/App/_App';
import PublicPage from './components/PublicPage/_PublicPage';

import * as Actions from './redux/actions/index';

import firebase from './firebase';

class Main extends Component {
    componentDidMount() {
        const dispatch = this.props.dispatch;
        const authActions = Actions.authActions;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(authActions.setLoggedIn());
            } else {
                dispatch(authActions.setLoggedOut());
            }
        });

    }

    render() {
        return (
            <div className="Main">
                {this.props.auth.isLoggedIn ? <App/> : <PublicPage/>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);