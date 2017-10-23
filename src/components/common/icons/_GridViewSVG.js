import React from 'react';
import PropTypes from 'prop-types';

export default function GridViewSVG(props) {
    const classList = props.isActive ?
        'GridViewSVG GridViewSVG--isActive' :
        'GridViewSVG';

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={classList}>
            <path d="M9.000,16.000 L9.000,9.000 L16.000,9.000 L16.000,16.000 L9.000,16.000 ZM9.000,-0.000 L16.000,-0.000 L16.000,7.000 L9.000,7.000 L9.000,-0.000 ZM-0.000,9.000 L7.000,9.000 L7.000,16.000 L-0.000,16.000 L-0.000,9.000 ZM-0.000,-0.000 L7.000,-0.000 L7.000,7.000 L-0.000,7.000 L-0.000,-0.000 Z"/>
        </svg>
    )
}

GridViewSVG.defaultProps = {
    isActive: false
};

GridViewSVG.propTypes = {
    isActive: PropTypes.bool
};