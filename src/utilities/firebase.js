// import { useEffect, useState } from 'react';
// import { getDatabase, onValue, ref, update} from 'firebase/database';
// const database = getDatabase(firebase);

import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCBODWMwXXeyMFU0Fj5THSuoyJfUTbs9hM",
    authDomain: "react-e3d6c.firebaseapp.com",
    databaseURL: "https://react-e3d6c-default-rtdb.firebaseio.com",
    projectId: "react-e3d6c",
    storageBucket: "react-e3d6c.appspot.com",
    messagingSenderId: "971397056361",
    appId: "1:971397056361:web:de4966dd72cbab1debdff8",
    measurementId: "G-RBQ00W23CG"
  };

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
  
    useEffect(() => (
      onValue(ref(database, path), (snapshot) => {
       setData( snapshot.val() );
      }, (error) => {
        setError(error);
      })
    ), [ path ]);
  
    return [ data, error ];
};

const makeResult = (error) => {
    const timestamp = Date.now();
    const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
    return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
    const [result, setResult] = useState();
    const updateData = useCallback((value) => {
      update(ref(database, path), value)
      .then(() => setResult(makeResult()))
      .catch((error) => setResult(makeResult(error)))
    }, [database, path]);
  
    return [updateData, result];
};