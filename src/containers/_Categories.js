import React, {Component} from 'react';
import {connect} from 'react-redux';

import PageHeader from "../helpers/_PageHeader";
import Button from '../helpers/_Button';
import CategoryItem from '../components/_CategoryItem';
import SearchBox from '../components/_SearchBox';
import AddCategory from '../components/_AddCategory';

import * as TodoActions from '../actions';

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                text: ''
            },
            addCategoryModal: {
                isVisible: false
            },
            categoryOnEditID: null
        };

        this.setSearchFilter = this.setSearchFilter.bind(this);
        this.showAddCategoryModal = this.showAddCategoryModal.bind(this);
        this.hideAddCategoryModal = this.hideAddCategoryModal.bind(this);
        this.setCategoryOnEdit = this.setCategoryOnEdit.bind(this);
        this.clearCategoryOnEdit = this.clearCategoryOnEdit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(TodoActions.categoriesActions.fetchCategories());
    }

    setSearchFilter(text) {
        this.setState({
            ...this.state,
            filter: {
                text
            }
        })
    }

    showAddCategoryModal() {
        this.setState({
            ...this.state,
            addCategoryModal: {
                isVisible: true
            }
        })
    }

    hideAddCategoryModal() {
        this.setState({
            ...this.state,
            addCategoryModal: {
                isVisible: false
            }
        })
    }

    setCategoryOnEdit(id) {
        this.setState({
            ...this.state,
            categoryOnEditID: id
        })
    }

    clearCategoryOnEdit() {
        this.setState({
            ...this.state,
            categoryOnEditID: null
        })
    }

    render() {
        const dispatch = this.props.dispatch;
        const notificationActions = TodoActions.notificationActions;
        const categoriesActions = TodoActions.categoriesActions;

        const renderCategories = () => {
            const filteredCategories = this.props.categories.filter((item) => {
                const searchText = this.state.filter.text.toLowerCase();
                const title = item.title.toLowerCase();

                return title.indexOf(searchText) !== -1;
            });

            return filteredCategories.map((item) => {
                return <CategoryItem key={item.id}
                                     title={item.title}
                                     id={item.id}
                                     isEdited={this.state.categoryOnEditID === item.id}
                                     onEditClick={this.setCategoryOnEdit}
                                     onCancelEditing={this.clearCategoryOnEdit}
                                     updateCategory={dispatch(categoriesActions.updateCategoryRequest)}
                                     addSuccessNotification={dispatch(notificationActions.addSuccessNotification)}
                                     addErrorNotification={dispatch(notificationActions.addErrorNotification)}
                                     deleteNotification={dispatch(notificationActions.removeNotification)}
                                     deleteCategory={dispatch(categoriesActions.deleteCategoryRequest)}/>;
            })
        };

        const renderAddCategoryModal = () => {
            return this.state.addCategoryModal.isVisible ?
                <AddCategory hideAddCategoryModal={this.hideAddCategoryModal}
                             addSuccessNotification={dispatch(notificationActions.addSuccessNotification)}
                             deleteNotification={dispatch(notificationActions.removeNotification)}
                             addCategory={dispatch(categoriesActions.addCategoryRequest)}/> : null;
        };

        return (
            <div className="Categories">
                {renderAddCategoryModal()}
                <PageHeader text="Categories"/>
                <div className="Categories__content">
                    <div className="Categories__head">
                        <div className="Categories__filters">
                            <SearchBox onSearchChange={this.setSearchFilter}/>
                        </div>
                        <div className="Categories__controls">
                            <Button text="New Category"
                                    type="main"
                                    onClick={this.showAddCategoryModal}/>
                        </div>
                    </div>
                    <div className="Categories__body">
                        {renderCategories().length > 0 ?
                            renderCategories() :
                            <h2 className="Categories__empty">There are no categories yet!</h2>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);