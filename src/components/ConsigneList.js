// src/components/ConsigneList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const ConsigneList = () => {
  const [consignes, setConsignes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'consignes'), orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedConsignes = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          createdBy: data.createdBy || "Utilisateur inconnu",
          /* date: data.date && data.date.seconds
            ? new Date(data.date.seconds * 1000)  // Convert Firestore timestamp
            : null, // Handle missing timestamps */
          date: data.date && typeof data.date.toDate === 'function'
            ? data.date.toDate()  // Use Firestore's built-in toDate() method
            : null, // Handle missing timestamps
        };
      });
      setConsignes(fetchedConsignes);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Consignes du Jour</h2>
      <ul>
        {consignes.map((consigne) => (
          <li key={consigne.id}>
            <strong>{consigne.text}</strong>
            <br />
            <em>Ajouté par: {consigne.createdBy}</em>
            <br />
            {consigne.date
              ? consigne.date.toLocaleString()  // Format date properly
              : "Date inconnue"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsigneList;
