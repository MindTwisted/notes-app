import React, {Component} from 'react';
import {connect} from 'react-redux';
import RichTextEditor from 'react-rte';

import PageHeader from '../common/_PageHeader';
import {ItemsControlPanel, Filters, Controls} from '../common/_ItemsControlPanel';
import Button from '../common/_Button';
import SearchBox from '../common/_SearchBox';
import NoteItem from './_NoteItem';
import ItemsViewToggler from '../common/_ItemsViewToggler';
import AddEditNote from './_AddEditNote';

import * as TodoActions from '../../redux/actions/index';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.emptyEditorValue = RichTextEditor.createEmptyValue();
        this.state = {
            notesModal: {
                type: '',
                isVisible: false,
                editNote: {
                    id: '',
                    title: '',
                    body: this.emptyEditorValue,
                    category_id: ''
                }
            }
        };

        this.showAddEditNoteModal = this.showAddEditNoteModal.bind(this);
        this.hideAddEditNoteModal = this.hideAddEditNoteModal.bind(this);
    }

    showAddEditNoteModal(type, id = '', title = '', body = this.emptyEditorValue, category_id = '') {
        this.setState({
            ...this.state,
            notesModal: {
                type,
                isVisible: true,
                editNote: {
                    id,
                    title,
                    body,
                    category_id
                }
            }
        })
    }

    hideAddEditNoteModal() {
        this.setState({
            ...this.state,
            notesModal: {
                type: '',
                isVisible: false,
                editNote: {
                    id: '',
                    title: '',
                    body: this.emptyEditorValue,
                    category_id: ''
                }
            }
        })
    }

    render() {
        const dispatch = this.props.dispatch;
        const notesActions = TodoActions.notesActions;
        const appSettingsActions = TodoActions.appSettingsActions;
        const noteSettings = this.props.appSettings.noteSettings;
        const notesClassList = noteSettings && noteSettings.viewMode === 'GRID' ?
            'Notes Notes--gridMode' : 'Notes';

        const renderNotes = () => {
            return noteSettings ?
                this.props.notes.map(item => {
                    return (
                        <div className="Notes__noteItem"
                             key={item.id}>
                            <NoteItem title={item.title}
                                      body={item.body}
                                      id={item.id}
                                      viewMode={noteSettings.viewMode}
                                      deleteNote={dispatch(notesActions.deleteNoteRequest)}/>
                        </div>
                    )
                }) :
                [];
        };

        const renderViewToggler = () => {
            return (
                noteSettings ?
                    <div className="Notes__viewToggler">
                        <ItemsViewToggler viewMode={noteSettings.viewMode}
                                          setGridView={dispatch(appSettingsActions.notesGridViewRequest)}
                                          setListView={dispatch(appSettingsActions.notesListViewRequest)}/>
                    </div> :
                    null
            )
        };

        const renderAddEditNoteModal = () => {
            return this.state.notesModal.isVisible ?
                <AddEditNote type={this.state.notesModal.type}
                             closeModal={this.hideAddEditNoteModal}
                             categories={this.props.categories}
                             {...this.state.notesModal.editNote}/> :
                null;
        };

        return (
            <div className={notesClassList}>
                {renderAddEditNoteModal()}
                <PageHeader text="Notes"/>
                <div className="Notes__content">
                    {renderViewToggler()}
                    <div className="Notes__head">
                        <ItemsControlPanel>
                            <Filters>
                                <SearchBox onSearchChange={() => null}/>
                            </Filters>
                            <Controls>
                                <Button text="New Note"
                                        type="main"
                                        onClick={() => this.showAddEditNoteModal('ADD')}/>
                            </Controls>
                        </ItemsControlPanel>
                    </div>
                    <div className="Notes__body">
                        {renderNotes().length > 0 ?
                            renderNotes() :
                            <h2 className="Notes__empty">There are no notes yet!</h2>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    notes: state.notes,
    categories: state.categories,
    appSettings: state.appSettings
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);