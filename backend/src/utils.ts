import { IncomingMessage, Server, ServerResponse } from "http";

export const shutdown = (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing shutdown...");
    process.exit(1);
  }, 10_000);
};
