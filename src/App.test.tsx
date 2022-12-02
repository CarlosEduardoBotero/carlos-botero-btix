import App from "./App";
import { describe, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";

describe("App tests", () => {
  it("Shoud render home page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId("home-wrapper")).toBeInTheDocument();
  });
});
