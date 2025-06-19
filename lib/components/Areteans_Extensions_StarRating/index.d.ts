/// <reference types="react" />
import type { PConnFieldProps } from "./PConnProps";
import "./create-nonce";
interface AreteansExtensionsStarRatingProps extends PConnFieldProps {
    displayAsStatus?: boolean;
    isTableFormatter?: boolean;
    hasSuggestions?: boolean;
    variant?: any;
    formatter: string;
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
export declare const formatExists: (formatterVal: string) => boolean;
export declare const textFormatter: (formatter: string, value: string) => any;
declare const _default: (props: AreteansExtensionsStarRatingProps) => JSX.Element;
export default _default;
//# sourceMappingURL=index.d.ts.map