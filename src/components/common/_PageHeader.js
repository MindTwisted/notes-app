import React from 'react';
import PropTypes from 'prop-types';

export default function PageHeader(props) {
    return (
        <div className="PageHeader">
            {props.text}
        </div>
    )
}

PageHeader.propTypes = {
    text: PropTypes.string.isRequired
};