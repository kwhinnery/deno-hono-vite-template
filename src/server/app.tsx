/** @jsx jsx */
import { Hono } from "hono/mod.ts";
import { jsx, serveStatic } from "hono/middleware.ts";

const app = new Hono();
export default app;

app.get("/", (c) => {
  return c.html(
    <html>
      <head>
        <link rel="stylesheet" href="/assets/index.css"></link>
      </head>
      <body>
        <h1 class="text-3xl font-bold underline">
          Hello, world!
        </h1>
        <script type="module" src="/assets/index.js"></script>
      </body>
    </html>,
  );
});

app.use("/*", serveStatic({ root: "./dist" }));

Deno.serve(app.fetch);
