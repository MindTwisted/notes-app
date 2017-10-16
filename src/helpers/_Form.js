import React, {Component} from 'react';
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

export class InputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            inputValue: this.props.defaultValue
        });
        this.props.setInputValue(this.props.defaultValue);
        this.props.setInputTarget(this.input);
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
        this.props.setInputValue(e.target.value);
        this.props.setInputTarget(e.target);
    }

    render() {
        const renderErrors = (() => {
            return this.props.errorMessages.map((msg, index) => {
                return (
                    <li key={index}
                        className="InputField__errorItem">{msg}</li>
                )
            });
        })();

        const inputClassList = this.props.errorMessages.length > 0 ?
            'InputField__input InputField__input--isError' :
            'InputField__input';

        return (
            <div className={inputClassList}>
                <input className="InputField__input"
                       type={this.props.type}
                       value={this.state.inputValue}
                       onChange={this.handleInputChange}
                       ref={(input => this.input = input)}/>
                <ul className="InputField__errorsList">
                    {renderErrors}
                </ul>
            </div>
        )
    }
}

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    setInputValue: PropTypes.func.isRequired,
    setInputTarget: PropTypes.func.isRequired,
    errorMessages: PropTypes.array
};