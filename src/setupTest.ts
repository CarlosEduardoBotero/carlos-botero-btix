import matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/extend-expect";
import { expect, afterAll, afterEach, beforeAll } from "vitest";
import { mockServer } from "./utils/mockEndpoint";
import { fetch } from "cross-fetch";

expect.extend(matchers);

global.fetch = fetch;

beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());
