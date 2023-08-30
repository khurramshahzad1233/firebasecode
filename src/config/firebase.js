import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBpuv1xjoX34d3EUEePxmIYXsFteyJtcB8",
    authDomain: "fir-code-745b3.firebaseapp.com",
    projectId: "fir-code-745b3",
    storageBucket: "fir-code-745b3.appspot.com",
    messagingSenderId: "98485248683",
    appId: "1:98485248683:web:7213c90c6d50ac4f050dee",
    measurementId: "G-SCN70MLVR0"
  };

  const firebaseapp=initializeApp(firebaseConfig);
  export const auth=getAuth(firebaseapp);
  export const db=getFirestore(firebaseapp);
  export const storage=getStorage(firebaseapp);
