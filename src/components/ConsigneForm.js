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
      // Add consigne to Firestore with current user ID and date
      const date = new Date().toLocaleString();
      const consigneData = { consigne, date, userId: user.uid };

      try {
        await addDoc(collection(db, 'consignes'), {
          text: consigne,
          date: serverTimestamp(), // Timestamp for sorting
          createdBy: user.email, // Store user's email
        });
        setConsigne(''); // Clear the input field after submission
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
