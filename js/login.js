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
  const forumePage = document.querySelector(".forum")
  const forumButton=document.querySelector(".goToForum")
  const profileButton = document.querySelector(".goToProfile")
  const profilePage = document.querySelector(".profile")
  const postCollection = document.querySelector('.posts')
  const postComment=document.querySelector('.nmd')
  const postArea = document.querySelector('.postBox')
  var postID = ""
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
      })
        postCollection.classList.remove('hide')
    db.collection("posts")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        postData = doc.data()
        var wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')
        wrapper.setAttribute('id',postData.title);
        var content = document.createElement('div')
        content.classList.add('content')
        content.setAttribute('id',postData.id);
        var title = document.createElement('h1')
        title.classList.add('title')
        var introduction = document.createElement('p')
        introduction.classList.add('introduction')
        title.innerHTML = postData.title
        introduction.innerHTML = postData.introduction
        postCollection.appendChild(wrapper)
        wrapper.appendChild(content)
        content.appendChild(title)
        content.appendChild(introduction)
        content.onclick=function(event){
        postID=doc.id
        console.log(postID)
          profilePage.classList.add('hide')
          forumePage.classList.add('hide')
          postPage.classList.add('hide')
          postComment.classList.remove('hide')
          if(postID != ""){
            db.collection("posts").doc(postID).get().then((doc)=>{
                var currentPostData = doc.data()
                var titleOfCurrentPost = document.createElement("h2")
                titleOfCurrentPost.innerHTML=currentPostData.title
                var introductionOfCurrentPost = document.createElement("p")
                introductionOfCurrentPost.innerHTML=currentPostData.introduction
                postArea.appendChild(titleOfCurrentPost)
                postArea.appendChild(introductionOfCurrentPost)
            })
            db.collection("posts").doc(postID).collection("content")
              .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                var postContentData = doc.data()
                var postMassage = document.createElement('div')
                postMassage.classList.add('postMessage')
                var image = document.createElement('div')
                image.classList.add('image')
                var userImg = document.createElement('img')
                userImg.src = postContentData.avatar
                var postUserName = document.createElement('div')
                postUserName.classList.add('userName')
                postUserName.innerHTML = postContentData.userName
                var clear = document.createElement('div')
                clear.style.clear = "both"
                var postContent = document.createElement('div')
                postContent.classList.add('postContent')
                postContent.innerHTML = postContentData.respond
                console.log(postContentData)
                postArea.appendChild(postMassage)
                postMassage.appendChild(image)
                image.appendChild(userImg)
                postMassage.appendChild(postUserName)
                postMassage.appendChild(clear)
                postMassage.appendChild(postContent)
                    });
                  });
                }
        }
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }})



  //This comes the profile part.(firebase firestorge)

  var user = firebase.auth().currentUser;
  //When the profile button are clicked
  profileButton.addEventListener("click",function(){
    if(userInformation != ""){
    profilePage.classList.remove('hide')
    forumePage.classList.add('hide')
    postPage.classList.add('hide')

    } else {
      alert('you are not loggin')
    }
  })





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
        school:userSchool,
        avatar:userInformation.photoURL
    })
    .then(() => {
        console.log("Document successfully written!");

    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  })

var userInformationOnContent = ""
var postsNow = ""
  //This comes the forum part.(firebase firestorge)
  forumButton.addEventListener("click",function(){
    forumePage.classList.remove('hide')
    profilePage.classList.add('hide')
    postPage.classList.add('hide')
});





//here comes the post part (cloud firestore)
  var postPage=document.querySelector('.post')
  var postButton = document.querySelector('.postSomeThing')
  postButton.addEventListener('click',function(){
      profilePage.classList.add('hide')
      forumePage.classList.add('hide')
      postPage.classList.remove('hide')
  })

  var titleOfThePost = document.querySelector(".titleOfPost")
  var introductionOfThePost = document.querySelector(".introductionOfPost")


    const postUpdate = document.querySelector('.postSubmit');

  postUpdate.addEventListener("click",function(){
    db.collection("posts").doc(titleOfThePost.value).set({
      title : titleOfThePost.value,
      introduction:introductionOfThePost.value,
      views:1
    })
    db.collection("posts").doc(titleOfThePost.value).collection("content").set({
    })
    .then(() => {
        console.log("Document successfully written!");
        titleOfThePost.value = ""
        introductionOfThePost.value = ""
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  })


//this part comes the nmd part(cloud firestore)

const commentBox = document.querySelector('.reaspondOfPost')
const submitComment = document.querySelector('.Comment')
var CommentOfthePost = ""
commentBox.addEventListener("keyup",function(event){
  CommentOfthePost = event.target.value
})


submitComment.addEventListener("click",function(){
    db.collection("posts").doc(postID).collection('content').doc().set({
      avatar:userInformation.photoURL,
      respond:CommentOfthePost,
      userID:userInformation.uid,
      userName:profileUserName.value
  })
  .then(() => {
      console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
})