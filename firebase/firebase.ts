import firebase from 'firebase/app'

const prod = {
  apiKey: 'AIzaSyAHCjwP8OWSHE1REWrzfFtQ3-Z5iZw2nlU',
  authDomain: 'trakr-prod-7a3d2.firebaseapp.com',
  databaseURL: 'https://trakr-prod-7a3d2.firebaseio.com',
  projectId: 'trakr-prod-7a3d2',
  storageBucket: 'trakr-prod-7a3d2.appspot.com',
  messagingSenderId: '249083940263',
}

const dev = {
  apiKey: 'AIzaSyA0erNu31Mh03E1y_NdAgmiLpBeN_CNV4k',
  authDomain: 'trakr-c170e.firebaseapp.com',
  databaseURL: 'https://trakr-c170e.firebaseio.com',
  projectId: 'trakr-c170e',
  storageBucket: '',
  messagingSenderId: '128343192795',
}

const config = process.env.NODE_ENV === 'production' ? prod : dev

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export { auth }
