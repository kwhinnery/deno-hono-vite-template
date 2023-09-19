// @deno-types="npm:@types/express@4"
import express from "npm:express@4";

const app = express();

app.all("*", (_req, res) => {
  res.send("hello world!");
});

app.listen(3000);
