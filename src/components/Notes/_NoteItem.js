import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditSVG from '../common/icons/_EditSVG';
import DeleteSVG from '../common/icons/_DeleteSVG';

class NoteItem extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onDeleteClick() {

    }

    render() {
        const noteItemClassList = this.props.viewMode === 'GRID' ?
            'NoteItem NoteItem--gridMode' : 'NoteItem';


        return (
            <div className={noteItemClassList}>
                <div className="NoteItem__content">
                    <div className="NoteItem__title">{this.props.title}</div>
                    <div className="NoteItem__body">{this.props.body.length > 200 ?
                        this.props.body.substr(0, 200) + '...' :
                        this.props.body}</div>
                </div>
                <div className="NoteItem__controls">
                    <div className="NoteItem__controlElement"
                         onClick={() => null}>
                        <EditSVG/>
                    </div>
                    <div className="NoteItem__controlElement"
                         onClick={() => null}>
                        <DeleteSVG/>
                    </div>
                </div>
            </div>
        )
    }
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    viewMode: PropTypes.string.isRequired
};

export default NoteItem;