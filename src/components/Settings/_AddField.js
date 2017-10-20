import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

import {InputField} from "../common/_Form";
import Button from '../common/_Button';

class AddField extends Component {
    constructor(props) {
        super(props);

        this.onCollapsibleClose = this.onCollapsibleClose.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    onCollapsibleClose() {
        this.inputElement.value = '';
        this.props.clearErrors();
    }

    handleSaveClick() {
        this.props.onSubmitAdding(this.inputElement.value)
            .then(() => null)
            .catch(() => null);
    }

    render() {
        return (
            <div className="AddField">
                <Collapsible trigger={this.props.title}
                             transitionTime={150}
                             onClosing={this.onCollapsibleClose}>
                    <div className="AddField__content">
                        <div className="AddField__input">
                            <InputField type={this.props.fieldType}
                                        defaultValue=''
                                        placeholder={this.props.placeholder}
                                        inputRef={el => this.inputElement = el}
                                        errorMessages={this.props.errors}/>
                        </div>
                        <div className="AddField__saveButton">
                            <Button text="Save"
                                    type="primary"
                                    onClick={this.handleSaveClick}/>
                        </div>
                    </div>
                </Collapsible>
            </div>
        )
    }
}

AddField.propTypes = {
    title: PropTypes.string.isRequired,
    fieldType: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onSubmitAdding: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired
};

export default AddField;