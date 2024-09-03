
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from './context/Firebase';

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const navigate = useNavigate();
  const firebase = useFirebase();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.getAuth().signOut();
      navigate('/login'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-black p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">CrackMoto</Link>

        <button
          id="menu-toggle"
          className="block md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          ref={toggleButtonRef}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

       
        <ul id="menu-desktop" className="hidden md:flex space-x-8">
          <li><Link to="/" className="text-white font-bold hover:underline">Mock_Questions</Link></li>
          <li><Link to="/coding" className="text-white font-bold hover:underline">Coding_Questions</Link></li>
          <li><span className="text-white font-bold cursor-not-allowed pointer-events-none">Projects</span></li>
          <li><span className="text-white font-bold cursor-not-allowed pointer-events-none">Contacts</span></li>
          {user ? (
            <>
              <li className="text-white font-bold">Hello, {user.displayName || user.email}</li>
              <li><button onClick={handleLogout} className="text-white font-bold hover:underline">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="text-white font-bold hover:underline">Login</Link></li>
          )}
        </ul>

        <ul
          id="menu-mobile"
          className={`mobile-menu absolute top-16 left-0 w-full bg-white flex flex-col space-y-4 p-4 ${isMenuOpen ? 'block' : 'hidden'}`}
          ref={menuRef}
        >
          <li><Link to="/" className="text-black-300 font-bold hover:underline">Mock_Questions</Link></li>
          <li><Link to="/coding" className="text-black-300 font-bold hover:underline">Coding_Questions</Link></li>
          <li><span className="text-black-300 font-bold cursor-not-allowed pointer-events-none">Projects</span></li>
          <li><span className="text-black-300 font-bold cursor-not-allowed pointer-events-none">Contact</span></li>
          {user ? (
            <>
              <li className="text-black-300 font-bold">Hello, {user.displayName || user.email}</li>
              <li><button onClick={handleLogout} className="text-black-300 font-bold hover:underline">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="text-black-300 font-bold hover:underline">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
