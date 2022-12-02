import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home tests", () => {
  it("Should render home page", () => {
    render(<Home />);

    expect(screen.getByTestId("infinite-scroll-wrapper")).toBeInTheDocument();
  });
});
