import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalBody, ModalFooter} from "../helpers/_Modal";
import Button from '../helpers/_Button';
import {FormGroup, InputField} from "../helpers/_Form";

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: {
                errors: []
            }
        };

        this.onSaveClick = this.onSaveClick.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    componentDidMount() {
        this.categoryTitleTarget.focus();

        this.DOMElement = document.querySelector('.AddCategory');
        this.DOMElement.addEventListener('keyup', this.handleEnterPress);
    }

    componentWillUnmount() {
        this.DOMElement.removeEventListener('keyup', this.handleEnterPress);
    }

    handleEnterPress(event) {
        const keyName = event.key;

        if (keyName === 'Enter') {
            this.onSaveClick();
        }
    }

    onSaveClick() {
        const categoryTitle = this.categoryTitle ? this.categoryTitle.trim() : '';

        this.props.addCategory(categoryTitle)
            .then(() => {
                this.props.deleteNotification();
                this.props.addSuccessNotification(`Category with title "${categoryTitle}" was successfully added`);
                this.props.hideAddCategoryModal();
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
            <div className="AddCategory">
                <Modal size="small">
                    <ModalHeader onClose={this.props.hideAddCategoryModal}>
                        Add Category
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup label="Category Title">
                            <InputField type="text"
                                        setInputValue={(input) => this.categoryTitle = input}
                                        setInputTarget={(input) => this.categoryTitleTarget = input}
                                        defaultValue=""
                                        errorMessages={this.state.title.errors}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button text='Save'
                                type='primary'
                                onClick={this.onSaveClick}/>
                        <Button text='Close'
                                onClick={this.props.hideAddCategoryModal}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

AddCategory.propTypes = {
    hideAddCategoryModal: PropTypes.func.isRequired,
    addSuccessNotification: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired
};

export default AddCategory;