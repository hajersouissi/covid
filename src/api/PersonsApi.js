import firebase from 'react-native-firebase';
import uuid4 from 'uuid/v4';

export function login({email, password}) {
  firebase
    .auth ()
    .signInWithEmailAndPassword (email, password)
    .then (value => console.log (value));
}
export const db = firebase.firestore ();

export function signup (
  {email, password, displayName, foreignVisit},
  addComplete
) {
  firebase
    .auth ()
    .createUserWithEmailAndPassword (email, password)
    .then (userInfo => {
      console.log (userInfo);
      return db
        .collection ('users')
        .doc (userInfo.user.uid)
        .set ({
          displayName: displayName.trim (),
          foreignVisit: foreignVisit.trim (),
        })
        .then (() =>
          addComplete ({
            email,
            password,
            displayName,
            foreignVisit,
          })
        );
    });
}

export function subscribeToAuthChanges (authStateChanged) {
  firebase.auth ().onAuthStateChanged (user => {
    authStateChanged (user);
  });
}

export function signout (onSignedOut) {
  firebase.auth ().signOut ().then (() => {
    onSignedOut ();
  });
}

export function updatePerson (person, updateComplete) {
  person.updatedAt = firebase.firestore.FieldValue.serverTimestamp ();
  console.log ('Updating persons in firebase');

  firebase
    .firestore ()
    .collection ('Persons')
    .doc (person.id)
    .set (person)
    .then (() => updateComplete (person))
    .catch (error => console.log (error));
}

export function deletePerson (person, deleteComplete) {
  console.log (person);

  firebase
    .firestore ()
    .collection ('Persons')
    .doc (person.id)
    .delete ()
    .then (() => deleteComplete ())
    .catch (error => console.log (error));
}

export async function getPersons (personsRetreived) {
  var personList = [];
  try {
    console.log ('About to get');

    var snapshot = await firebase
      .firestore ()
      .collection ('Persons')
      .orderBy ('createdAt')
      .get ();
  } catch (error) {
    console.log ('error');
  }
  console.log ('push');

  snapshot.forEach (doc => {
    const personItem = doc.data ();
    personItem.id = doc.id;
    console.log ('person', personItem);

    if (personItem.userid == firebase.auth ().currentUser.uid) {
      personList.push (personItem);
    }
  });
  console.log ('listp', personList);

  personsRetreived (personList);

  console.log ('done');
}

export function uploadPerson (person, onPersonUploaded, {updating}) {
  if (person.imageUri) {
    const fileExtension = person.imageUri.split ('.').pop ();
    console.log ('EXT: ' + fileExtension);

    var uuid = uuid4 ();

    const fileName = `${uuid}.${fileExtension}`;
    console.log (fileName);

    var storageRef = firebase.storage ().ref (`persons/images/${fileName}`);

    storageRef.putFile (person.imageUri).on (
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        console.log ('snapshot: ' + snapshot.state);
        console.log (
          'progress: ' + snapshot.bytesTransferred / snapshot.totalBytes * 100
        );

        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
          console.log ('Success');
        }
      },
      error => {
        unsubscribe ();
        console.log ('image upload error: ' + error.toString ());
      },
      () => {
        storageRef.getDownloadURL ().then (downloadUrl => {
          console.log ('File available at: ' + downloadUrl);

          person.image = downloadUrl;

          delete person.imageUri;

          if (updating) {
            console.log ('Updating....');
            updatePerson (person, onPersonUploaded);
          } else {
            console.log ('adding...');
            addPerson (person, onPersonUploaded);
          }
        });
      }
    );
  } else {
    console.log ('Skipping image upload');

    delete person.imageUri;

    if (updating) {
      console.log ('Updating....');
      updatePerson (person, onPersonUploaded);
    } else {
      console.log ('adding...');
      addPerson (person, onPersonUploaded);
    }
  }
}

