import CommentsContainer from "./CommentsContainer";
import { it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import { mockEndpoint, mockEndpointError } from "../../utils/mockEndpoint";

describe("CommentsContainer tests", () => {
  it("Should render comments on happy path", async () => {
    mockEndpoint(`https://jsonplaceholder.typicode.com/posts/1/comments`, {
      body: [
        {
          postId: 1,
          id: 1,
          name: "test",
          email: "test@gmail.com",
          body: "blablalba",
        },
      ],
    });
    render(<CommentsContainer id={1} />);

    expect(await screen.findByText(`test@gmail.com`)).toBeInTheDocument();
    expect(screen.getByTestId(`commentsCard`)).toBeInTheDocument();
  });
  it("Should render loader while waiting response", () => {
    render(<CommentsContainer id={1} />);

    expect(screen.getByTestId(`comments-loader`)).toBeInTheDocument();
  });
  it("Should render error message when fetch fails", async () => {
    mockEndpointError(`https://jsonplaceholder.typicode.com/posts/1/comments`, {
      status: 400,
    });
    render(<CommentsContainer id={1} />);

    expect(await screen.findByText(`Ocurreu um error`)).toBeInTheDocument();
  });
});
