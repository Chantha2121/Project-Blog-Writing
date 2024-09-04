import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Image/logo.png';
import './Navbar.scss';
import { AuthContext } from '../context/authContext';

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="text">Chantha Coding</div>
        </div>
        <div className={`links ${isMenuOpen ? 'active' : ''}`}>
          <Link className='link' to="/?cat=art">ART</Link>
          <Link className='link' to="/?cat=science">SCIENCE</Link>
          <Link className='link' to="/?cat=technology">TECHNOLOGY</Link>
          <Link className='link' to="/?cat=cinema">CINEMA</Link>
          <Link className='link' to="/?cat=design">DESIGN</Link>
          <Link className='link' to="/?cat=food">FOOD</Link>
          {currentUser ? (
            <>
              <span>{currentUser.username}</span>
              <span onClick={logout}>Logout</span>
              <Link className='link' to="/write"><button>Write</button></Link>
            </>
          ) : (
            <div className="auth-buttons">
              <Link className='link' to="/login"><button>Login</button></Link>
              <Link className='link' to="/register"><button>Signup</button></Link>
            </div>
          )}
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
    </div>
  );
}

export default Navbar;
