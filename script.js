
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3aIRWvrB-lOrrfIKSNY_MORTWPcweN5o",
  authDomain: "demofirebase-a0725.firebaseapp.com",
  projectId: "demofirebase-a0725",
  storageBucket: "demofirebase-a0725.appspot.com",
  messagingSenderId: "902020080501",
  appId: "1:902020080501:web:8ffeead08d2e544e26693c"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//function to save file
function uploadFile() {

    // Created a Storage Reference with root dir
    var storageRef = firebase.storage().ref();  //REF ES LA RUTA PRINCIPAL
    console.log("storage ref", storageRef);
    // Get the file from DOM
    var file = document.getElementById("files").files[0]; //Numero de archivos
    console.log(file);

    //dynamically set reference to the file name
    var thisRef = storageRef.child(`images/${file.name}`);

    //put request upload file to firebase storage
    thisRef.put(file).then(function (snapshot) {
        alert("File Uploaded")
        console.log('Uploaded a blob or file!');
    });
}

// Return URL of a certain image
function getFileUrl(filename) {
    //create a storage reference
    var storage = firebase.storage().ref();

    //get file url
    storage.child(filename)
        .getDownloadURL()
        .then(function (url) {
            console.log(url);
        })
        .catch(function (error) {
            console.log("error encountered");
        });
}

// Return all images
function getAllImages(){
      // Since you mentioned your images are in a folder,
    // we'll create a Reference to that folder:
    //var storageRef = firebase.storage().ref("your_folder");
    var storageRef = firebase.storage().ref('/images');  //Cogemos la referencia a la carpeta imagenes

    // Now we get the references of these images
    storageRef.listAll().then(function(result) { 
      result.items.forEach(function(imageRef) {
        console.log(imageRef);
        // And finally display them
        console.log(imageRef);
        displayImage(imageRef);
      });
    }).catch(function(error) {
      // Handle any errors
      console.log(error);
    });

    function displayImage(imageRef) {
      imageRef.getDownloadURL().then(function(url) { //Para cada referencia obtiene la url
        // TODO: Display the image on the UI
        console.log(url);
        const result = document.getElementById("result");
        result.innerHTML+=`<img src=${url} width=450px>`
      }).catch(function(error) {
        // Handle any errors
        console.log(error);
      });
    }
}

getAllImages();