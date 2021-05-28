  // Your web app's Firebase configuration
  0// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const rightTopImg = document.querySelector(".Avatar")
  const logout = document.querySelector("#signOut")
  const formePage = document.querySelector(".forum")
  const profileButton = document.querySelector(".goToProfile") 
  const profilePage = document.querySelector(".profile")
  
  
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
  
var userInformation = "";
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      console.log(firebaseUser)
      Loginbox.classList.add('hide')
      logout.classList.remove('hide')
      rightTopImg.classList.remove('hide')
      rightTopImg.src = firebaseUser.photoURL
      profileUserAvatar.src = firebaseUser.photoURL
      profileUserName.value = firebaseUser.displayName
      profileUserEmail.value = firebaseUser.email
    }else{
      console.log('not logged in');
      Loginbox.classList.remove('hide')
      logout.classList.add('hide')
      rightTopImg.classList.add('hide')
      profilePage.classList.add('hide')
    }
  })
  
  
  
  //This comes the profile part.(firebase firestorge)
  
  var user = firebase.auth().currentUser;
  
  profileButton.addEventListener("click",function(){
    profilePage.classList.remove('hide')
  })
  
  var userName="";
  var userSchool = "";
  
  
  const profileUserAvatar =document.querySelector(".profileAvatar");
      
  const profileUserName = document.querySelector(".profileName");
  profileUserName.addEventListener("keyup",function(event){
    userName= event.target.value
  })
  const profileUserEmail = document.querySelector(".profileEmail");
  const profileUserSchool = document.querySelector(".profileSchool");
  profileUserSchool.addEventListener("keyup",function(event){
    userSchool= event.trager.value
  })
  const profileUpdate = document.getElementById('updateProfile');
  

  

  

  
  

  

