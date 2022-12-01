import CommentsCard from "./CommentsCard";
import { it, describe } from "vitest";
import { render, screen } from "@testing-library/react";

describe("CommentsCard tests", () => {
  it("Should render a CommentCard", () => {
    render(
      <CommentsCard email="test@test.com" name="testname" body="message body" />
    );
    expect(screen.getByText("message body")).toBeInTheDocument();
    expect(screen.getByText("testname")).toBeInTheDocument();
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });
});
