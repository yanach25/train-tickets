
import React, { useState } from 'react';
import './Footer.css';
import { HashLink } from 'react-router-hash-link';

import { scrollToTop, } from './footer-icons';
import emailValidator from "../email-validator";
import footerContacts from "./footer-contacts";
import footerLinks from "./footer-links";

export default function Footer() {
   const [emailSubscribe, setEmail] = useState('');
   const onSubscribe = (e) => {
      e.preventDefault();
      if (emailValidator(emailSubscribe)) {
         fetch(`${process.env.REACT_APP_URL}/subscribe`, {
            method: 'POST',
            body: JSON.stringify({email: emailSubscribe}),
         })
            .then((response) => response.json())
            .then((data) => console.log(data)); // TODO: show modal
      }
   };
   const onSetEmail = (event) => {
      const { value } = event.target;
      setEmail(value);
   };

   const contacts = footerContacts.map((item) => (
       <li className="footer-contacts__list-item" key={item.name}>
          {item.icon}
          {/* eslint-disable-next-line react/no-danger */}
          <p className="footer-contacts__list-item-text" dangerouslySetInnerHTML={{__html: item.desc}} />
       </li>
   ))

   const links = footerLinks.map((item) => (
       <a href={item.link} className="footer-subscribe__link" key={item.name}>
          {item.icon}
       </a>
   ))

   return (
      <footer className="footer" id="contacts">
         <div className="footer-content content-wrapper">
            <section className="footer-contacts">
               <h3 className="footer-contacts__title footer-title">
                  Свяжитесь с нами
               </h3>
               <ul className="footer-contacts__list">
                  {contacts}
               </ul>
            </section>
            <section className="footer-subscribe">
               <h3 className="footer-subscribe__title footer-title">
                  Подписка
               </h3>
               <form className="footer-subscribe__form" onSubmit={onSubscribe}>
                  <label
                      className="footer-subscribe__form-label"
                      htmlFor="subscription"
                  >
                     Будьте в курсе событий
                     <div className="footer-subscribe__form-input-wrapper">
                        <input
                            className="footer-subscribe__form-input"
                            type="email"
                            id="subscription"
                            placeholder="e-mail"
                            value={emailSubscribe}
                            onChange={onSetEmail}
                        />
                        <button
                            className="footer-subscribe__form-button"
                            id="button"
                            type="button"
                            onClick={onSubscribe}
                        >
                           Отправить
                        </button>
                     </div>
                  </label>
               </form>
               <h3 className="footer-subscribe__title footer-title second-title ">
                  Подписывайтесь на нас
               </h3>
               <div className="footer-subscribe__icons">
                  {links}
               </div>
            </section>
         </div>
         <div className="footer-logo">
            <div className="content-wrapper footer-logo__wrapper">
               <HashLink
                  to="/#start"
                  smooth
                  duration={1000}
                  className="logo"
               >
                  <p className="logo">Лого</p>
               </HashLink>
               <HashLink to="/#start" smooth duration={1000}>
                  {scrollToTop}
               </HashLink>
               <span className="footer-copyright">2018 WEB</span>
            </div>
         </div>
      </footer>
   );
}
