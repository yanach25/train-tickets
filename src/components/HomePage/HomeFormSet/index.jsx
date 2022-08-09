import React from 'react';
import './HomeFormSet.css';
import SearchForm from "../../SearchForm";

export default function HomeFormSet() {
   return (
      <section className="home-form">
         <div className="content-wrapper home-form__wrapper">
            <div className="home-form__title">
               <h1 className="title">
                  <span className="subtitle">
                     Вся жизнь -
                     <br />
                  </span>
                  путешествие!
               </h1>
            </div>
            <SearchForm formView="homeForm" />
         </div>
      </section>
   );
}
