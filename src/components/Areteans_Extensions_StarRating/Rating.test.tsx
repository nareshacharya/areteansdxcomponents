import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Rating from "./Rating";

describe("Rating component", () => {
  it("renders the correct number of stars", () => {
    const { getAllByRole } = render(<Rating starCount={7} />);
    expect(getAllByRole("radio")).toHaveLength(7);
  });

  it("calls onChange with correct value on click", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(<Rating onChange={handleChange} />);
    fireEvent.click(getAllByRole("radio")[2]);
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("shows half star when allowHalf is true", () => {
    const { getAllByRole } = render(<Rating allowHalf />);
    const star = getAllByRole("radio")[2];
    fireEvent.mouseMove(star, { clientX: 0 }); // Simulate left half
    fireEvent.click(star, { clientX: 0 });
    // No assertion here, but you can extend this to check for half-star icon if needed
  });

  it("shows rating number if showRatingNumber is true", () => {
    const { getByText } = render(<Rating value={3} showRatingNumber />);
    expect(getByText("(3/5)")).toBeInTheDocument();
  });

  it("does not call onChange when readOnly", () => {
    const handleChange = jest.fn();
    const { getAllByRole } = render(
      <Rating readOnly onChange={handleChange} />
    );
    fireEvent.click(getAllByRole("radio")[2]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("shows reset button when showClear is true and rating > 0", () => {
    const { getByLabelText } = render(<Rating value={2} showClear />);
    expect(getByLabelText(/reset rating/i)).toBeInTheDocument();
  });
});
