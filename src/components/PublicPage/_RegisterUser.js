import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalBody, ModalFooter} from '../common/_Modal';
import {FormGroup, InputField} from '../common/_Form';
import Button from '../common/_Button';

import {validateEmail, validatePassword} from '../../utils/validationUtils';

class RegisterUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: {
                errors: []
            },
            password: {
                errors: []
            }
        };

        this.handleRegisterUser = this.handleRegisterUser.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    componentDidMount() {
        this.inputElementEmail.focus();

        this.DOMElement = document.querySelector('.RegisterUser');
        this.DOMElement.addEventListener('keyup', this.handleEnterPress);
    }

    componentWillUnmount() {
        this.DOMElement.removeEventListener('keyup', this.handleEnterPress);
    }

    handleEnterPress(event) {
        const keyName = event.key;

        if (keyName === 'Enter') {
            this.handleRegisterUser();
        }
    }

    resetErrors() {
        this.setState({
            email: {
                errors: []
            },
            password: {
                errors: []
            }
        })
    }

    handleRegisterUser() {
        this.resetErrors();
        const email = this.inputElementEmail.value;
        const password = this.inputElementPassword.value;

        let emailErrors = validateEmail(email);
        let passwordErrors = validatePassword(password);

        if (emailErrors.length > 0 || passwordErrors.length > 0) {
            this.setState({
                email: {
                    errors: emailErrors
                },
                password: {
                    errors: passwordErrors
                }
            })
        }

        if (emailErrors.length === 0 && passwordErrors.length === 0) {
            this.props.onSubmit(email, password);
        }
    }

    render() {
        return (
            <div className="RegisterUser">
                <Modal>
                    <ModalHeader onClose={this.props.onClose}>
                        Register User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup label="User Email">
                            <InputField type="email"
                                        defaultValue=""
                                        inputRef={el => this.inputElementEmail = el}
                                        errorMessages={this.state.email.errors}/>
                        </FormGroup>
                        <FormGroup label="User Password">
                            <InputField type="password"
                                        defaultValue=""
                                        inputRef={el => this.inputElementPassword = el}
                                        errorMessages={this.state.password.errors}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button text="Register"
                                type="primary"
                                onClick={this.handleRegisterUser}/>
                        <Button text="Close"
                                onClick={this.props.onClose}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

RegisterUser.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default RegisterUser;