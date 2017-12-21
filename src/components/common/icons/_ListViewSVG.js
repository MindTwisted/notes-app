import React from 'react';
import PropTypes from 'prop-types';

export default function ListViewSVG(props) {
    const classList = props.isActive ?
        'ListViewSVG ListViewSVG--isActive' :
        'ListViewSVG';

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             className={classList}>
            <path d="M-0.000,16.000 L-0.000,14.000 L18.000,14.000 L18.000,16.000 L-0.000,16.000 ZM-0.000,7.000 L18.000,7.000 L18.000,9.000 L-0.000,9.000 L-0.000,7.000 ZM-0.000,-0.000 L18.000,-0.000 L18.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"/>
        </svg>
    )
}

ListViewSVG.defaultProps = {
    isActive: false
};

ListViewSVG.propTypes = {
    isActive: PropTypes.bool
};