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

  const database = firebase.database();
  const auth = firebase.auth();
  const db = firebase.firestore();
  const Login = document.querySelector("#googleLogin")
  const Loginbox = document.querySelector(".logInBox")
  const rightTopImg = document.querySelector(".Avatar")
  const logout = document.querySelector("#signOut")
  const formePage = document.querySelector(".forum")
  const profileButton = document.querySelector(".goToProfile") 
  const profilePage = document.querySelector(".profile")
  
  //user value
  var userName = "";
  var userSchool = "";
  
  
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
      userInformation = firebaseUser
      Loginbox.classList.add('hide')
      logout.classList.remove('hide')
      rightTopImg.classList.remove('hide')
      rightTopImg.src = firebaseUser.photoURL
      profileUserAvatar.src = firebaseUser.photoURL
      profileUserEmail.value = firebaseUser.email
      db.collection("User").doc(userInformation.uid).onSnapshot((doc) => {
        var userData = doc.data()
        console.log(userData)
        if (doc.exists) {
            console.log("There is data");
            profileUserName.value = userData.name
            profileUserSchool.value = userData.school
        } else {
            // doc.data() will be undefined in this case
            alert("please update your user information")
        }
      });
      profilePage.classList.remove('hide')
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
  //When the profile button are clicked
  profileButton.addEventListener("click",function(){
    profilePage.classList.remove('hide')
  })

  

  //this line of code should pull user information from firestore cloud, but for some reason this didn't work  PS:remember to ask Mr.Mueller next week

  
  const profileUserAvatar =document.querySelector(".profileAvatar");
  const profileUserName = document.querySelector(".profileName");
  profileUserName.addEventListener("keyup",function(event){
    userName= event.target.value
  })
  const profileUserEmail = document.querySelector(".profileEmail");
  const profileUserSchool = document.querySelector(".profileSchool");
  profileUserSchool.addEventListener("keyup",function(School){
    userSchool= School.target.value
  })
  const profileUpdate = document.getElementById('updateProfile');
  
  profileUpdate.addEventListener("click",function(){
    db.collection("User").doc(userInformation.uid).set({
        name:profileUserName.value,
        email:userInformation.email,
        school:userSchool
    })
    .then(() => {
        console.log("Document successfully written!");
        
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  })
  

  

  

  
  

  

