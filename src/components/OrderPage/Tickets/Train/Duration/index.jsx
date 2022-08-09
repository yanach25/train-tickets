import React from 'react';
import PropTypes from 'prop-types';

export default function Duration({ hours, minutes }) {
   const numWord = (count, words) => {
      if (count > 9 && count < 20) return 'минут';
      const countsDigit = +count.substring(count.length - 1);
      switch (countsDigit) {
         case 1:
            return words[0];
         case 2:
         case 3:
         case 4:
            return words[1];
         default:
            return words[2];
      }
   }

   return (
      <div className="train__info-duration">
         {hours} {numWord(hours, ['час', 'часа', 'часов'])}
         <br />
         {minutes} {numWord(minutes, ['минута', 'минуты', 'минут'])}
      </div>
   );
}

Duration.propTypes = {
   hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
   minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
};
