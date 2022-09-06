export const BookCard = ({ book }) => {
  const addBook = () => {};
  return (
    <div style={{ border: "1px solid black" }}>{book.volumeInfo.title}</div>
  );
};
