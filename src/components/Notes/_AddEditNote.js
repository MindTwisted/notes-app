import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

import {Modal, ModalBody, ModalFooter, ModalHeader} from '../common/_Modal';
import Button from '../common/_Button';
import {FormGroup, InputField} from '../common/_Form';

class AddEditNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bodyValue: this.props.body
        };

        this.onBodyChange = this.onBodyChange.bind(this);
        this.onEditorFocus = this.onEditorFocus.bind(this);
        this.onEditorBlur = this.onEditorBlur.bind(this);
    }

    componentDidMount() {
        this.editorDOMElement = document.querySelector('.AddEditNote__RTE');
    }

    onBodyChange(value) {
        this.setState({
            ...this.state,
            bodyValue: value
        })
    }

    onEditorFocus() {
        this.editorDOMElement.classList.add('AddEditNote__RTE--isFocus');
    }

    onEditorBlur() {
        this.editorDOMElement.classList.remove('AddEditNote__RTE--isFocus');
    }

    render() {
        const renderModalHeader = () => {
            return this.props.type === 'ADD' ? 'Add new note' :
                this.props.type === 'EDIT' ? 'Edit note' : '';
        };

        const renderEditor = () => {
            return (
                <div className="AddEditNote__RTE">
                    <RichTextEditor placeholder="Note body"
                                    value={this.state.bodyValue}
                                    onChange={this.onBodyChange}
                                    onFocus={this.onEditorFocus}
                                    onBlur={this.onEditorBlur}/>
                </div>
            )
        };
        
        return (
            <div className="AddEditNote">
                <Modal size="large">
                    <ModalHeader onClose={this.props.closeModal}>
                        {renderModalHeader()}
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup label="Title">
                            <InputField type="text"
                                        placeholder="Note title"
                                        defaultValue={this.props.title}
                                        inputRef={el => this.inputNoteTitle = el}
                                        errorMessages={[]}/>
                        </FormGroup>
                        <div className="AddEditNote__noteBody">
                            <p>Body</p>
                            {renderEditor()}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button text='Save'
                                type='primary'
                                onClick={() => null}/>
                        <Button text='Close'
                                onClick={this.props.closeModal}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

AddEditNote.propTypes = {
    type: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.object,
    category_id: PropTypes.string
};

export default AddEditNote;