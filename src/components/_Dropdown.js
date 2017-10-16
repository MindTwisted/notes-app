import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UserSVG from './icons/_UserSVG';
import LogoutSVG from './icons/_LogoutSVG';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    componentDidMount() {
        this.dropdownMenu = document.querySelector('.Dropdown__menu');
        this.dropdownButton = document.querySelector('.Dropdown__button');
        this.dropdownMenuItem = document.querySelector('.Dropdown__menuItem--isClickable');

        this.dropdownButton.addEventListener('click', this.toggleDropdown);
        this.dropdownMenuItem.addEventListener('click', this.toggleDropdown);
    }

    componentWillUnmount() {
        this.dropdownButton.removeEventListener('click', this.toggleDropdown);
        this.dropdownMenuItem.removeEventListener('click', this.toggleDropdown);
    }

    toggleDropdown() {
        this.dropdownMenu.classList.toggle('Dropdown__menu--isVisible');
    }

    render() {
        const renderUserPhoto = () => {
            return this.props.user.photo ?
                <img className="Dropdown__userPhoto"
                     src={`${this.props.user.photo}`}
                     alt="User"/> : null;
        };

        return (
            <div className="Dropdown">
                <div className="Dropdown__button">
                    {renderUserPhoto()}
                    <div className="Dropdown__arrow"/>
                </div>
                <div className="Dropdown__menu">
                    <div className="Dropdown__menuItem">
                        {this.props.user.name}
                    </div>
                    <div className="Dropdown__menuItem Dropdown__menuItem--isClickable"
                         onClick={this.props.showSettings}>
                        <UserSVG/>
                        Settings
                    </div>
                    <div className="Dropdown__menuItem Dropdown__menuItem--isClickable"
                         onClick={this.props.logout}>
                        <LogoutSVG/>
                        Sign Out
                    </div>
                </div>
            </div>
        )
    }
}

Dropdown.propTypes = {
    user: PropTypes.object.isRequired,
    showSettings: PropTypes.func.isRequired
};

export default Dropdown;