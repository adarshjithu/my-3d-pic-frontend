import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  reviews: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, reviews }) => {
  return (
    <div className="flex items-center space-x-1">
      {/* Stars inside green square boxes */}
      <div className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 border border-green-500 bg-green-500 flex items-center justify-center"
            >
              <FaStar className="text-white text-[10px]" />
            </div>
          ))}
      </div>

      {/* Rating number */}
      <span className="text-black text-sm font-semibold ml-1">{rating.toFixed(1)}</span>

      {/* Reviews */}
      <span className="text-gray-600 text-sm">({reviews.toLocaleString()})</span>
    </div>
  );
};

export default StarRating;
