import React, { useState } from 'react';
import './Reviews.css';
import { nanoid } from 'nanoid';
import Reviewer from "./Reviewer";
import mockedReviewers from "./mocked-reviewers";

export default function Reviews() {
   const [slider, setSlider] = useState(0);

   const reviewers = mockedReviewers.map((item) => (
       <Reviewer author={item.author} content={item.content} img={item.img} key={item.author}/>
   ));
   const mockedPageCounter = 5;

   const changeSlider = (index) => {
      setSlider(index);
   }

   const sliders = Array(mockedPageCounter).fill(null).map((_, index) => (
       <div className={`reviews-slider__button ${index === slider ? 'reviews-slider__button-active': ''}`}
            key={nanoid()}
            onClick={() => changeSlider(index)}
       />
   ))

   return (
      <section className="reviews" id="reviews">
         <div className="content-wrapper">
            <h2 className="reviews-title">отзывы</h2>

            <div className="reviews-cards">
               {reviewers}
            </div>
            <div className="reviews-slider">
               {sliders}
            </div>
         </div>
      </section>
   );
}
