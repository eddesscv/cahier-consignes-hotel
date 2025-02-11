// src/components/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Logout = ({ setUser }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Réinitialiser l'utilisateur dans l'état global
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default Logout;
