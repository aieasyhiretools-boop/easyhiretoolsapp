import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <img src="/Easy_Hire_Tools_logo.png" alt="EasyHire Tools" className="footer-logo" />
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/jobs">Jobs</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About</h4>
          <p>EasyHire Tools connects employers with talented candidates and streamlines resume management.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@easyhiretools.com</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} EasyHire Tools. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
