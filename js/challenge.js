//CREATE A SUBMIT EVENTLISTENER
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        handleToDo(e.target.comment.value)

    })
})
//CREATE A FUNCTION TO ADD A 'P' TO HTML AND APPENDCHILD FOR THE LIST
function handleToDo(todo){
    let p = document.createElement('p')
    p.textContent = todo
    document.querySelector('#list').appendChild(p)
}



// Get the counter element
const counterElement = document.getElementById("counter");

// Get the plus, minus, like, pause, and resume buttons
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const likeButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const resumeButton = document.createElement("button");
resumeButton.textContent = "resume";

// Get the likes list
const likesList = document.querySelector(".likes");

// Initialize the counter value, likes object, and isPaused state
let counterValue = 0;
let likes = {};
let isPaused = false;
let intervalId;

// Function to update the counter
function updateCounter() {
  counterElement.textContent = counterValue;
}

// Function to increment the counter
function incrementCounter() {
  counterValue++;
  updateCounter();
}

// Function to decrement the counter
function decrementCounter() {
  counterValue--;
  updateCounter();
}

// Function to handle the like button click
function likeCounter() {
  if (!likes[counterValue]) {
    likes[counterValue] = 1;
  } else {
    likes[counterValue]++;
  }
  renderLikes();
}

// Function to render the likes
function renderLikes() {
  likesList.innerHTML = "";
  for (let number in likes) {
    const likeItem = document.createElement("li");
    likeItem.textContent = `Number ${number}: ${likes[number]} likes`;
    likesList.appendChild(likeItem);
  }
}

// Function to pause the counter
function pauseCounter() {
  clearInterval(intervalId);
  isPaused = true;
  plusButton.disabled = true;
  minusButton.disabled = true;
  likeButton.disabled = true;
  pauseButton.textContent = "resume";
  pauseButton.removeEventListener("click", pauseCounter);
  pauseButton.addEventListener("click", resumeCounter);
}

// Function to resume the counter
function resumeCounter() {
  intervalId = setInterval(incrementCounter, 1000);
  isPaused = false;
  plusButton.disabled = false;
  minusButton.disabled = false;
  likeButton.disabled = false;
  pauseButton.textContent = "pause";
  pauseButton.removeEventListener("click", resumeCounter);
  pauseButton.addEventListener("click", pauseCounter);
}

// Add event listeners to the plus, minus, and like buttons
plusButton.addEventListener("click", incrementCounter);
minusButton.addEventListener("click", decrementCounter);
likeButton.addEventListener("click", likeCounter);

// Add event listener to the pause button
pauseButton.addEventListener("click", pauseCounter);

// Initialize the counter interval
intervalId = setInterval(incrementCounter, 1000);