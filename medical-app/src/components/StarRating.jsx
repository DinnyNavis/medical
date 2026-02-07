import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({
    rating = 0,
    maxStars = 5,
    size = 20,
    onRatingChange = null,
    readonly = false
}) => {
    const [hoverRating, setHoverRating] = useState(0);
    const isInteractive = !readonly && onRatingChange;

    const handleClick = (selectedRating) => {
        if (isInteractive) {
            onRatingChange(selectedRating);
        }
    };

    const handleMouseEnter = (star) => {
        if (isInteractive) {
            setHoverRating(star);
        }
    };

    const handleMouseLeave = () => {
        if (isInteractive) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className={`star-rating ${isInteractive ? 'interactive' : ''}`}>
            {[...Array(maxStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={index}
                        type="button"
                        className={`star ${starValue <= displayRating ? 'filled' : ''}`}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        disabled={!isInteractive}
                        aria-label={`${starValue} star${starValue > 1 ? 's' : ''}`}
                    >
                        <Star
                            size={size}
                            fill={starValue <= displayRating ? 'currentColor' : 'none'}
                        />
                    </button>
                );
            })}
            {rating > 0 && (
                <span className="rating-value">{rating.toFixed(1)}</span>
            )}
        </div>
    );
};

export default StarRating;
