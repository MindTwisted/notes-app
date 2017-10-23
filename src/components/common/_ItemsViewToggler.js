import React, {Component} from 'react';
import PropTypes from 'prop-types';

import GridViewSVG from './icons/_GridViewSVG';
import ListViewSVG from './icons/_ListViewSVG';

class ItemsViewToggler extends Component {
    render() {
        return (
            <div className="ItemsViewToggler">
                <div className="ItemsViewToggler__item"
                     onClick={this.props.setGridView}>
                    <GridViewSVG isActive={this.props.viewMode === 'GRID'}/>
                </div>
                <div className="ItemsViewToggler__item"
                     onClick={this.props.setListView}>
                    <ListViewSVG isActive={this.props.viewMode === 'LIST'}/>
                </div>
            </div>
        )
    }
}

ItemsViewToggler.propTypes = {
    viewMode: PropTypes.string.isRequired,
    setGridView: PropTypes.func.isRequired,
    setListView: PropTypes.func.isRequired
};

export default ItemsViewToggler;