import React from "react";
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
declare const Rating: React.FC<RatingProps>;
export default Rating;
//# sourceMappingURL=Rating.d.ts.map