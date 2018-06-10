import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var config = {
  apiKey: "AIzaSyDPhqfnQ30WuiSl1kM1AcitFe6GW-jn4AY",
  authDomain: "cinpadb.firebaseapp.com",
  databaseURL: "https://cinpadb.firebaseio.com",
  projectId: "cinpadb",
  storageBucket: "cinpadb.appspot.com",
  messagingSenderId: "334711240412" 
};

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const DB = firebase.database();
export default firebase
