import React from 'react';
import PropTypes from 'prop-types';

export function Modal(props) {
    const sizeClassNames = {
        'default': '',
        'small': 'Modal__content--isSmall',
        'large': 'Modal__content--isLarge'
    };

    return (
        <div className="Modal">
            <div className={`Modal__content ${sizeClassNames[props.size]}`}>
                {props.children}
            </div>
        </div>
    )
}

Modal.defaultProps = {
    size: 'default'
};

export function ModalHeader(props) {
    return (
        <div className="Modal__header">
            {props.children}
            <div className="Modal__close"
                 onClick={props.onClose}>
                &#10005;
            </div>
        </div>
    )
}

ModalHeader.propTypes = {
    onClose: PropTypes.func.isRequired
};

export function ModalBody(props) {
    return (
        <div className="Modal__body">
            {props.children}
        </div>
    )
}

export function ModalFooter(props) {
    return (
        <div className="Modal__footer">
            {props.children}
        </div>
    )
}