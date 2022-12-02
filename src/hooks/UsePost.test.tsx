import { it, describe } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import usePost from "./usePost";
import { mockEndpoint, mockEndpointError } from "../utils/mockEndpoint";

describe("UsePost test", () => {
  it("Should render state on first mount", () => {
    const { result } = renderHook(() => usePost());

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.hasNext).toBeTruthy();
    expect(result.current.posts).toHaveLength(0);
  });
  it("Should return post when fetch api", async () => {
    mockEndpoint(`https://jsonplaceholder.typicode.com/posts`, {
      body: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
    });
    mockEndpoint(`https://jsonplaceholder.typicode.com/users`, {
      body: [
        {
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
      ],
    });
    const { result } = renderHook(() => usePost(1, 1));

    await waitFor(() => expect(result.current.isLoading).toBeFalsy(), {
      timeout: 5000,
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.posts).toHaveLength(1);
  });
  it("Should return isError true when fetch fails", async () => {
    mockEndpointError(`https://jsonplaceholder.typicode.com/posts`, {
      status: 500,
    });
    mockEndpointError(`https://jsonplaceholder.typicode.com/users`, {
      status: 500,
    });
    const { result } = renderHook(() => usePost(1, 1));

    await waitFor(() => expect(result.current.isLoading).toBeFalsy(), {
      timeout: 5000,
    });

    expect(result.current.posts).toHaveLength(0);
    expect(result.current.isError).toBeTruthy();
  });
});
