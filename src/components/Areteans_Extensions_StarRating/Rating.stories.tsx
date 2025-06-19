import Rating from "./Rating";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Rating> = {
  title: "Custom/Rating",
  component: Rating,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    value: 2,
    readOnly: false,
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};
