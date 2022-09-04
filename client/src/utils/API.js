//route to get books

export const allBooks =(query) => {
  return fetch('api/book/')
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};