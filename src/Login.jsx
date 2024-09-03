import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useFirebase } from './context/Firebase';
import Avatar from '@mui/material/Avatar';
import { deepPurple, purple, red } from '@mui/material/colors';
import image from './autumn-background_23-2149054409.jpg'; // Import your background image
import image2 from './Cute-Anime-Girl-PNG-Photo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleSignUp = () => {
    setLoading(true);
    setError('');
    firebase.signupUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Sign-up successful');
        setEmail('');
        setPassword('');
        navigate('/mock'); 
      })
      .catch(err => {
        console.error('Sign-up error:', err);
        setError('Sign-up failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleSignIn = () => {
    setLoading(true);
    setError('');
    firebase.signinWithEmailAndPassword(email, password)
      .then(() => {
        alert('Sign-in successful');
        setEmail('');
        setPassword('');
        navigate('/mock'); 
      })
      .catch(err => {
        console.error('Sign-in error:', err);
        setError('Sign-in failed. Please check your credentials and try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setError('');
    firebase.signupWithGoogle()
      .then(() => {
        alert('Google sign-in successful');
        navigate('/mock'); 
      })
      .catch(err => {
        console.error('Google sign-in error:', err);
        setError('Google sign-in failed. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center flex items-center"
    style={{ backgroundImage: `url(${image})`, backgroundPosition: "center" }}
  >
    <div className="container mx-auto flex justify-end">
      <div className="bg-white mx-auto flex flex-col p-8 rounded-lg shadow-lg max-w-sm w-full">
        {/* Center and enlarge Avatar image */}
        <Avatar
          alt="Remy Sharp"
          src={image2}
          className="mx-auto border shadow-lg mb-4"
          sx={{ 
            width: 128, 
            height: 128,
            '& img': {
              objectFit: 'cover', // Ensures the image covers the Avatar
              objectPosition: 'top' // Aligns the image starting from the top
            }
          }}
        />
        
        {/* Display error message if there's any */}
        {error && <p className="text-red-500">{error}</p>}
  
        {/* Sign-up Form */}
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input 
            type="email" 
            name="Email" 
            placeholder="Enter email..." 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter password..." 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className="w-full px-3 py-2 border rounded"
          />
        </div>
  
        {/* Buttons */}
        <button onClick={handleSignUp} className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-2" disabled={loading}>
          Sign-up
        </button>
        <button onClick={handleSignIn} className="bg-green-500 text-white py-2 px-4 rounded w-full mb-2" disabled={loading}>
          Sign-in
        </button>
        <button onClick={handleGoogleSignIn} className="bg-red-500 flex items-center justify-center gap-2 text-white py-2 px-4 rounded w-full mb-2" disabled={loading}>
          <Avatar className='shadow-lg' sx={{ bgcolor: 'white', color: 'red' }}>G</Avatar>
          Sign-in with Google
        </button>
      </div>
    </div>
  </div>
  
);

  
};

export default Login;





{/* <div style={{ textAlign: 'center', marginTop: '50px' }}> 
    <div> 
  
    <label htmlFor="Email">Email: </label> 
    <input type="email" name="Email" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)} value={email} />
     <br />
      <label htmlFor="password">Password: </label>
       <input type="password" name="password" placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)} value={password} />
        <br /> 
        <button onClick={handleSignUp}>Sign-up</button>
         <br /> <button onClick={handleSignIn}>Sign-in</button>
          <br /> <button onClick={handleGoogleSignIn}>Sign-in with Google</button>
           </div> {error && <p className="text-red-500">{error}</p>} </div>  */}