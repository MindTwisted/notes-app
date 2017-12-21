import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditName from './_EditName';
import EditEmail from './_EditEmail';
import EditPassword from './_EditPassword';
import ReAuthenticateUser from './_ReAuthenticateUser';
import DeleteUser from './_DeleteUser';

class UserSettings extends Component {
    render() {
        return (
            <div className="UserSettings">
                <div className="UserSettings__editField">
                    <EditName user={this.props.user}
                              updateUserName={this.props.updateUserName}/>
                </div>
                <div className="UserSettings__editField">
                    <EditEmail user={this.props.user}
                               updateUserEmail={this.props.updateUserEmail}/>
                </div>
                <div className="UserSettings__editField">
                    <EditPassword updateUserPassword={this.props.updateUserPassword}/>
                </div>
                <div className="UserSettings__controlElement">
                    <ReAuthenticateUser reAuthUser={this.props.reAuthUser}/>
                </div>
                <div className="UserSettings__controlElement">
                    <DeleteUser deleteUser={this.props.deleteUser}/>
                </div>
            </div>
        )
    }
}

UserSettings.propTypes = {
    user: PropTypes.object.isRequired,
    updateUserEmail: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    updateUserName: PropTypes.func.isRequired,
    reAuthUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};

export default UserSettings;