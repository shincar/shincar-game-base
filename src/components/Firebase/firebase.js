import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBq7JhfCYlAEKY97nkfda3pIOYXStNaLYc",
    authDomain: "shincar-game-base.firebaseapp.com",
    databaseURL: "https://shincar-game-base.firebaseio.com",
    projectId: "shincar-game-base",
    storageBucket: "shincar-game-base.appspot.com",
    messagingSenderId: "421163299274"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    };

    doSignInWithEmailAndPassword = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    };

    doSignOut = () => {
        this.auth.signOut();
    };

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPassowrdUpdate = password => this.auth.currentUser.updatePassword(password);
}
  
export default Firebase;
