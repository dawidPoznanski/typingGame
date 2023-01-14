// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const btnStart = document.getElementById('start');
const clock = document.querySelector('.time');
let quotes = [];
// Array for quotes
const getQuotes = fetch('https://zenquotes.io/api/quotes')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    return data;
  });
const printQuote = () => {
  getQuotes.then(a => {
    // Get random quote, show on screen and highligh firs word
    const randomIndex = Math.floor(Math.random() * 50);
    quotes = a[randomIndex];
    console.log(quotes);
    const { q } = quotes;
    words = q.split(' ');
    console.log(words);
    wordIndex = 0;
    const spanWords = words.map(word => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join('');
    console.log(quoteElement);
    quoteElement.childNodes[0].className = 'highlight';
    messageElement.innerText = '';
  });
};

// console.log(quotes);
// let quotes = getQoutes;
// const quotes = [
//   'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
//   'There is nothing more deceptive than an obvious fact.',
//   'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
//   'I never make exceptions. An exception disproves the rule.',
//   'What one man can invent another can discover.',
//   'Nothing clears up a case so much as stating it to another person.',
//   'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
// ];

// console.log(quotes);
let words = [];
let wordIndex = [];
// starting time
let startTime = Date.now();
// Clock
let counter = 0;
let interval = null;
clock.textContent = '00:00';
// Updating clock
timer = () => {
  counter++;

  let hrs = Math.floor(counter / 3600);
  let min = Math.floor((counter - hrs * 60 * 60) / 60);
  let sec = counter % 60;

  clock.textContent = `${min.toString().padStart(2, '0')}:${sec
    .toString()
    .padStart(2, '0')}`;
};
startTimer = () => {
  if (interval) {
    return;
  }
  interval = setInterval(timer, 1000);
};

stopTimer = () => {
  clearInterval(interval);
  interval = null;
  counter = 0;
};

btnStart.addEventListener('click', () => {
  printQuote();

  typedValueElement.value = '';
  typedValueElement.focus();

  // Start timer
  startTime = new Date().getTime();
  clock.textContent = '00:00';
  counter = 0;
  startTimer();
});
// Typig logic
typedValueElement.addEventListener('input', () => {
  // get current word
  const currWord = words[wordIndex];
  // get current value
  const typedValue = typedValueElement.value;

  if (typedValue === currWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
    stopTimer();
  } else if ((typedValue.endsWith(' ') && typedValue.trim()) === currWord) {
    typedValueElement.value = '';
    wordIndex++;

    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currWord.startsWith(typedValue)) {
    typedValueElement.classList = '';
  } else {
    typedValueElement.className = 'error';
  }
});
