import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Modal, ModalHeader, ModalFooter} from '../common/_Modal';
import Button from '../common/_Button';

class ConfirmAction extends Component {
    render() {
        return (
            <div className="ConfirmAction">
                <Modal>
                    <ModalHeader onClose={this.props.onCancel}
                                 closeButton={false}>
                        {this.props.confirmText}
                    </ModalHeader>
                    <ModalFooter centeredContent={true}>
                        <Button text="Confirm"
                                type="primary"
                                onClick={this.props.onConfirm}/>
                        <Button text="Cancel"
                                type="danger"
                                onClick={this.props.onCancel}/>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

ConfirmAction.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    confirmText: PropTypes.string.isRequired
};

export default ConfirmAction;