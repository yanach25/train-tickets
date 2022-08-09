import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

import './Header.css';

export default function Header() {
   return (
      <header className="header" id="start">
         <div className="header-logo">
            <div className="logo content-wrapper">
               <Link to="/" className="navbar-brand logo">
                  <p className="logo">Лого</p>
               </Link>
            </div>
         </div>
         <Navigation />
      </header>
   );
}
