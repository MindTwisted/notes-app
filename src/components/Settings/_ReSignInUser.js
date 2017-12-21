import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalBody, ModalFooter} from '../common/_Modal';
import {FormGroup, InputField} from '../common/_Form';
import Button from '../common/_Button';

import {validatePassword} from '../../utils/validationUtils';

class ReSignInUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: {
                errors: []
            }
        };

        this.handleReSignInUser = this.handleReSignInUser.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    componentDidMount() {
        this.inputElementPassword.focus();

        this.DOMElement = document.querySelector('.ReSignInUser');
        this.DOMElement.addEventListener('keyup', this.handleEnterPress);
    }

    componentWillUnmount() {
        this.DOMElement.removeEventListener('keyup', this.handleEnterPress);
    }

    handleEnterPress(event) {
        const keyName = event.key;

        if (keyName === 'Enter') {
            this.handleReSignInUser();
        }
    }

    resetErrors() {
        this.setState({
            ...this.state,
            password: {
                errors: []
            }
        })
    }

    handleReSignInUser() {
        this.resetErrors();
        const password = this.inputElementPassword.value;

        let passwordErrors = validatePassword(password);

        if (passwordErrors.length > 0) {
            this.setState({
                ...this.state,
                password: {
                    errors: passwordErrors
                }
            })
        }

        if (passwordErrors.length === 0) {
            this.props.onSubmit(password);
        }
    }

    render() {
        return (
            <div className="ReSignInUser">
                <Modal>
                    <ModalHeader onClose={this.props.onClose}>
                        Re-authenticate user
                    </ModalHeader>
                    <ModalBody>
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
                                onClick={this.handleReSignInUser}/>
                        <Button text="Close"
                                onClick={this.props.onClose}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

ReSignInUser.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default ReSignInUser;