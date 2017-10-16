import React, {Component} from 'react';
import {NavLink as Link} from 'react-router-dom';

import DashboardSVG from './icons/_DashboardSVG';
import NotesSVG from './icons/_NotesSVG';
import CategoriesSVG from './icons/_CategoriesSVG';

class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <Link exact
                      to="/"
                      className="Sidebar__navLink"
                      activeClassName="active">
                    <div className="Sidebar__navWrap">
                        <DashboardSVG/>
                        Dashboard
                    </div>
                </Link>
                <Link to="/notes"
                      className="Sidebar__navLink"
                      activeClassName="active">
                    <div className="Sidebar__navWrap">
                        <NotesSVG/>
                        Notes
                    </div>
                </Link>
                <Link to="/categories"
                      className="Sidebar__navLink"
                      activeClassName="active">
                    <div className="Sidebar__navWrap">
                        <CategoriesSVG/>
                        Categories
                    </div>
                </Link>
            </div>
        )
    }
}

export default Sidebar;