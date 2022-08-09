import React from 'react';
import PropTypes from 'prop-types';

export default function PriceFormatter({ title, value }) {
    const formatValue = () => {
        const firstDigits = Math.floor(value / 1000);
        const lastDigits = value - firstDigits * 1000;
        return `${firstDigits > 0 ? `${firstDigits} ` : ''}${
            (lastDigits < 10 && `00${lastDigits}`) ||
            (lastDigits < 100 && `0${lastDigits}`) ||
            lastDigits
        }`;
    };

    return (
        <span className={`${title}-value currency-item`}>
         {formatValue(value)}
      </span>
    );
}

PriceFormatter.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};
