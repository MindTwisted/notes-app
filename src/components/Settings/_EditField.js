import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditSVG from '../common/icons/_EditSVG';
import {FormGroup, InputField} from "../common/_Form";
import Button from '../common/_Button';

class EditField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };

        this.setFieldEditing = this.setFieldEditing.bind(this);
        this.cancelFieldEditing = this.cancelFieldEditing.bind(this);
        this.onFieldSubmit = this.onFieldSubmit.bind(this);
    }

    setFieldEditing() {
        this.setState({
            ...this.state,
            isEditing: true
        })
    }

    cancelFieldEditing() {
        this.props.clearErrors();
        this.setState({
            ...this.state,
            isEditing: false
        })
    }

    onFieldSubmit() {
        const fieldValue = this.inputElement.value;

        if (fieldValue.trim() === this.props.fieldValue) {
            this.cancelFieldEditing();
            return false;
        } else {
            this.props.onSubmitEditing(fieldValue)
                .then(() => {
                    this.cancelFieldEditing();
                })
                .catch(() => null);
        }
    }

    render() {
        const renderEditForm = () => {
            return (
                <div className="EditField__editForm">
                    <div className="EditField__input">
                        <InputField type={this.props.fieldType}
                                    defaultValue={this.props.fieldValue}
                                    placeholder={this.props.placeholder}
                                    inputRef={el => this.inputElement = el}
                                    errorMessages={this.props.errors}/>
                    </div>
                    <div className="EditField__saveButton">
                        <Button text="Save"
                                type="primary"
                                onClick={this.onFieldSubmit}/>
                    </div>
                    <div className="EditField__cancelButton">
                        <Button text="Cancel"
                                onClick={this.cancelFieldEditing}/>
                    </div>
                </div>
            )
        };

        const renderViewForm = () => {
            return (
                <div className="EditField__viewForm">
                    <span className="EditField__viewValue">{this.props.fieldValue}</span>
                    <span className="EditField__editButton"
                          onClick={this.setFieldEditing}>
                        <EditSVG/>
                    </span>
                </div>
            )
        };

        return (
            <div className="EditField">
                <FormGroup label={this.props.label}>
                    {this.state.isEditing ? renderEditForm() : renderViewForm()}
                </FormGroup>
            </div>
        )
    }
}

EditField.propTypes = {
    label: PropTypes.string.isRequired,
    fieldValue: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    fieldType: PropTypes.string.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    clearErrors: PropTypes.func.isRequired
};

export default EditField;