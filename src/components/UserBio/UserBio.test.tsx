import { it, describe, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import { mockEndpoint, mockEndpointError } from "../../utils/mockEndpoint";

const useParamsMock = vi.fn(() => ({
  name: "test",
  userId: 1,
}));
vi.mock("react-router-dom", () => {
  return {
    useParams: useParamsMock,
  };
});

import UserBio from "./UserBio";
describe("UserBio tests", () => {
  it("Should render Bio info on happy path", async () => {
    mockEndpoint(`https://jsonplaceholder.typicode.com/users/1`, {
      body: {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    });
    render(<UserBio />);

    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(await screen.findByText("Bret")).toBeInTheDocument();
    expect(await screen.findByText("Gwenborough")).toBeInTheDocument();
    expect(await screen.findByTestId("leaflet-map")).toBeInTheDocument();
    expect(useParamsMock).toHaveBeenCalled();
  });
  it("Should not render Bio info when fetch fails", () => {
    mockEndpointError(`https://jsonplaceholder.typicode.com/users/1`, {
      status: 500,
    });
    render(<UserBio />);

    expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument();
    expect(screen.queryByText("Bret")).not.toBeInTheDocument();
    expect(screen.queryByText("Gwenborough")).not.toBeInTheDocument();
    expect(screen.queryByTestId("leaflet-map")).not.toBeInTheDocument();
  });
});
