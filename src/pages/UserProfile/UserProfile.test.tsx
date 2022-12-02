import { it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile tests", () => {
  it("Should render UserProfile", () => {
    render(<UserProfile />);

    expect(screen.getByTestId("user-profile-wrapper")).toBeInTheDocument();
  });
});
