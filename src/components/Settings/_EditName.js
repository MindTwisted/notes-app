import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditField from './_EditField';
import {validateName} from '../../utils/validationUtils';

class EditName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.clearErrors = this.clearErrors.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
    }

    clearErrors() {
        this.setState({
            ...this.state,
            errors: []
        })
    }

    handleNameSubmit(name) {
        let errors = validateName(name);

        if (errors.length > 0) {
            this.setState({
                errors
            });
            return new Promise((resolve, reject) => {
                reject();
            });
        } else {
            return this.props.updateUserName(name);
        }
    }

    render() {
        return (
            <EditField label="User Name"
                       fieldType="text"
                       fieldValue={this.props.user.name}
                       onSubmitEditing={this.handleNameSubmit}
                       errors={this.state.errors}
                       clearErrors={this.clearErrors}/>
        )
    }
}

EditName.propTypes = {
    user: PropTypes.object.isRequired,
    updateUserName: PropTypes.func.isRequired
};

export default EditName;