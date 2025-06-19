/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from "@storybook/react";

import AreteansExtensionsStarRating from "./index";

import { stateProps, fieldMetadata, configProps } from "./mock";

const meta: Meta<typeof AreteansExtensionsStarRating> = {
  title: "AreteansExtensionsStarRating",
  component: AreteansExtensionsStarRating,
  excludeStories: /.*Data$/,
};

export default meta;
type Story = StoryObj<typeof AreteansExtensionsStarRating>;

export const BaseAreteansExtensionsStarRating: Story = (args: any) => {
  const props = {
    value: configProps.value,
    hasSuggestions: configProps.hasSuggestions,
    fieldMetadata,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {
              /* nothing */
            },
            triggerFieldChange: () => {
              /* nothing */
            },
          };
        },
        ignoreSuggestion: () => {
          /* nothing */
        },
        acceptSuggestion: () => {
          /* nothing */
        },
        setInheritedProps: () => {
          /* nothing */
        },
        resolveConfigProps: () => {
          /* nothing */
        },
      };
    },
  };

  return (
    <>
      <AreteansExtensionsStarRating {...props} {...args} />
    </>
  );
};

BaseAreteansExtensionsStarRating.args = {
  label: configProps.label,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage,
};

export const StarRatingDemo: Story = (args: any) => {
  const props = {
    value: configProps.value,
    hasSuggestions: configProps.hasSuggestions,
    fieldMetadata,
    getPConnect: () => {
      return {
        getStateProps: () => {
          return stateProps;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {
              /* nothing */
            },
            triggerFieldChange: () => {
              /* nothing */
            },
          };
        },
        ignoreSuggestion: () => {
          /* nothing */
        },
        acceptSuggestion: () => {
          /* nothing */
        },
        setInheritedProps: () => {
          /* nothing */
        },
        resolveConfigProps: () => {
          /* nothing */
        },
      };
    },
  };

  return (
    <AreteansExtensionsStarRating
      {...props}
      {...args}
      allowHalf={args.allowHalf}
      showRatingNumber={args.showRatingNumber}
      starCount={args.starCount}
      fullColor={args.fullColor}
      halfColor={args.halfColor}
      emptyColor={args.emptyColor}
      labels={args.labels}
      animationScale={args.animationScale}
      showClear={args.showClear}
      rtl={args.rtl}
    />
  );
};

StarRatingDemo.args = {
  label: "Star Rating",
  starCount: 5,
  allowHalf: false,
  showRatingNumber: true,
  fullColor: "gold",
  halfColor: "gold",
  emptyColor: "#ccc",
  labels: [],
  animationScale: 1.2,
  showClear: false,
  rtl: false,
  helperText: configProps.helperText,
  placeholder: configProps.placeholder,
  testId: configProps.testId,
  readOnly: configProps.readOnly,
  disabled: configProps.disabled,
  required: configProps.required,
  status: configProps.status,
  hideLabel: configProps.hideLabel,
  displayMode: configProps.displayMode,
  variant: configProps.variant,
  validatemessage: configProps.validatemessage,
};
