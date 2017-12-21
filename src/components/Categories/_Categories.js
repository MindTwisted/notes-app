import React, {Component} from 'react';
import {connect} from 'react-redux';

import PageHeader from "../common/_PageHeader";
import Button from '../common/_Button';
import CategoryItem from './_CategoryItem';
import SearchBox from '../common/_SearchBox';
import AddCategory from './_AddCategory';
import {ItemsControlPanel, Filters, Controls} from '../common/_ItemsControlPanel';

import * as TodoActions from '../../redux/actions/index';

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
                                     categories={this.props.categories}
                                     isEdited={this.state.categoryOnEditID === item.id}
                                     onEditClick={this.setCategoryOnEdit}
                                     onCancelEditing={this.clearCategoryOnEdit}
                                     updateCategory={dispatch(categoriesActions.updateCategoryRequest)}
                                     deleteCategory={dispatch(categoriesActions.deleteCategoryRequest)}/>;
            })
        };

        const renderAddCategoryModal = () => {
            return this.state.addCategoryModal.isVisible ?
                <AddCategory hideAddCategoryModal={this.hideAddCategoryModal}
                             categories={this.props.categories}
                             addCategory={dispatch(categoriesActions.addCategoryRequest)}/> : null;
        };

        return (
            <div className="Categories">
                {renderAddCategoryModal()}
                <PageHeader text="Categories"/>
                <div className="Categories__content">
                    <div className="Categories__head">
                        <ItemsControlPanel>
                            <Filters>
                                <SearchBox onSearchChange={this.setSearchFilter}/>
                            </Filters>
                            <Controls>
                                <Button text="New Category"
                                        type="main"
                                        onClick={this.showAddCategoryModal}/>
                            </Controls>
                        </ItemsControlPanel>
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