const books = [{
  "id": "1",
  "title": "Deno API 101",
  "author": "Deno Team",
}, {
  "id": "2",
  "title": "Why Deno is so cool?",
  "author": "Deno Team",
}];

export function get(bookId: string) {
  return books.find((book) => book.id == bookId);
}
