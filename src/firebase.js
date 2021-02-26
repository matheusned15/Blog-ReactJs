import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

 let firebaseConfig = {
        apiKey: "AIzaSyCiTC45vZLxjE6CLMM5HwEsHvWZ2NguJZg",
        authDomain: "react-app-30c21.firebaseapp.com",
        projectId: "react-app-30c21",
        storageBucket: "react-app-30c21.appspot.com",
        messagingSenderId: "203178236503",
        appId: "1:203178236503:web:24ed31085382b29f3c2112",
        measurementId: "G-PZ62R4875J"
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
    }

    login(email,password){
        return app.auth().signInWithEmailAndPassword(email,password)
    }

    async register(nome, email, password){
      await app.auth().createUserWithEmailAndPassword(email,password)

      const uid = app.auth().currentUser.uid;

      return app.database().ref('usuarios').child(uid).set({
          nome: nome
      })


    }
    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        } )
    }

}

export default new Firebase();