import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const navigate = useNavigate()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in: ', user);
      navigate('/')
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <button onClick={handleGoogleSignIn} className="google-signin-btn">
        Sign Up with Google
      </button>
    </div>
  );
};
