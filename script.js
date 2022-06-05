const quoteText = document.querySelector(".quote")
quoteBtn = document.querySelector(".quote-btn")
authorName = document.querySelector(".name")
copyBtn = document.querySelector(".copy")
speechBtn = document.querySelector(".speech")
copiedAlert = document.querySelector(".copied")
synth = speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch ("http://api.quotable.io/random").then(response => response.json())
  .then( result => {
    quoteText.innerText = '"'+ result.content + '"';
    authorName.innerText = result.author;
    quoteBtn.innerText = "New Quote";
    quoteBtn.classList.remove("loading");
  });
}

speechBtn.addEventListener ("click", () => {
  if(!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance (`${quoteText.innerText} 
    by (${authorName.innerText})`);
    synth.speak(utterance);
  }
})

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
  copiedAlert.classList.add("copied-visible");
  setTimeout(() => {
    copiedAlert.classList.remove("copied-visible");
  }, 1000)

});

quoteBtn.addEventListener ("click", randomQuote);