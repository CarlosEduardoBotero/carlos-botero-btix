import { rest } from "msw";
import { setupServer } from "msw/node";

export const mockServer = setupServer();

export const mockEndpoint = (
  endpoint,
  { body, httpVerb = `get`, status = 200 }
) => {
  mockServer.use(
    rest[httpVerb](endpoint, (req, res, ctx) =>
      res(ctx.status(status), ctx.json(body))
    )
  );
};
export const mockEndpointError = (
  endpoint,
  { httpVerb = `get`, status = 200 }
) => {
  mockServer.use(
    rest[httpVerb](endpoint, (req, res, ctx) => res(ctx.status(status)))
  );
};
