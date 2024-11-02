import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from './firebase';
import { Navbar } from './components/Navbar';
import  Home  from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Products from './components/Products';
import { SignUp } from './components/SignUp';
import MyProducts from './components/MyProducts';

function App() {
  const [user, setUser] = useState(null);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logOut = () => {
    signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <Router>
      <Navbar user={user} signIn={signIn} logOut={logOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Products user={user} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myProducts" element={<MyProducts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
