import React from 'react';
import { nanoid } from 'nanoid';
import Options from './ОptionsFilterОption';

import firstClass from '../../../../../assets/img/side-bar/first-class.svg';
import secondClass from '../../../../../assets/img/side-bar/second-class.svg';
import thirdClass from '../../../../../assets/img/side-bar/third-class.svg';
import fourthClass from '../../../../../assets/img/side-bar/fourth-class.svg';
import wifi from '../../../../../assets/img/side-bar/wifi.svg';
import express from '../../../../../assets/img/side-bar/express.svg';

import './OptionsFilter.css'

function OptionsFilter() {
   return (
      <div className="options-filter">
         <ul className="options-filter__list">
            <Options
               key={nanoid()}
               name="have_second_class"
               alt="Купе"
               src={secondClass}
            />
            <Options
               key={nanoid()}
               name="have_third_class"
               alt="Плацкарт"
               src={thirdClass}
            />
            <Options
               key={nanoid()}
               name="have_fourth_class"
               alt="Сидячий"
               src={fourthClass}
            />
            <Options
               key={nanoid()}
               name="have_first_class"
               alt="Люкс"
               src={firstClass}
            />
            <Options key={nanoid()} name="have_wifi" alt="Wi-Fi" src={wifi} />
            <Options
               key={nanoid()}
               name="have_express"
               alt="Экспресс"
               src={express}
            />
         </ul>
      </div>
   );
}

export default OptionsFilter;
