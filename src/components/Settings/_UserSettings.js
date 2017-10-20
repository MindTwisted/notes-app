import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditName from './_EditName';
import EditEmail from './_EditEmail';
import EditPassword from './_EditPassword';
import AddName from './_AddName';

class UserSettings extends Component {
    render() {
        return (
            <div className="UserSettings">
                {this.props.user.name ?
                    <div className="UserSettings__editField">
                        <EditName user={this.props.user}
                                  updateUserName={this.props.updateUserName}/>
                    </div> :
                    null}
                <div className="UserSettings__editField">
                    <EditEmail user={this.props.user}
                               updateUserEmail={this.props.updateUserEmail}/>
                </div>
                <div className="UserSettings__editField">
                    <EditPassword updateUserPassword={this.props.updateUserPassword}/>
                </div>
                {!this.props.user.name ?
                    <div className="UserSettings__addField">
                        <AddName updateUserName={this.props.updateUserName}/>
                    </div> :
                    null}
            </div>
        )
    }
}

UserSettings.propTypes = {
    user: PropTypes.object.isRequired,
    updateUserEmail: PropTypes.func.isRequired,
    updateUserPassword: PropTypes.func.isRequired,
    updateUserName: PropTypes.func.isRequired
};

export default UserSettings;