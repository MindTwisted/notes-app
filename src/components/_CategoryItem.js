import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditSVG from './icons/_EditSVG';
import DeleteSVG from './icons/_DeleteSVG';
import Button from '../helpers/_Button';

class CategoryItem extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    onDeleteClick() {
        this.props.deleteCategory(this.props.id)
            .then(() => {
                this.props.deleteNotification();
                this.props.addSuccessNotification(`Category with title "${this.props.title}" was successfully deleted`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onSaveClick() {
        this.props.updateCategory(this.props.id, this.categoryTitle.value)
            .then(() => {
                this.props.deleteNotification();
                this.props.addSuccessNotification(`Category title was successfully changed to "${this.categoryTitle.value}"`);
                this.props.onCancelEditing();
            })
            .catch((error) => {
                this.props.deleteNotification();
                this.props.addErrorNotification(error.response.data.title.errors.join(' '));
            });
    }

    render() {
        const renderCategoryContent = () => {
            return this.props.isEdited ?
                <div className="CategoryItem__editForm">
                    <div className="CategoryItem__editInput">
                        <input type="text"
                               defaultValue={this.props.title}
                               ref={input => this.categoryTitle = input}/>
                    </div>
                    <div className="CategoryItem__editControls">
                        <Button text="Save"
                                size="small"
                                onClick={this.onSaveClick}/>
                        <Button text="Cancel"
                                size="small"
                                onClick={this.props.onCancelEditing}/>
                    </div>
                </div> :
                <div className="CategoryItem__title">{this.props.title}</div>
        };

        return (
            <div className="CategoryItem">
                {renderCategoryContent()}
                <div className="CategoryItem__controls">
                    <div className="CategoryItem__controlElement"
                         onClick={() => this.props.onEditClick(this.props.id)}>
                        <EditSVG/>
                    </div>
                    <div className="CategoryItem__controlElement"
                         onClick={this.onDeleteClick}>
                        <DeleteSVG/>
                    </div>
                </div>
            </div>
        )
    }
}

CategoryItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onCancelEditing: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    addSuccessNotification: PropTypes.func.isRequired,
    addErrorNotification: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
};

export default CategoryItem;