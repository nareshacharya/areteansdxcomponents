# Using Custom Components in Constellation

## Overview

This project provides you with an environment to extend Constellation by giving you tools to create and publish custom components that are not available from the Constellation installation.

## Prerequisites

Ensure you have access to the following in your system:

- Pega Infinity Server version 24.2 or later

- Git version 2.30 or later

- System node version 18, 20

- System npm version 8, 10 (9 is not supported)

- Recommended (node 20, npm 10)

## Latest Documentation

Find the latest documentation on using **DX Component Builder** [here](https://docs.pega.com/bundle/constellation-dx-components/page/constellation-dx-components/custom-components/whats-new-constellation-dx-component-builder.html)

# Areteans Extensions Star Rating

A customizable Star Rating React component for Pega DX components, supporting half-stars, custom icons, custom colors, labels, RTL, and more.

## Features

- Customizable star count
- Half-star support
- Custom colors for full, half, and empty stars
- Optional rating number display
- Optional clear/reset button
- RTL (right-to-left) support
- Keyboard accessible
- Custom labels
- **Custom SVG or image icons for full and half stars**

## Installation

1. **Install dependencies:**

   ```
   npm install
   ```

2. **(Optional) If using outside Storybook, ensure FontAwesome is loaded (for fallback icons):**

   Add this to your HTML `<head>`:

   ```html
   <link
     rel="stylesheet"
     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
   />
   ```

## Usage

### Basic Example

```tsx
import Rating from "./src/components/Areteans_Extensions_StarRating/Rating";

function App() {
  const [value, setValue] = useState(3);

  // Example custom SVGs
  const CustomFullStar = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="orange">
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
    </svg>
  );
  const CustomHalfStar = (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="orange" />
          <stop offset="50%" stopColor="#ccc" />
        </linearGradient>
      </defs>
      <polygon
        points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
        fill="url(#half)"
      />
    </svg>
  );

  return (
    <Rating
      value={value}
      onChange={setValue}
      starCount={5}
      allowHalf={true}
      showRatingNumber={true}
      fullColor="gold"
      halfColor="gold"
      emptyColor="#ccc"
      showClear={true}
      rtl={false}
      labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
      fullStarIcon={CustomFullStar}
      halfStarIcon={CustomHalfStar}
    />
  );
}
```

### In Pega DX Base Component

```tsx
import AreteansExtensionsStarRating from "./src/components/Areteans_Extensions_StarRating";

<AreteansExtensionsStarRating
  value={3}
  allowHalf={true}
  showRatingNumber={true}
  starCount={5}
  fullColor="gold"
  halfColor="gold"
  emptyColor="#ccc"
  showClear={true}
  rtl={false}
  labels={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
/>;
```

## Props

| Prop               | Type      | Default | Description                               |
| ------------------ | --------- | ------- | ----------------------------------------- |
| `value`            | number    | 0       | Current rating value                      |
| `onChange`         | function  | —       | Callback when rating changes              |
| `readOnly`         | boolean   | false   | If true, disables interaction             |
| `allowHalf`        | boolean   | false   | Allow half-star selection                 |
| `showRatingNumber` | boolean   | true    | Show rating number next to stars          |
| `starCount`        | number    | 5       | Number of stars                           |
| `fullColor`        | string    | "gold"  | Color for full stars                      |
| `halfColor`        | string    | "gold"  | Color for half stars                      |
| `emptyColor`       | string    | "#ccc"  | Color for empty stars                     |
| `labels`           | string[]  | []      | Labels for each rating value              |
| `animationScale`   | number    | 1.2     | Scale animation on hover                  |
| `showClear`        | boolean   | false   | Show clear/reset button                   |
| `rtl`              | boolean   | false   | Right-to-left layout                      |
| `fullStarIcon`     | ReactNode | —       | Custom SVG/image for full star (optional) |
| `halfStarIcon`     | ReactNode | —       | Custom SVG/image for half star (optional) |

## Storybook

To view and test the component in Storybook:

```sh
npm run startStorybook
```

Then open [http://localhost:6040](http://localhost:6040) in your browser.

## License

MIT

---

**Need help?**  
Open an issue or contact the maintainer.
