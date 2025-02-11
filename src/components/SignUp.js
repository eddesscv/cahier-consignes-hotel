// src/components/SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Créer un nouvel utilisateur
      await createUserWithEmailAndPassword(auth, email, password);
      // Réinitialiser les champs de saisie
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Erreur lors de l\'inscription: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />
      {error && <p>{error}</p>}
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignUp;
