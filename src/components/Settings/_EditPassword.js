import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditField from './_EditField';
import {validatePassword} from '../../utils/validationUtils';

class EditPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.clearErrors = this.clearErrors.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    }

    clearErrors() {
        this.setState({
            ...this.state,
            errors: []
        })
    }

    handlePasswordSubmit(password) {
        let errors = validatePassword(password);

        if (errors.length > 0) {
            this.setState({
                errors
            });
            return new Promise((resolve, reject) => {
                reject();
            });
        } else {
            return this.props.updateUserPassword(password);
        }
    }

    render() {
        return (
            <EditField label="User Password"
                       fieldType="password"
                       fieldValue=""
                       placeholder="Enter new password"
                       onSubmitEditing={this.handlePasswordSubmit}
                       errors={this.state.errors}
                       clearErrors={this.clearErrors}/>
        )
    }
}

EditPassword.propTypes = {
    updateUserPassword: PropTypes.func.isRequired
};

export default EditPassword;