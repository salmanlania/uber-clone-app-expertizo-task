// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc,getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCJawpeVo9EnebhY4DG_Q7AdAkdOTp3TVA",
  authDomain: "uberapp-44e76.firebaseapp.com",
  projectId: "uberapp-44e76",
  storageBucket: "uberapp-44e76.appspot.com",
  messagingSenderId: "1001003820027",
  appId: "1:1001003820027:web:0697f9854d54493431e15e",
  measurementId: "G-WBMZM5N0Z2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addARide({pickup,destination,carType,fare}){
    try{
        await addDoc(collection(db, "rides"), {
         pickup,destination,carType,fare
          });
    }catch(e){
alert(e.messeges)
    }

}

export{
    addARide
}