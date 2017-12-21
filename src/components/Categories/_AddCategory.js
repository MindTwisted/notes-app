import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalBody, ModalFooter} from "../common/_Modal";
import Button from '../common/_Button';
import {FormGroup, InputField} from "../common/_Form";

import {validateCategoryAdd} from '../../utils/validationUtils';

class AddCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.onSaveClick = this.onSaveClick.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    componentDidMount() {
        this.inputElement.focus();

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

    clearErrors() {
        this.setState({
            ...this.state,
            errors: []
        })
    }

    onSaveClick() {
        this.clearErrors();
        const categoryTitle = this.inputElement.value;
        const errors = validateCategoryAdd(this.props.categories, categoryTitle);

        if (errors.length > 0) {
            this.setState({
                errors
            })
        } else {
            this.props.addCategory(categoryTitle).then(() => {
                this.props.hideAddCategoryModal();
            });
        }
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
                                        inputRef={el => this.inputElement = el}
                                        defaultValue=""
                                        errorMessages={this.state.errors}/>
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
    addCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
};

export default AddCategory;