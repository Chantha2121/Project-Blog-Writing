import React from 'react';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-left'>
          <p>&copy; 2024 Chantha Coding. All rights reserved.</p>
        </div>
        <div className='footer-right'>
          <a href='/' className='footer-link'>Privacy Policy</a>
          <a href='/' className='footer-link'>Terms of Service</a>
          <a href='/' className='footer-link'>Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
