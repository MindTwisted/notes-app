import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../common/_Button';
import ReSignInUser from './_ReSignInUser';

class ReAuthenticateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalActive: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleReAuthentication = this.handleReAuthentication.bind(this);
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

    handleReAuthentication(password) {
        this.props.reAuthUser(password)
            .then(() => {
                this.closeModal();
            })
            .catch(() => null);
    }

    render() {
        return (
            <div className="ReAuthenticateUser">
                <Button text="Re-authenticate"
                        type="primary"
                        onClick={this.openModal}/>
                {this.state.isModalActive ?
                    <ReSignInUser onClose={this.closeModal}
                                  onSubmit={this.handleReAuthentication}/> :
                    null}
            </div>
        )
    }
}

ReAuthenticateUser.propTypes = {
    reAuthUser: PropTypes.func.isRequired
};

export default ReAuthenticateUser;