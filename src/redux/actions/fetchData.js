import firebase from '../../firebase';

import {setCategories} from './categories';
import {setNotes} from './notes';
import {setSettings, setLoadingFinished} from './appSettings';

export function fetchData() {
    return function (dispatch) {
        const userId = firebase.auth().currentUser.uid;

        return firebase.database().ref(`${userId}`).once('value')
            .then((snapshot) => {
                    if (snapshot.val()) {
                        let categories = [],
                            notes = [],
                            appSettings;

                        snapshot.forEach(function (childSnapshot) {
                            if (childSnapshot.key === 'categories') {
                                childSnapshot.forEach(function (categorySnapshot) {
                                    categories.push({
                                        id: categorySnapshot.key,
                                        title: categorySnapshot.val().title
                                    });
                                })
                            } else if (childSnapshot.key === 'notes') {
                                childSnapshot.forEach(function (noteSnapshot) {
                                    notes.push({
                                        id: noteSnapshot.key,
                                        title: noteSnapshot.val().title,
                                        body: noteSnapshot.val().body,
                                        category_id: noteSnapshot.val().category_id
                                    })
                                })
                            } else if (childSnapshot.key === 'appSettings') {
                                appSettings = Object.assign({}, childSnapshot.val());
                            }
                        });

                        dispatch(setCategories(categories));
                        dispatch(setNotes(notes));
                        dispatch(setSettings(appSettings));
                        dispatch(setLoadingFinished());
                    }
                }
            );
    }
}