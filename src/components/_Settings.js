import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalBody, ModalFooter} from "../helpers/_Modal";
import Button from '../helpers/_Button';
import {FormGroup, InputField} from "../helpers/_Form";

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: {
                errors: []
            },
            email: {
                errors: []
            },
            photo: {
                errors: []
            }
        };

        this.onSaveClick = this.onSaveClick.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
    }

    componentDidMount() {
        this.userNameTarget.focus();
    }

    clearErrors() {
        this.setState({
            ...this.state,
            name: {
                errors: []
            },
            email: {
                errors: []
            },
            photo: {
                errors: []
            }
        })
    }

    onSaveClick() {
        const userName = this.userName.trim();
        const userEmail = this.userEmail.trim();
        const userPhoto = this.userPhoto.files[0];

        if (this.props.user.name === userName &&
            this.props.user.email === userEmail &&
            !userPhoto) {
            this.props.hideSettings();
            return false;
        }

        this.clearErrors();
        this.props.updateUser(userName, userEmail, userPhoto)
            .then(() => {
                this.props.deleteNotification();
                this.props.addSuccessNotification('User data was successfully updated');
                this.props.hideSettings();
            })
            .catch((error) => {
                this.setState({
                    ...this.state,
                    ...error.response.data
                });
            });
    }

    render() {
        return (
            <div className="Settings">
                <Modal size='large'>
                    <ModalHeader onClose={this.props.hideSettings}>
                        User Settings
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup label="User Name">
                            <InputField type="text"
                                        defaultValue={this.props.user.name}
                                        setInputValue={input => this.userName = input}
                                        setInputTarget={input => this.userNameTarget = input}
                                        errorMessages={this.state.name.errors}/>
                        </FormGroup>
                        <FormGroup label="User Email">
                            <InputField type="email"
                                        defaultValue={this.props.user.email}
                                        setInputValue={input => this.userEmail = input}
                                        setInputTarget={input => this.userEmailTarget = input}
                                        errorMessages={this.state.email.errors}/>
                        </FormGroup>
                        <FormGroup label="User Photo">
                            <InputField type="file"
                                        defaultValue=''
                                        setInputValue={() => null}
                                        setInputTarget={input => this.userPhoto = input}
                                        errorMessages={this.state.photo.errors}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button text='Save'
                                type='primary'
                                onClick={this.onSaveClick}/>
                        <Button text='Close'
                                onClick={this.props.hideSettings}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

Settings.propTypes = {
    hideSettings: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    addSuccessNotification: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired
};

export default Settings;