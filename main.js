let controlBtns = document.querySelector(".control-buttons");
let startBtn = document.querySelector(".control-buttons span");
let name = document.querySelector(".name span");

// Start the game and get the username
startBtn.onclick = function () {
  let userName = prompt("What's Your Name?");

  if (userName === "" || userName === null) {
    name.innerHTML = "Unknown";
  } else {
    name.innerHTML = userName;
  }

  controlBtns.remove();
};

let duration = 1000;
let blocksContainer = document.querySelector(".game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderrange = [...Array(blocks.length).keys()];

console.log(orderrange)

// Order blocks randomly
shuffle(orderrange);

blocks.forEach((block, index) => {
  block.style.order = orderrange[index];

  // Click event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlipped = blocks.filter((flipped) =>
    flipped.classList.contains("is-flipped")
  );

  if (allFlipped.length === 2) {
    stopClicking();
    checkMatched(allFlipped[0], allFlipped[1]);
  }
}

function checkMatched(fBlock, sBlock) {
  let tries = document.querySelector(".tries span");

  if (fBlock.dataset.image === sBlock.dataset.image) {
    fBlock.classList.remove("is-flipped");
    sBlock.classList.remove("is-flipped");

    fBlock.classList.add("has-match");
    sBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    
    setTimeout(() => {
      fBlock.classList.remove("is-flipped");
      sBlock.classList.remove("is-flipped");
    }, duration);
    
    document.getElementById("fail").play();
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}
