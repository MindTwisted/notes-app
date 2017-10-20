import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SearchSVG from './icons/_SearchSVG';

class SearchBox extends Component {
    render() {
        return (
            <div className="SearchBox">
                <input type="text"
                       placeholder="Search"
                       className="SearchBox__input"
                       ref={(input) => this.searchText = input}
                       onChange={() => this.props.onSearchChange(this.searchText.value)}/>
                <div className="SearchBox__icon">
                    <SearchSVG/>
                </div>
            </div>
        )
    }
}

SearchBox.propTypes = {
    onSearchChange: PropTypes.func.isRequired
};

export default SearchBox;