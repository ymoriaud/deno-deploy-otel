import { Router } from "@oak/oak/router";
import { Application } from "@oak/oak/application";

import { getBookFromDatabase } from "./db.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ?? "localhost"
    }:${port}`,
  );
});

const router = new Router();

app.use(async (ctx, next) => {
  await next();
  if (ctx.response.status === 404) {
    const firstBook = new URL("/books/1", ctx.request.url);
    ctx.response.body = `Not found, go to ${firstBook.href} instead.`;
    ctx.response.status = 404;
  }
});

router.get("/books/:id", async (ctx) => {
  const id: string = ctx.params["id"];

  const book = await getBookFromDatabase(id);

  console.log("Book from DB", book);
  return ctx.response.body = book;
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });
