// random quote api url
const quoteApi =
  "https://api.quotable.io/quotes/random?minLength=100&maxLength=140";
const quoteSection = document.querySelector("#quote");
const userInput = document.querySelector("#quote_input");

let quote = "11";
let time = 60;
let timer = "";
let mistakes = 0;

// random quote
const renderNewQuote = async () => {
  try {
    // fetch contents from url
    const response = await fetch(quoteApi);

    // check if response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // store response
    let data = await response.json();

    // Access the first element of the array to get the quote object
    let quoteObj = data[0];

    // Access the content property of the quote object
    let quote = quoteObj.content;

    // Log the quote to check if it's assigned correctly
    console.log(quote);

    // Render or do something with the quote
    // renderQuote(quote);
    // lets make this content to split into array of chars to furhter utilization
    let arr = quote.split("").map((value) => {
      // lets wrap characters in a span tag
      return "<span class='quote_chars'>" + value + "</span>";
    });
    quoteSection.innerHTML = arr.join("");
    // let see our array
    console.log(arr);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// userInput.addEventListener("input", function(event) {
//     console.log("hi");
//     // Check if the key pressed is not a modifier key (e.g., Shift, Ctrl, Alt)
//     if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
//         // Get reference to the audio element
//         var keySound = document.getElementById('keySound');
//         // Play the audio
//         keySound.currentTime = 0; // Rewind to the beginning (in case the sound is already playing)
//         keySound.play();
//     }
// });
// logic to compare input sentence with Test Sentence
userInput.addEventListener("input", () => {
  let quoteChars = document.querySelectorAll(".quote_chars");
  // console.log(quoteChars);
  // create an array from recieved span tags
  quoteChars = Array.from(quoteChars);
  console.log(quoteChars);

  // create of user input characters
  let userInpputChars = userInput.value.split("");

  // loop through each Character in quote
  quoteChars.forEach((char, index) => {
    // check if char(quote character) = userInputChars[index](input character)

    if (char.innerText == userInpputChars[index]) {
      char.classList.add("success");
    } // if user hasn't entered anything or backspaced.
    else if (userInpputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    } //  for entering wrong characters
    else {
      // check if already added fail class
      if (!char.classList.contains("fail")) {
        mistakes += 1;
        char.classList.add("fail");
      }
      document.querySelector("#mistakes").innerText = mistakes;
    }
    // returns true if all the character are entered correctly
    let chcker = quoteChars.every((Element) => {
      return Element.classList.contains("success");
    });
    // end test if all the characters are correct
    if (chcker) {
      // console.log("ok");
      displayResult();
    }
  });
});
// update timer on screen 
const updateTimer = () =>{
    if(timer == 0){
        displayResult();
        
    }else{
        document.querySelector("#timer").innerHTML=`<span id="timer">${--time}s</span>`;
    
    }
}
// sets timer
const timeReduce=()=>{
    time= 60;
    timer = setInterval(updateTimer, 1000);
}


// end test
const displayResult=()=>{
    //  display result div
    document.querySelector(".result").style.display="block";

    clearInterval(timer);
    document.querySelector("#stop_test").style.display = "none";
    userInput.disabled=true;

    let timeTaken = 1;
    if(time != 0){
        timeTaken =( 60-time)/100;
    }
    document.querySelector("#wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";

    document.querySelector("#accuracy").innerHTML = Math.round(((userInput.value.length - mistakes) / userInput.value.length)*100) +"%";
}



// implement start test
const startTest = () => {
  mistakes = 0;
  timer = " ";
  userInput.disabled = false;
  // timer reduce 
  timeReduce();
  document.querySelector("#start_test").style.display = "none";
  document.querySelector("#stop_test").style.display = "block";
};

window.onload = () => {
  userInput.value = "";
  document.querySelector("#start_test").style.display = "block";
  document.querySelector("#stop_test").style.display = "none";

  userInput.disabled = true;
  renderNewQuote();
};


