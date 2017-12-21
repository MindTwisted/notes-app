import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalBody, ModalFooter} from '../common/_Modal';
import {FormGroup, InputField} from '../common/_Form';
import Button from '../common/_Button';

import {validateEmail, validatePassword} from '../../utils/validationUtils';

class SignInUser extends Component {
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

        this.handleSignInUser = this.handleSignInUser.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    componentDidMount() {
        this.inputElementEmail.focus();

        this.DOMElement = document.querySelector('.SignInUser');
        this.DOMElement.addEventListener('keyup', this.handleEnterPress);
    }

    componentWillUnmount() {
        this.DOMElement.removeEventListener('keyup', this.handleEnterPress);
    }

    handleEnterPress(event) {
        const keyName = event.key;

        if (keyName === 'Enter') {
            this.handleSignInUser();
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

    handleSignInUser() {
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
            <div className="SignInUser">
                <Modal>
                    <ModalHeader onClose={this.props.onClose}>
                        Sign In User
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
                        <Button text="Sign In"
                                type="primary"
                                onClick={this.handleSignInUser}/>
                        <Button text="Close"
                                onClick={this.props.onClose}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

SignInUser.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SignInUser;