// Get the grid and cells
const grid = document.getElementById("grid");
const cells = Array.from(grid.getElementsByClassName("cell"));

let intervalId = null;

// Function to move cursor to a random cell
function moveCursor() {
  // Remove active class from all cells
  cells.forEach((cell) => cell.classList.remove("active"));

  // Get a random cell index
  const randomIndex = Math.floor(Math.random() * cells.length);

  // Add active class to the random cell
  cells[randomIndex].classList.add("active");

  // Scroll to the selected cell
  const selectedCell = cells[randomIndex];
  selectedCell.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Function to trigger fireworks effect
// Function to trigger confetti effect
function triggerConfetti() {
 const duration = 60 * 60 * 1000,
   animationEnd = Date.now() + duration,
   defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0 };

 function randomInRange(min, max) {
   return Math.random() * (max - min) + min;
 }

 const interval = setInterval(function () {
   const timeLeft = animationEnd - Date.now();

   if (timeLeft <= 0) {
     return clearInterval(interval);
   }

   const particleCount = 20 * (timeLeft / duration);

   // since particles fall down, start a bit higher than random
   confetti(
     Object.assign({}, defaults, {
       particleCount,
       origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
     })
   );
   confetti(
     Object.assign({}, defaults, {
       particleCount,
       origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
     })
   );
 }, 250);

}

// Start button click event listener
document.getElementById("startButton").addEventListener("click", function () {
  this.classList.add("buttonChange");
  // Clear the previous interval if it exists
  clearInterval(intervalId);

  // Start moving the cursor every second
  intervalId = setInterval(moveCursor, 1000);
});

// Stop button click event listener
document.getElementById("stopButton").addEventListener("click", function () {
  // Clear the interval to stop the cursor movement
  clearInterval(intervalId);

  // Zoom in animation for the active cell
  const activeCell = document.querySelector(".cell.active");
  //   activeCell.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], {
  //     duration: 1000,
  //     easing: 'ease-in-out'
  //   });

  // Trigger fireworks effect
  triggerConfetti();
});
