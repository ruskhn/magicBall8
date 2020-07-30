let mouseCoursor = document.querySelector(".cursor");
let navLinks = document.querySelectorAll(".nav-links li");

window.addEventListener("mousemove", cursor);

//Custom Cursor position
function cursor(e) {
  mouseCoursor.style.top = e.pageY + "px";
  mouseCoursor.style.left = e.pageX + "px";
}
//Cursor behavior for navlinks
navLinks.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    mouseCoursor.classList.remove("link-grow");
    link.classList.remove("hovered-link");
  });
  link.addEventListener("mouseover", () => {
    mouseCoursor.classList.add("link-grow");
    link.classList.add("hovered-link");
  });
});

const status = document.getElementById("status");
const answer = document.getElementById("answer");
const question = document.getElementById("question");
const submitButton = document.getElementById("submitButton");
const ball = document.getElementById("ball");
const history = document.getElementById("history");
let responseHistory = [];

function loader(isFetching) {
  if (isFetching) {
    submitButton.disabled = true;
    question.classList.add("shake");
    ball.classList.add("shake");
  } else {
    submitButton.disabled = false;
    question.classList.remove("shake");
    ball.classList.remove("shake");
  }
}
//Button Submit => events start
submitButton.addEventListener("click", async function () {
  if (question.value.length < 1) {
    status.innerText = "Ask me somethink";
  } else if (question.value[question.value.length - 1] !== "?") {
    status.innerText = "Enter a question with question mark  in the end '?'";
    status.style.color = "#fff";
  } else {
    status.innerText = "";
    // Validation success
    //Starting to fetch data with current question
    fetchData(question.value);
  }
});

function fetchSuccess(data) {
  //Show result for the user
  //asnwer output
  answer.innerText = "Answer is: " + data.magic?.answer;
  if (responseHistory.length >= 10) {
    //remove 1 element at index 0
    responseHistory.splice(0, 1);
    //insert new welement in the end
    responseHistory.push(data.magic?.answer + " ");
  } else if (responseHistory.length < 10) {
    responseHistory.push(data.magic?.answer + " ");
  }
  //Update history in html
  history.innerText = responseHistory;
  //Clean input and status
  question.value = "";
  status.innerText = data.magic?.type;
  //loader off
  loader(false);
}

function fetchData(value) {
  //loader(shaker) on
  loader(true);
  //Data fetch
  let questionParam = encodeURIComponent(value);
  let uri = "https://8ball.delegator.com/magic/JSON/" + questionParam;
  fetch(uri)
    .then((response) => response.json())
    .then((data) => {
      //Handle Success data fetch
      fetchSuccess(data);
    })
    .catch(() => {
      //Stop loader if error and throw error msg
      loader(false);
      status.innerText =
        "Oops! Looks like the ball doesn't work right now, try later again.";
    });
}
