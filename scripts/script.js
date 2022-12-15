//Main search function which takes the search query from the user input.
export const search = async (term) => {
  const result =
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&orderBy=relevance&maxResults=40

`);
  //Await the results and convert them from JSON format
  const arr = await result.json();
  // Map The books and return the information for each book.
  const queriedData = arr.items.map((book) => {
    return book.volumeInfo;
  });
  return queriedData;
};
