import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AddField from './_AddField';
import {validateName} from '../../utils/validationUtils';

class AddName extends Component {
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
            <AddField title="Add Name"
                      placeholder="Enter your name here"
                      fieldType="text"
                      errors={this.state.errors}
                      onSubmitAdding={this.handleNameSubmit}
                      clearErrors={this.clearErrors}/>
        )
    }
}

AddName.propTypes = {
    updateUserName: PropTypes.func.isRequired
};

export default AddName;