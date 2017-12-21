import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Dropdown from './_Dropdown';
import Timer from './_Timer';

import Logo from '../../static/images/logo.png';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <div className="Navbar__left">
                    <div className="Navbar__logo">
                        <img src={Logo} alt="Logo"/>
                    </div>
                    <div className="Navbar__timer">
                        <Timer/>
                    </div>
                </div>
                <div className="Navbar__dropdown">
                    <Dropdown user={this.props.user}
                              logout={this.props.logout}
                              showSettings={this.props.showSettings}/>
                </div>
            </div>
        )
    }
}

Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    showSettings: PropTypes.func.isRequired
};

export default Navbar;