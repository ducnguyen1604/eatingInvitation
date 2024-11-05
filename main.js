// Check if EmailJS is loaded before initializing
if (typeof emailjs !== 'undefined') {
    emailjs.init("t476DxMCZVALgK75l"); // Replace with your actual Public Key
} else {
    console.error("EmailJS library not loaded. Please check the script URL or network connection.");
}

// Event listener for moving button
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
    // Ensure emailjs is defined before trying to use it
    if (typeof emailjs === 'undefined') {
        console.error("EmailJS is not defined when the button is clicked.");
        alert("Failed to load EmailJS. Please try again later.");
        return;
    }

    // Get the clicked button's text
    var buttonText = this.textContent;

    // Prompt the user for input
    var userInput = prompt("Tuyet voi, em muon di an o dau?");
    var userEmail = prompt("Nhap email cua em zo day ne:");

    // Process the user input and email input
    if (userInput && userEmail) {
        console.log("Button clicked: " + buttonText);
        console.log("User input: " + userInput);
        console.log("User email: " + userEmail);

        // Send email using EmailJS
        emailjs.send("", "", {
            user_email: userEmail,
            button_text: buttonText,
            user_input: userInput
        }).then(
            function(response) {
                alert("Email sent successfully!");
                console.log("Email sent successfully", response.status, response.text);
            },
            function(error) {
                alert("Failed to send email.");
                console.error("Email sending failed", error);
            }
        );
    } else {
        alert("Please provide all inputs.");
    }
}
