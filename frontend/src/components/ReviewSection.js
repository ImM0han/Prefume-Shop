import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/reviews/product/${productId}`);
      setReviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', {
        productId,
        ...formData
      });
      setFormData({
        userName: '',
        rating: 5,
        comment: ''
      });
      setShowForm(false);
      fetchReviews();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center flex-wrap gap-4 pb-6 border-b-2 border-gray-200">
          <h2 className="text-3xl text-gray-800 m-0">Customer Reviews</h2>
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{averageRating}</span>
              <div className="flex gap-0.5">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-gray-600 text-sm">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>

        <button
          className="bg-gradient-to-r from-primary to-primary-dark text-white border-none px-6 py-3 rounded-lg text-base font-bold cursor-pointer transition-all duration-300 w-fit hover:-translate-y-0.5 hover:shadow-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Review'}
        </button>

        {showForm && (
          <form className="bg-gray-50 p-8 rounded-lg flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="userName" className="font-semibold text-gray-800">Your Name</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="p-3 border-2 border-gray-200 rounded-lg text-base font-sans transition-colors duration-300 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-800">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`text-3xl border-none bg-transparent cursor-pointer transition-all duration-200 p-0 ${
                      formData.rating >= rating ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-400 hover:scale-110'
                    }`}
                    onClick={() => setFormData({ ...formData, rating })}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="comment" className="font-semibold text-gray-800">Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Write your review here..."
                className="p-3 border-2 border-gray-200 rounded-lg text-base font-sans transition-colors duration-300 focus:outline-none focus:border-primary resize-none"
              />
            </div>

            <button 
              type="submit" 
              className="bg-gradient-to-r from-primary to-primary-dark text-white border-none px-8 py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-300 self-start hover:-translate-y-0.5 hover:shadow-lg"
            >
              Submit Review
            </button>
          </form>
        )}

        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="text-center py-8 text-lg text-gray-600">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-lg text-gray-600">No reviews yet. Be the first to review!</div>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center font-bold text-xl">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg">{review.userName}</div>
                      <div className="text-gray-600 text-sm">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="text-gray-700 leading-relaxed text-base">{review.comment}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

