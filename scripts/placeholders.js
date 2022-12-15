// Function to generate the modal with predefined HTML elements.
export const genBookContainer = (
  img,
  title,
  authors,
  shortDesc,
  fullData,
  index
) => {
  return `
          <img class = "book__container--img" src="${img}" alt="">
          <div class="book__container--right">
          <h3 class="book__container--title">${title}</h3>
          <p class="book__container--author">${authors}</p>
          <p class="book__container--desc">${shortDesc}</p>
          <button id ="info-btn-${index}" class="book__container--btn">View More Details</button>
          </div>
        </div>
   `;
};
// function that generates modal for each item with cleaned information.
export const generateModal = (data) => {
  console.log(data);
  const authorNameText = data.authors ? data.authors : "Unknown Author";
  const bookTitleText = data.title;
  let imgLink = "";
  if (data.imageLinks) {
    imgLink = data.imageLinks.thumbnail;
  } else {
    imgLink = "../images/noBook.jpeg";
  }

  return `
          <button class="book__modal--closebtn">X</button>
          <img class="book__modal--img" src="${imgLink}" alt="" />
          <p class="book__modal--title">${bookTitleText}</p>
          <p class="book__modal--author"><span class = "book__modal--category">By, </span>${authorNameText}</p>
          <p class="book__modal--year"><span class = "book__modal--category">Date Published : </span>${
            data.publishedDate ? data.publishedDate : "Unknown Date"
          }</p>
          <p class="book__modal--publisher"> <span class = "book__modal--category">Publisher : </span>${
            data.publisher ? data.publisher : "Unknown Publisher"
          }</p>
          
          <p class="book__modal--desc"><span class = "book__modal--category">Description: </span> ${
            data.description ? data.description : "No Description Available "
          }</p>

          <p class="book__modal--pages"><span class = "book__modal--category">Pages: </span> ${
            data.pageCount ? data.pageCount : "Unknown"
          }</p>
          <p class="book__modal--lang"><span class = "book__modal--category"> Language : </span>${data.language.toUpperCase()}</p>
          <button class="book__modal--btn"><a href="${
            data.previewLink
          }" target="_blank">Preview</a></button>
        `;
};
