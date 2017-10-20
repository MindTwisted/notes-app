import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EditSVG from '../common/icons/_EditSVG';
import DeleteSVG from '../common/icons/_DeleteSVG';
import Button from '../common/_Button';

import {validateCategoryUpdate} from '../../utils/validationUtils';

class CategoryItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
    }

    onDeleteClick() {
        this.props.deleteCategory(this.props.id, this.props.title);
    }

    onSaveClick() {
        if (this.props.title === this.categoryTitle.value) {
            this.cancelEditing();
            return false;
        } else {
            const errors = validateCategoryUpdate(this.props.categories,
                this.categoryTitle.value, this.props.title);

            if (errors.length > 0) {
                this.setState({
                    errors
                })
            } else {
                this.props.updateCategory(this.props.id, this.categoryTitle.value)
                    .then(() => {
                        this.cancelEditing();
                    });
            }
        }
    }

    cancelEditing() {
        this.props.onCancelEditing();
        this.resetErrors();
    }

    resetErrors() {
        this.setState({
            ...this.state,
            errors: []
        })
    }

    render() {
        const renderCategoryContent = () => {
            return this.props.isEdited ?
                <div className="CategoryItem__editForm">
                    <div className="CategoryItem__editInput">
                        <input type="text"
                               defaultValue={this.props.title}
                               ref={input => this.categoryTitle = input}/>
                        <ul className="CategoryItem__editErrors">
                            {this.state.errors.map(error => {
                                return (
                                    <li key={error}>{error}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="CategoryItem__editControls">
                        <Button text="Save"
                                size="small"
                                onClick={this.onSaveClick}/>
                        <Button text="Cancel"
                                size="small"
                                onClick={this.cancelEditing}/>
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
    id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    isEdited: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onCancelEditing: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
};

export default CategoryItem;