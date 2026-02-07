import React, { useState } from 'react';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import StarRating from './StarRating';

const ReviewSystem = ({ doctorId, reviews = [], onSubmitReview }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        rating: 0,
        comment: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            alert('Please select a rating');
            return;
        }
        onSubmitReview({ ...formData, doctorId, date: new Date().toISOString() });
        setFormData({ rating: 0, comment: '' });
        setShowForm(false);
    };

    const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return (
        <div className="review-system">
            {/* Summary */}
            <div className="review-summary">
                <div className="rating-overview">
                    <div className="average-rating">
                        <span className="rating-number">{averageRating.toFixed(1)}</span>
                        <StarRating rating={averageRating} readonly size={24} />
                        <span className="review-count">{reviews.length} reviews</span>
                    </div>
                </div>

                <button
                    className="btn-write-review"
                    onClick={() => setShowForm(!showForm)}
                >
                    <MessageSquare size={18} />
                    Write a Review
                </button>
            </div>

            {/* Review Form */}
            {showForm && (
                <form className="review-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Rating</label>
                        <StarRating
                            rating={formData.rating}
                            onRatingChange={(rating) => setFormData({ ...formData, rating })}
                            size={32}
                        />
                    </div>

                    <div className="form-group">
                        <label>Your Review</label>
                        <textarea
                            placeholder="Share your experience with this doctor..."
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            rows={4}
                            className="review-textarea"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            Submit Review
                        </button>
                    </div>
                </form>
            )}

            {/* Reviews List */}
            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <div className="empty-reviews">
                        <MessageSquare size={48} />
                        <p>No reviews yet. Be the first to review!</p>
                    </div>
                ) : (
                    reviews.map((review, idx) => (
                        <div key={idx} className="review-card">
                            <div className="review-header">
                                <div className="reviewer-info">
                                    <div className="reviewer-avatar">
                                        {review.patientName?.charAt(0) || 'P'}
                                    </div>
                                    <div>
                                        <h4>{review.patientName || 'Anonymous Patient'}</h4>
                                        <span className="review-date">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <StarRating rating={review.rating} readonly size={16} />
                            </div>
                            <p className="review-comment">{review.comment}</p>
                            <button className="review-helpful">
                                <ThumbsUp size={14} />
                                Helpful
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSystem;
