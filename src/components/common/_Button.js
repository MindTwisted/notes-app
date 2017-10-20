import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    const typeClassNames = {
        default: '',
        primary: 'Button--isPrimary',
        main: 'Button--isMain'
    };

    const sizeClassNames = {
        default: '',
        small: 'Button--isSmall'
    };

    return (
        <button className={`Button ${typeClassNames[props.type]} ${sizeClassNames[props.size]}`}
                onClick={props.onClick}>
            {props.text}
        </button>
    )
}

Button.defaultProps = {
    type: 'default',
    size: 'default'
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};