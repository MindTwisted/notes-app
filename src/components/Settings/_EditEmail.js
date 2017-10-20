import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditField from './_EditField';
import {validateEmail} from '../../utils/validationUtils';

class EditEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.clearErrors = this.clearErrors.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    }

    clearErrors() {
        this.setState({
            ...this.state,
            errors: []
        })
    }

    handleEmailSubmit(email) {
        let errors = validateEmail(email);

        if (errors.length > 0) {
            this.setState({
                errors
            });
            return new Promise((resolve, reject) => {
                reject();
            });
        } else {
            return this.props.updateUserEmail(email);
        }
    }

    render() {
        return (
            <EditField label="User Email"
                       fieldType="email"
                       fieldValue={this.props.user.email}
                       onSubmitEditing={this.handleEmailSubmit}
                       errors={this.state.errors}
                       clearErrors={this.clearErrors}/>
        )
    }
}

EditEmail.propTypes = {
    user: PropTypes.object.isRequired,
    updateUserEmail: PropTypes.func.isRequired
};

export default EditEmail;