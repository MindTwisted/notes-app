import React from 'react';

export function ItemsControlPanel(props) {
    return (
        <div className="ItemsControlPanel">
            {props.children}
        </div>
    )
}

export function Filters(props) {
    return (
        <div className="ItemsControlPanel__filters">
            {props.children}
        </div>
    )
}

export function Controls(props) {
    return (
        <div className="ItemsControlPanel__controls">
            {props.children}
        </div>
    )
}