import app from 'firebase/app';
import 'firebase/auth';
const dotenv = require('dotenv');
dotenv.config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    async doCreateUserWithEmailAndPassword(email, password) {
      await this.auth.createUserWithEmailAndPassword(email, password);
    }
    
    async doSignInWithEmailAndPassword(email, password) {
      await this.auth.signInWithEmailAndPassword(email, password);
    }
    
    doSignOut = () => {
      this.auth.signOut();
    }

    async doPasswordReset(email) {
      await this.auth.sendPasswordResetEmail(email);
    }

    async doPasswordUpdate(password) { 
      this.auth.currentUser.updatePassword(password);
    }
}
  
export default Firebase;
