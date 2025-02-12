// src/components/ConsigneList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';

const ConsigneList = ({ user }) => {
  const [consignes, setConsignes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'consignes'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedConsignes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.seconds ? new Date(doc.data().date.seconds * 1000).toLocaleString() : "Date inconnue",
        statusHistory: doc.data().statusHistory || [], // Load status history
        commentHistory: doc.data().commentHistory || [], // Load comment history
      }));
      setConsignes(fetchedConsignes);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus, oldStatus) => {
    const timestamp = new Date().toLocaleString();
    const updateMessage = `Status changé de ${oldStatus} à ${newStatus} par ${user.email} le ${timestamp}`;

    const consigneRef = doc(db, 'consignes', id);
    await updateDoc(consigneRef, {
      status: newStatus,
      statusHistory: arrayUnion(updateMessage), // Append new status update
    });
  };

  const handleCommentChange = async (id, newComment) => {
    if (!newComment.trim()) return; // Prevent empty comments

    const timestamp = new Date().toLocaleString();
    const updateMessage = `Commentaire ajouté par ${user.email} le ${timestamp}: ${newComment}`;

    const consigneRef = doc(db, 'consignes', id);
    await updateDoc(consigneRef, {
      commentHistory: arrayUnion(updateMessage), // Append new comment
    });
  };

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
            Date: {consigne.date}
            <br />

            {/* Status Dropdown */}
            <label>Status: </label>
            <select
              value={consigne.status || "To Do"}
              onChange={(e) => handleStatusChange(consigne.id, e.target.value, consigne.status || "To Do")}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            {/* Status Change History */}
            {consigne.statusHistory.length > 0 && (
              <ul>
                {consigne.statusHistory.map((entry, index) => (
                  <li key={index}><small>{entry}</small></li>
                ))}
              </ul>
            )}

            {/* Comment Input */}
            <br />
            <label>Commentaire: </label>
            <input
              type="text"
              placeholder="Ajouter un commentaire"
              onBlur={(e) => {
                if (e.target.value.trim()) {
                  handleCommentChange(consigne.id, e.target.value);
                  e.target.value = ''; // Clear input after submission
                }
              }}
            />

            {/* Comment History */}
            {consigne.commentHistory.length > 0 && (
              <ul>
                {consigne.commentHistory.map((entry, index) => (
                  <li key={index}><small>{entry}</small></li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsigneList;
