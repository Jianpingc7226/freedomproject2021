  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBQ4XdWMUmXg-cELPpiSmAmSszdc3aIPUs",
    authDomain: "tryout-9b2b7.firebaseapp.com",
    databaseURL: "https://tryout-9b2b7-default-rtdb.firebaseio.com",
    projectId: "tryout-9b2b7",
    storageBucket: "tryout-9b2b7.appspot.com",
    messagingSenderId: "656034862383",
    appId: "1:656034862383:web:9d4f5e5edadec630ebbdda",
    measurementId: "G-D23HVCG6FM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var bigOne = document.getElementById('bigOne');
  var dbRef = firebase.database().ref().child('text');
  dbRef.on('value', snap => bigOne.innerText = snap.val());

  document.addEventListener("DOMContentLoaded", event => {
      const app = firebase.app();
  })
  
  const auth = firebase.auth();

  const Login = document.querySelector("#googleLogin")
  const Loginbox = document.querySelector(".logInBox")
  const img = document.querySelector(".Avatar")
  const logout = document.querySelector("#signOut")
  
  Login.addEventListener('click',function(){
      const provider = new firebase.auth.GoogleAuthProvider();
      
      firebase.auth().signInWithPopup(provider)
      .then(result =>{
        const user = result.user;
        console.log(`Hellow ${user.photoURL}`)
      })
      .catch(console.log)
  })
  
  logout.addEventListener('click',e=>{
    firebase.auth().signOut();
  })

  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      console.log(firebaseUser);
      Loginbox.classList.add('hide')
      logout.classList.remove('hide')
      img.classList.remove('hide')
      img.src = firebaseUser.photoURL
    }else{
      console.log('not logged in');
      Loginbox.classList.remove('hide')
      logout.classList.add('hide')
      img.classList.add('hide')
    }
  })

  

