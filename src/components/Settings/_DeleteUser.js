import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../common/_Button';
import ConfirmAction from '../common/_ConfirmAction';

class DeleteUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalActive: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleDeleting = this.handleDeleting.bind(this);
    }

    openModal() {
        this.setState({
            ...this.state,
            isModalActive: true
        });
    }

    closeModal() {
        this.setState({
            ...this.state,
            isModalActive: false
        });
    }

    handleDeleting() {
        this.props.deleteUser();
    }

    render() {
        return (
            <div className="DeleteUser">
                <Button text="Delete Account"
                        type="danger"
                        onClick={this.openModal}/>
                {this.state.isModalActive ?
                    <ConfirmAction onCancel={this.closeModal}
                                   onConfirm={this.handleDeleting}
                                   confirmText="Delete account? This action cannot be undone."/> :
                    null}
            </div>
        )
    }
}

DeleteUser.propTypes = {
    deleteUser: PropTypes.func.isRequired
};

export default DeleteUser;