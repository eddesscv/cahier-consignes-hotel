// src/App.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import ConsigneForm from './components/ConsigneForm';
import ConsigneList from './components/ConsigneList';
import Logout from './components/Logout';

// import './style.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  return (
    <div>
      <h1>Bienvenue, {user.email}</h1>
      <Logout setUser={setUser} /> {/* Add the logout button here */}
      <ConsigneForm user={user} />
      <ConsigneList user={user} />
    </div>
  );
};

export default App;
