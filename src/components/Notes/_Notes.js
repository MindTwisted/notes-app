import React, {Component} from 'react';
import {connect} from 'react-redux';

import PageHeader from '../common/_PageHeader';
import {ItemsControlPanel, Filters, Controls} from '../common/_ItemsControlPanel';
import Button from '../common/_Button';
import SearchBox from '../common/_SearchBox';
import NoteItem from './_NoteItem';
import ItemsViewToggler from '../common/_ItemsViewToggler';

import * as TodoActions from '../../redux/actions/index';

class Notes extends Component {

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

        return (
            <div className={notesClassList}>
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
                                        onClick={() => null}/>
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
    appSettings: state.appSettings
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);