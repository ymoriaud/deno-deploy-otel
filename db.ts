import { withSpan } from "./utils.ts";
import * as books from "./books.ts";

export const getBookFromDatabase = withSpan(
  "getBookFromDatabase",
  async function getBookFromDatabase(span, bookId: string) {
    span.setAttribute("book_id", bookId);

    console.log(`[db] getBookFromDatabase ${bookId}`);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const book = books.get(bookId);

    if (book === undefined) throw new Error("No book found.");
    if (!book.author) throw new Error("Book is missing author.");

    return book;
  },
);
