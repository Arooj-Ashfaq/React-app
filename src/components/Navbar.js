import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';


export const Navbar = ({ user }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    navigate('/signup');
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out: ', error);
    }

  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-brand" onClick={()=>{navigate('/')}}>
        Productology
      </div>
      
      <button className="menu-button" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
        <Link to="/products" onClick={() => setIsMenuOpen(false)}>Add new Products</Link>
        <Link to="/myProducts" onClick={() => setIsMenuOpen(false)}>My Products</Link>

        
        {user ? (
          <div className="profile">
            <img src={user.photoURL} alt="Profile" className="profile-img" />
            <span>{user.displayName}</span>
            <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
          </div>
        ) : (
          <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
        )}
      </div>
      
    </nav>
    <br/><br/>
    </>
  );
};


