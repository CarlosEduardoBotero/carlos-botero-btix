import { it, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

import PostCard from "./PostCard";

describe("PostCard tests", () => {
  it("should render PostCard", () => {
    render(
      <PostCard
        name={"nameTest"}
        username={"usernameTest"}
        body={"blablabla"}
        title={"titleTest"}
        userId={1}
        id={1}
      />,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByText("nameTest")).toBeInTheDocument();
    expect(screen.getByText("usernameTest")).toBeInTheDocument();
  });
  it("should render CommentsCard when button 'Mostrar mais' is clicked", () => {
    render(
      <PostCard
        name={"nameTest"}
        username={"usernameTest"}
        body={"blablabla"}
        title={"titleTest"}
        userId={1}
        id={1}
      />,
      { wrapper: MemoryRouter }
    );
    const button = screen.getByRole("button", { name: "Mostrar Comentarios" });

    fireEvent.click(button);

    expect(button).not.toBeInTheDocument();
    expect(screen.getByTestId(`comments-loader`)).toBeInTheDocument();
  });
  it("should render CommentsCard when button 'Mostrar mais' is press", () => {
    render(
      <PostCard
        name={"nameTest"}
        username={"usernameTest"}
        body={"blablabla"}
        title={"titleTest"}
        userId={1}
        id={1}
      />,
      { wrapper: MemoryRouter }
    );
    const button = screen.getByRole("button", { name: "Mostrar Comentarios" });

    fireEvent.keyDown(button, { key: "Enter", code: 13, charCode: 13 });

    expect(button).not.toBeInTheDocument();
    expect(screen.getByTestId(`comments-loader`)).toBeInTheDocument();
  });
});
