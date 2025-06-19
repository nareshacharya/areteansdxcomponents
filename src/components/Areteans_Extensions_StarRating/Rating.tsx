import React, { ReactNode, useState, useEffect, useRef } from "react";
import "./Rating.css";

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  allowHalf?: boolean;
  showRatingNumber?: boolean;
  starCount?: number;
  fullColor?: string;
  halfColor?: string;
  emptyColor?: string;
  labels?: string[];
  animationScale?: number;
  showClear?: boolean;
  rtl?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  readOnly,
  allowHalf = false,
  showRatingNumber = true,
  starCount = 5,
  fullColor = "gold",
  halfColor = "gold",
  emptyColor = "#ccc",
  labels = [],
  animationScale = 1.2,
  showClear = false,
  rtl = false,
}) => {
  const [rating, setRating] = useState(value);
  const [hovered, setHovered] = useState<number | null>(null);
  const starRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    star: number
  ) => {
    if (readOnly) return;
    let newRating = star;
    if (allowHalf) {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      newRating = x < width / 2 ? star - 0.5 : star;
    }
    setRating(newRating);
    onChange?.(newRating);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    star: number
  ) => {
    if (readOnly) return;
    const currentIndex = star - 1;
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setRating(star);
      onChange?.(star);
    } else if (
      (e.key === "ArrowLeft" && !rtl) ||
      (e.key === "ArrowRight" && rtl) ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
      const step = allowHalf ? 0.5 : 1;
      const newRating = Math.max(step, rating - step);
      setRating(newRating);
      onChange?.(newRating);
      const prevIndex = Math.max(0, currentIndex - 1);
      starRefs.current[prevIndex]?.focus();
    } else if (
      (e.key === "ArrowRight" && !rtl) ||
      (e.key === "ArrowLeft" && rtl) ||
      e.key === "ArrowUp"
    ) {
      e.preventDefault();
      const step = allowHalf ? 0.5 : 1;
      const newRating = Math.min(starCount, rating + step);
      setRating(newRating);
      onChange?.(newRating);
      const nextIndex = Math.min(starCount - 1, currentIndex + 1);
      starRefs.current[nextIndex]?.focus();
    }
  };

  const handleClear = () => {
    if (readOnly) return;
    setRating(0);
    onChange?.(0);
  };

  const getStarIcon = (star: number) => {
    if ((hovered ?? rating) >= star) {
      return (
        <i
          className="fa-solid fa-star"
          aria-hidden="true"
          style={{ color: fullColor, fontSize: 24 }}
        ></i>
      );
    } else if (allowHalf && (hovered ?? rating) >= star - 0.5) {
      return (
        <i
          className="fa-solid fa-star-half-stroke"
          aria-hidden="true"
          style={{ color: halfColor, fontSize: 24 }}
        ></i>
      );
    } else {
      return (
        <i
          className="fa-regular fa-star"
          aria-hidden="true"
          style={{ color: emptyColor, fontSize: 24 }}
        ></i>
      );
    }
  };

  const getTabIndex = (star: number) => {
    if (readOnly) return -1;
    if (rating === 0 && star === 1) return 0;
    if (rating === star) return 0;
    return -1;
  };

  const starsArray = rtl
    ? Array.from({ length: starCount }, (_, i) => starCount - i)
    : Array.from({ length: starCount }, (_, i) => i + 1);

  return (
    <div
      className={`rating-row${readOnly ? " readonly" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: rtl ? "row-reverse" : "row",
      }}
      role="radiogroup"
      aria-label="Rating"
      dir={rtl ? "rtl" : "ltr"}
      aria-disabled={readOnly}
    >
      <div className="rating-container">
        {starsArray.map((star, idx) => {
          const isHovered = hovered === star;
          return (
            <span
              key={star}
              ref={(el) => {
                starRefs.current[idx] = el;
              }}
              role="radio"
              aria-checked={rating === star}
              aria-label={labels[star - 1] || `Rate ${star}`}
              tabIndex={getTabIndex(star)}
              onClick={(e) => handleClick(e, star)}
              onKeyDown={(e) => handleKeyDown(e, star)}
              className={`star${readOnly ? " readonly" : ""}`}
              style={{
                transform: isHovered ? `scale(${animationScale})` : "scale(1)",
                transition: "transform 0.2s, color 0.2s",
                fontSize: 24,
              }}
              onMouseEnter={() => {
                if (!readOnly) setHovered(star);
              }}
              onMouseLeave={() => {
                if (!readOnly) setHovered(null);
              }}
              title={labels[star - 1] || undefined}
            >
              {getStarIcon(star)}
            </span>
          );
        })}
      </div>
      {showRatingNumber && (
        <span className="rating-value" style={{ marginLeft: "8px" }}>
          ({rating > 0 ? rating : 0}/{starCount})
        </span>
      )}
      {showClear && !readOnly && rating > 0 && (
        <button
          type="button"
          aria-label="Reset rating"
          onClick={handleClear}
          style={{
            marginLeft: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#888",
            fontSize: "16px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <i
            className="fa-solid fa-rotate-left"
            aria-hidden="true"
            style={{ fontSize: "0.7em" }}
          ></i>
        </button>
      )}
    </div>
  );
};

export default Rating;
