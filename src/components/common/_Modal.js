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
    const modalTitleClassNames = props.closeButton ?
        'Modal__title' :
        'Modal__title Modal__title--centered';

    return (
        <div className="Modal__header">
            <div className={modalTitleClassNames}>
                {props.children}
            </div>
            {props.closeButton ?
                <div className="Modal__close"
                     onClick={props.onClose}>
                    &#10005;
                </div> :
                null}
        </div>
    )
}

ModalHeader.defaultProps = {
    closeButton: true
};

ModalHeader.propTypes = {
    onClose: PropTypes.func.isRequired,
    closeButton: PropTypes.bool
};

export function ModalBody(props) {
    return (
        <div className="Modal__body">
            {props.children}
        </div>
    )
}

export function ModalFooter(props) {
    const modalFooterClassNames = props.centeredContent ?
        'Modal__footer Modal__footer--centered' :
        'Modal__footer';

    return (
        <div className={modalFooterClassNames}>
            {props.children}
        </div>
    )
}

ModalFooter.defaultProps = {
    centeredContent: false
};

ModalFooter.propTypes = {
    centeredContent: PropTypes.bool
};