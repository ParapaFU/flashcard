// DOM
// add card btn
// const addCardBtn = document.getElementbyId('add-card-btn');
const cardContainer = document.querySelector(".list-items");
let card = document.querySelector(".item")

// Data


// Function
function checkItems(){
  let totalCard = cardContainer.children.length;
  return totalCard;
}

console.log(checkItems());
console.log(card.offsetWidth)

// Event
// Program