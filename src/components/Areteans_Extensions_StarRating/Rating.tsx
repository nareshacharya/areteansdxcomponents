import React, { useState, useRef, useEffect } from "react";
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
  fullStarIcon?: React.ReactNode;
  halfStarIcon?: React.ReactNode;
}

const getDefaultFullStar = (color: string) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={color}
    stroke={color}
    strokeWidth="1"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
  </svg>
);

const getDefaultHalfStar = (fullColor: string, emptyColor: string) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="half-grad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor={fullColor} />
        <stop offset="50%" stopColor={emptyColor} />
      </linearGradient>
    </defs>
    <polygon
      points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
      fill="url(#half-grad)"
      stroke={fullColor}
      strokeWidth="1"
    />
  </svg>
);

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
  fullStarIcon,
  halfStarIcon,
}) => {
  const [rating, setRating] = useState(value);
  const [hovered, setHovered] = useState<number | null>(null);
  const starRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    star: number,
  ) => {
    if (readOnly) return;
    let newRating = star;
    if (allowHalf && e.nativeEvent.offsetX < e.currentTarget.offsetWidth / 2) {
      newRating = star - 0.5;
    }
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLSpanElement>,
    star: number,
  ) => {
    if (readOnly) return;
    if (e.key === "Enter" || e.key === " ") {
      setRating(star);
      if (onChange) {
        onChange(star);
      }
    }
  };

  const handleClear = () => {
    if (readOnly) return;
    setRating(0);
    if (onChange) {
      onChange(0);
    }
  };

  const getStarIcon = (star: number) => {
    const displayValue = hovered !== null ? hovered : rating;
    if (displayValue >= star) {
      return <span>{fullStarIcon || getDefaultFullStar(fullColor)}</span>;
    } else if (allowHalf && displayValue >= star - 0.5) {
      return (
        <span>{halfStarIcon || getDefaultHalfStar(halfColor, emptyColor)}</span>
      );
    } else {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={emptyColor}
          stroke={emptyColor}
          strokeWidth="1"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
        </svg>
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
