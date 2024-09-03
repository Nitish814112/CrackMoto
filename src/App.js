

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Coding from './Coding';
import Mock from './Mock';
import Navbar from './Navbar';
import Login from './Login';
import { Bot } from './Bot';
import { useFirebase } from './context/Firebase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const unsubscribe = firebase.getAuth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, [firebase]);

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar user={user} />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Mock />} />
              <Route path="/coding" element={<Coding />} />
             
              <Route path="*" element={<Navigate to="/" />} /> 
            </Routes>
          </div>
          <Bot />
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