export function addPerson (person, addComplete) {
  person.createdAt = firebase.firestore.FieldValue.serverTimestamp ();
  person.userid = firebase.auth ().currentUser.uid;
  firebase
    .firestore ()
    .collection ('Persons')
    .add (person)
    .then (snapshot => {
      person.id = snapshot.id;
      snapshot.set (person);
    })
    .then (() => addComplete (person))
    .catch (error => console.log (error));
}
export function addVisit (visit, addComplete) {
  visit.createdAt = firebase.firestore.FieldValue.serverTimestamp ();
  visit.userid = firebase.auth ().currentUser.uid;
  console.log ('current user', firebase.auth ().currentUser);

  firebase
    .firestore ()
    .collection ('Visits')
    .add (visit)
    .then (() => addComplete (visit))
    .catch (error => console.log (error));
}
/*export function addVisitCount (visitedCountryName) {
 
var userid = firebase.auth ().currentUser.uid;
  console.log ('current user', firebase.auth ().currentUser);

  firebase
    .firestore ()
    .collection ('Visits')
    .doc(userid)
    .add( {visitedCountryName:visitedCountryName })
    .then (() => addComplete (visitedCountryName))
    .catch (error => console.log (error));
}*/

export function addSymptom (symptom, addComplete) {
  symptom.createdAt = firebase.firestore.FieldValue.serverTimestamp ();
  symptom.userid = firebase.auth ().currentUser.uid;

  firebase
    .firestore ()
    .collection ('users')
    .doc (symptom.userid)
    .collection ('symptoms')
    .add (symptom)
    .then (snapshot => {
      symptom.id = snapshot.id;
      snapshot.set (symptom);
      addComplete (symptom);
    })
    .catch (error => console.log (error));
}

export async function getDashboardInfo (nameRetrieved, symptomRetrieved) {
  var userid = firebase.auth ().currentUser.uid;
  var test = false;
  var name = (await firebase
    .firestore ()
    .collection ('users')
    .doc (userid)
    .get ()).data ().displayName;
  console.log ('hell', name);
  nameRetrieved (name);

  firebase
    .firestore ()
    .collection ('users')
    .doc (userid)
    .collection ('symptoms')
    .orderBy ('createdAt', 'DESC')
    .limit (1)
    .get ()
    .then (querySnapshot => {
      querySnapshot.forEach (doc => {
        const symptomItem = doc.data ();
        symptomItem.id = doc.id;
        console.log ('now', firebase.firestore.Timestamp.now ().toMillis ());
        console.log ('hi', symptomItem.createdAt.toMillis ());
        if (
          firebase.firestore.Timestamp.now ().toMillis () -
            symptomItem.createdAt.toMillis () >
          86400000
        ) {
          test = true;
        }
      });
    });
  symptomRetrieved (test);
}
export async function getSymptoms (symptomsRetrieved) {
  var userid = firebase.auth ().currentUser.uid;

  var symptomList = [];
  try {
    console.log ('About to get');

    var querySnapshot = await firebase
      .firestore ()
      .collection ('users')
      .doc (userid)
      .collection ('symptoms')
      .orderBy ('createdAt')
      .get ();
  } catch (error) {
    console.log ('error');
  }
  console.log ('push');

  querySnapshot.forEach (doc => {
    const symptomItem = doc.data ();

    console.log ('push', symptomItem);

    symptomList.push (symptomItem);
  });

  symptomsRetrieved (symptomList);

  console.log ('done');
}

export function updateSymptom (symptom, updateComplete) {
  symptom.updatedAt = firebase.firestore.FieldValue.serverTimestamp ();
  console.log ('Updating persons in firebase');
  userid = firebase.auth ().currentUser.uid;

  firebase
    .firestore ()
    .collection ('users')
    .doc (userid)
    .collection ('symptoms')
    .doc (symptom.id)
    .set (symptom)
    .then (() => updateComplete (symptom))
    .catch (error => console.log (error));
}

export function deleteSymptom (symptom, deleteComplete) {
  console.log (symptom);
  userid = firebase.auth ().currentUser.uid;

  firebase
    .firestore ()
    .collection ('users')
    .doc (userid)
    .collection ('symptoms')
    .doc (symptom.id)
    .delete ()
    .then (() => deleteComplete ())
    .catch (error => console.log (error));
}
