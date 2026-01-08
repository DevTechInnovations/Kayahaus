import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
}: StarRatingProps) => {
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          disabled={!interactive}
          className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        >
          <Star
            className={`${sizeClasses[size]} ${
              index < rating
                ? "fill-primary text-primary"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
};
