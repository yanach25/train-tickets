import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './Navigation.css';

export default function Navigation() {
   return (
      <div className="menu">
         <nav className="content-wrapper navbar">
            <ul className="navbar-list">
               <li className="nav-list__item">
                  <HashLink
                     to="/#about"
                     smooth
                     duration={1000}
                     className="nav-link"
                  >
                     О нас
                  </HashLink>
               </li>

               <li className="nav-list__item">
                  <HashLink
                     to="/#faq"
                     smooth
                     duration={1000}
                     className="nav-link"
                  >
                     Как это работает
                  </HashLink>
               </li>

               <li className="nav-list__item">
                  <HashLink
                     to="/#reviews"
                     smooth
                     duration={1000}
                     className="nav-link"
                  >
                     Отзывы
                  </HashLink>
               </li>

               <li className="nav-list__item">
                  <HashLink
                     to="/#contacts"
                     smooth
                     duration={1000}
                     className="nav-link"
                  >
                     Контакты
                  </HashLink>
               </li>
            </ul>
         </nav>
      </div>
   );
}
