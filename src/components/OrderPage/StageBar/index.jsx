import React from 'react';
import { useSelector } from 'react-redux';
import './StageBar.css';

export default function StageBar() {
   const { stage } = useSelector((state) => state.stage);
   const stages = ['Билеты', 'Пассажиры', 'Оплата', 'Проверка'];
   const active = stage - 1;

   return (
      <div
         className={`stage-bar ${
            stage === 4 ? 'stage-bar__yellow' : 'stage-bar__gray'
         }`}
      >
         <ul className="stage-bar__list stages-wrapper">
            {stages.map((el, index) => (
               <li
                  className={`stage-bar__list-item ${
                     stage > index ? 'passed' : 'not-passed'
                  } ${active === index ? 'stage-bar__list-item-active' : ''}`}
                  key={el}
               >
                  <span className="stage-bar__list-icon">
                     <span className="stage-bar__list-stage">{index + 1}</span>
                  </span>
                  {el}
               </li>
            ))}
         </ul>
      </div>
   );
}
