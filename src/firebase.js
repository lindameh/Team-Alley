import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAnivbRInwjLMGThsUEX_Xqh2X4g1pXb90",
    authDomain: "final-project-609a0.firebaseapp.com",
    databaseURL: "https://final-project-609a0.firebaseio.com",
    projectId: "final-project-609a0",
    storageBucket: "final-project-609a0.appspot.com",
    messagingSenderId: "381682991098",
    appId: "1:381682991098:web:bee494d3d872cd5e5a2e43",
    measurementId: "G-XN27NVRKTQ"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.firestore();
  window.database = database;

  export default auth;
  export { database };