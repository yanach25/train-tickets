import React from "react";
import PropTypes from "prop-types";
import './Reviewer.css';

export default function Reviewer(props) {
    const {author, content, img} = props;
    return (
        <div className="reviewer">
            <div className="reviews-icon">
                <img
                    className="reviews-icon__image"
                    src={img}
                    alt={author}
                />
            </div>
            <div className="reviews-content">
                <p className="reviews-content__title">{author}</p>
                {/* eslint-disable-next-line react/no-danger */}
                <p className="reviews-content__text" dangerouslySetInnerHTML={{__html: content}} />
            </div>
        </div>
    )
}

Reviewer.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};
