// Global variables
let selectedLocation = '';
let buttonClicked = '';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init("wITPHmw3N_X1QzhdZ");
} else {
    console.error("EmailJS library not loaded.");
}

// Step navigation functions
function showStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    // Show target step
    document.getElementById(stepId).classList.add('active');
}

// Moving button logic (giữ nguyên)
function moveButton() {
    var button = document.getElementById("ko");
    var maxX = window.innerWidth - button.offsetWidth - 20;
    var maxY = window.innerHeight - button.offsetHeight - 20;
    
    var randomX = Math.max(10, Math.floor(Math.random() * maxX));
    var randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    button.style.position = "fixed";
    button.style.left = randomX + "px";
    button.style.top = randomY + "px";
    button.style.zIndex = "1000";
}

// Event listeners for Step 1
document.getElementById("co").addEventListener("click", function() {
    buttonClicked = this.textContent;
    showStep('step2');
});

document.getElementById("chac_chan").addEventListener("click", function() {
    buttonClicked = this.textContent;
    showStep('step2');
});

document.getElementById("ko").addEventListener("mouseenter", moveButton);
document.getElementById("ko").addEventListener("click", function(e) {
    e.preventDefault();
    moveButton();
});

// Event listeners for Step 2
document.getElementById("co_y_tuong").addEventListener("click", function() {
    showStep('step3a');
});

document.getElementById("khong_y_tuong").addEventListener("click", function() {
    showStep('step3b');
});

// Event listeners for Step 3a (nhập địa chỉ)
document.getElementById("xac_nhan_dia_chi").addEventListener("click", function() {
    const diaChiInput = document.getElementById("dia_chi_cu_the").value.trim();
    if (diaChiInput) {
        selectedLocation = diaChiInput;
        document.getElementById("selected_location").textContent = `Địa chỉ: ${selectedLocation}`;
        showStep('step4');
    } else {
        alert("Vui lòng nhập địa chỉ!");
    }
});

// Event listeners for Step 3b (chọn quán)
document.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('click', function() {
        // Remove previous selections
        document.querySelectorAll('.restaurant-card').forEach(c => c.classList.remove('selected'));
        // Add selection to current card
        this.classList.add('selected');
        
        const name = this.dataset.name;
        const address = this.dataset.address;
        selectedLocation = `${name} - ${address}`;
        document.getElementById("selected_location").textContent = `Quán đã chọn: ${selectedLocation}`;
        
        // Auto proceed to step 4 after selection
        setTimeout(() => showStep('step4'), 500);
    });
});

// Event listeners for Step 4 (gửi email)
document.getElementById("gui_email").addEventListener("click", function() {
    const userEmail = document.getElementById("user_email").value.trim();
    
    if (!userEmail) {
        alert("Vui lòng nhập email!");
        return;
    }
    
    if (!selectedLocation) {
        alert("Vui lòng chọn địa điểm!");
        return;
    }

    // Send email using EmailJS
    emailjs.send("service_4ipt3ys", "template_71uc4eb", {
        user_email: userEmail,
        button_text: buttonClicked,
        user_input: selectedLocation
    }).then(
        function(response) {
            console.log("Email sent successfully", response.status, response.text);
            showStep('step5');
        },
        function(error) {
            console.error("Email sending failed", error);
            alert("Có lỗi xảy ra khi gửi email. Vui lòng thử lại!");
        }
    );
});

// Event listener for Step 5 (bắt đầu lại)
document.getElementById("bat_dau_lai").addEventListener("click", function() {
    // Reset data
    selectedLocation = '';
    buttonClicked = '';
    document.getElementById("dia_chi_cu_the").value = '';
    document.getElementById("user_email").value = '';
    document.getElementById("selected_location").textContent = '...';
    
    // Remove restaurant selections
    document.querySelectorAll('.restaurant-card').forEach(c => c.classList.remove('selected'));
    
    // Go back to step 1
    showStep('step1');
});

// Allow Enter key in inputs
document.getElementById("dia_chi_cu_the").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        document.getElementById("xac_nhan_dia_chi").click();
    }
});

document.getElementById("user_email").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        document.getElementById("gui_email").click();
    }
});
