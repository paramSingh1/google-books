import { search } from "./script.js";
import { genBookContainer, generateModal } from "./placeholders.js";
// Search button
const searchBtn = document.querySelector(".landing__search--form--btn");
// user search query
const query = document.querySelector(".landing__search--form--input");
/* Event Listener that clears previous results from page
If there is no search query the user is shown a message to enter a query.
**/
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  clearResults();
  if (!query.value) {
    document.querySelector(".status").innerHTML = "Enter a Search Query";
  } else {
    document.querySelector(".status").innerHTML = "Loading...";

    displayItems(await search(query.value));
    document.querySelector(".status").innerHTML = "";
  }
});
// function to clear previous results
export const clearResults = () => {
  document.querySelector(".results__container").innerHTML = "";
};
// function to clear the modal of old data
export const clearModal = () => {
  document.querySelector(".book__modal").innerHTML = "";
};

// function that takes in data in the form of an object
// takes data from the object and appends it to elements of a modal which is displayed to user.
const displayModal = (data) => {
  let parent = document.querySelector(".book__modal");
  parent.style.display = "flex";
  clearModal();

  let modal = document.createElement("div");
  modal.classList = "book__modal--container";
  modal.innerHTML = generateModal(data);
  parent.appendChild(modal);

  document
    .querySelector(".book__modal--closebtn")
    .addEventListener("click", () => {
      parent.style.display = "none";
    });
};
// Generates a card for each book.
const createCard = async (img, authors, title, desc, allData, btnId) => {
  let shortDesc = [];
  let newDiv = document.createElement("div");
  if (desc) {
    // trim the description for the preview
    if (desc.length > 120) {
      shortDesc = [...desc];
      shortDesc = shortDesc.slice(0, 110);
      shortDesc = shortDesc.join("") + "...";
    } else {
      shortDesc = desc;
    }
  }
  // create the div for the card
  newDiv.classList = "book__container";
  newDiv.innerHTML = genBookContainer(
    img,
    title,
    authors,
    shortDesc,
    allData,
    btnId
  );
  let parent = document.createElement("div");

  document.querySelector(".results__container").appendChild(newDiv);

  let btn = document.getElementById(`info-btn-${btnId}`);
  // adds event listener to each button with a unique ID to display the corresponding modal.
  btn.addEventListener("click", (event) => {
    displayModal(allData);
  });
};

/*
Function that cleans and populates the data for each card
*/
const displayItems = async (obj) => {
  await obj.forEach((ele, index) => {
    console.log(index);
    const btnId = index;
    const authorNameText = ele.authors ? ele.authors : "Unknown Author";
    const bookTitleText = ele.title;
    // if there is no image available from the object, fill in with a default image.
    let imgLink = "";
    if (ele.imageLinks) {
      imgLink = ele.imageLinks.thumbnail;
    } else {
      imgLink = "../images/noBook.jpeg";
    }
    const desc = ele.description ? ele.description : "No Description Available";
    // create the card with the cleaned information
    createCard(imgLink, authorNameText, bookTitleText, desc, ele, btnId);
  });
};
