// src/components/ConsigneForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ConsigneForm = ({ user }) => {
  const [consigne, setConsigne] = useState('');

  const handleChange = (e) => {
    setConsigne(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (consigne.trim()) {
      try {
        await addDoc(collection(db, 'consignes'), {
          text: consigne,
          date: serverTimestamp(), // Firestore Timestamp (correct format)
          createdBy: user.email, // Store user's email for tracking
          userId: user.uid, // Store user ID in case you need it later
        });
        setConsigne(''); // Clear input field after submission
      } catch (err) {
        console.error('Error adding consigne: ', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={consigne}
        onChange={handleChange}
        placeholder="Entrez une consigne"
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default ConsigneForm;
