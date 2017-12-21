import React from 'react';
import PropTypes from 'prop-types';

export function FormGroup(props) {
    return (
        <div className="FormGroup">
            <label>
                <p className="FormGroup__label">{props.label}</p>
                {props.children}
            </label>
        </div>
    )
}

FormGroup.propTypes = {
    label: PropTypes.string
};

export function InputField(props) {
    const renderErrors = () => {
        return props.errorMessages.map((msg, index) => {
            return (
                <li key={index}
                    className="InputField__errorItem">{msg}</li>
            )
        });
    };

    const inputClassList = props.errorMessages.length > 0 ?
        'InputField InputField--isError' :
        'InputField';

    return (
        <div className={inputClassList}>
            <div className="InputField__input">
                <input type={props.type}
                       defaultValue={props.defaultValue}
                       placeholder={props.placeholder}
                       ref={props.inputRef}/>
            </div>
            <ul className="InputField__errorsList">
                {renderErrors()}
            </ul>
        </div>
    )
}

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessages: PropTypes.array.isRequired,
    inputRef: PropTypes.func
};