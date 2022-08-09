import React from 'react';
import './HowItWorks.css';
import imgFirst from '../../../assets/img/how-it-works/1.svg';
import imgSecond from '../../../assets/img/how-it-works/2.svg';
import imgThird from '../../../assets/img/how-it-works/3.svg';

export default function HowItWorks() {
   return (
      <section className="how-it-works" id="faq">
         <div className="content-wrapper">
            <div className="how-it-works__title">
               <h2 className="title">Как это работает</h2>
               <button className="button" type="button">
                  Узнать больше
               </button>
            </div>

            <div className="how-it-works__info">
               <div className="how-it-works__info-card">
                  <img src={imgFirst} alt="удобный заказ на сайте" />
                  <p className="how-it-works__info-card-text">
                     Удобный заказ
                     <br />
                     на сайте
                  </p>
               </div>

               <div className="how-it-works__info-card">
                  <img src={imgSecond} alt="Нет необходимости ехать в офис" />
                  <p className="how-it-works__info-card-text">
                     Нет необходимости
                     <br />
                     ехать в офис
                  </p>
               </div>

               <div className="how-it-works__info-card">
                  <img src={imgThird} alt="Огромный выбор направлений" />
                  <p className="how-it-works__info-card-text">
                     Огромный выбор
                     <br />
                     направлений
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}
