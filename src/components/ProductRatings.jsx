import { StarIcon } from "@heroicons/react/24/outline";

export const ProductRatings = (props) => {
  const starNumber = props.avgRating;
  const ratingNumber = props.ratings;
  return (
    <div className="flex">
      {Array.from({ length: starNumber }, (_, i) => (
        <StarIcon key={i} className="h-5 stroke-[#f1b61f] fill-[#f1b61f] " />
      ))}
      {Array.from({ length: 5 - starNumber }, (_, i) => (
        <StarIcon key={i} className="h-5 stroke-[#f1b61f] " />
      ))}
      <span className="ml-3 text-blue-500">{ratingNumber} ratings</span>
    </div>
  );
};
