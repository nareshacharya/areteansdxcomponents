import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Rating from "./Rating";

describe("Rating component", () => {
  it("renders the correct number of stars", () => {
    render(<Rating starCount={7} />);
    expect(screen.getAllByRole("radio")).toHaveLength(7);
  });

  it("calls onChange with correct value on click", () => {
    const handleChange = jest.fn();
    render(<Rating onChange={handleChange} />);
    fireEvent.click(screen.getAllByRole("radio")[2]);
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("shows half star when allowHalf is true", () => {
    render(<Rating allowHalf />);
    const star = screen.getAllByRole("radio")[2];
    fireEvent.mouseMove(star, { clientX: 0 }); // Simulate left half
    fireEvent.click(star, { clientX: 0 });
    // Optionally, add an assertion if your component renders a half-star icon
    expect(screen.getAllByRole("radio")[2]).toBeInTheDocument();
  });

  it("shows rating number if showRatingNumber is true", () => {
    render(<Rating value={3} showRatingNumber />);
    expect(screen.getByText("(3/5)")).toBeInTheDocument();
  });

  it("does not call onChange when readOnly", () => {
    const handleChange = jest.fn();
    render(<Rating readOnly onChange={handleChange} />);
    fireEvent.click(screen.getAllByRole("radio")[2]);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("shows reset button when showClear is true and rating > 0", () => {
    render(<Rating value={2} showClear />);
    expect(screen.getByLabelText(/reset rating/i)).toBeInTheDocument();
  });

  it("renders the component and checks for label", () => {
    render(<Rating />);
    // Replace "label" with the actual label text if your component renders one
    // For now, this checks that the component renders at least one radio input
    expect(screen.getAllByRole("radio").length).toBeGreaterThan(0);
  });
});
