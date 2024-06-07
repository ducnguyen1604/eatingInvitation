document.getElementById("ko").addEventListener("click", function() {
    var button = document.getElementById("ko");
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    
    var randomX = Math.floor(Math.random() * (screenWidth - button.offsetWidth));
    var randomY = Math.floor(Math.random() * (screenHeight - button.offsetHeight));
    
    button.style.position = "absolute";
    button.style.left = randomX + "px";
    button.style.top = randomY + "px";
});

// Add event listeners to buttons
document.getElementById("co").addEventListener("click", handleButtonClick);
document.getElementById("chac_chan").addEventListener("click", handleButtonClick);

// Function to handle button clicks
function handleButtonClick() {
    // Check which button was clicked
    var buttonText = this.textContent;

    // Prompt user for input
    var userInput = prompt("Tuyet voi, em muon di an o dau?");

    // Process the user input as needed
    if (userInput !== null && userInput !== "") {
        console.log("Button clicked: " + buttonText);
        console.log("User input: " + userInput);
        // Here you can perform further actions with the user input, like sending it to a server or processing it in some way
    }
}




