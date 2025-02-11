// src/components/ConsigneList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ConsigneList = ({ user }) => {
  const [consignes, setConsignes] = useState([]);

  useEffect(() => {
    // Create a query to fetch consignes for the current user
    const consignesRef = collection(db, 'consignes');
    const q = query(consignesRef, where('userId', '==', user.uid));

    // Listen for changes in real-time
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const consignesList = [];
      querySnapshot.forEach((doc) => {
        consignesList.push({ ...doc.data(), id: doc.id });
      });
      setConsignes(consignesList);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <h2>Consignes du Jour</h2>
      <ul>
        {consignes.map((consigne) => (
          <li key={consigne.id}>
            <p>{consigne.consigne}</p>
            <small>{consigne.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsigneList;
