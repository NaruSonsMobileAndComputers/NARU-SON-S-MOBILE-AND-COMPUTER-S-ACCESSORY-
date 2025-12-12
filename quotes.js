// NARU SON'S Smart Repair Quote Logic
const REPAIR_DATA = {
    "iPhone": {
        "Motherboard issue": "Complex Device Warning",
        "Display Replacement": "₹900-1000 (Local) and ₹1200–₹1500 (Good to Guarantee quality)",
        "Touch Glass Replacement": "₹250–₹300 (Non-curved)",
        "Battery Replacement": "₹700–₹1200",
        "Speaker / Mic": "₹100–₹300",
        "Charging Port / Jack": "₹100-200 (Only Jack) and ₹450-500 (Full Charging PCB)"
    },
    "In Display Fingerprint Android": {
        "Motherboard issue": "Complex Device Warning",
        "Display Replacement": "₹900-1000 (Local) and ₹1200–₹1500 (Good to Guarantee quality)",
        "Touch Glass Replacement": "₹250–₹300 (Non-curved)",
        "Battery Replacement": "₹700–₹1200",
        "Speaker / Mic": "₹100–₹300",
        "Charging Port / Jack": "₹100-200 (Only Jack) and ₹450-500 (Full Charging PCB)"
    },
    "Other Devices": {
        "Display Replacement": "₹900-1000 (Local) and ₹1200–₹1500 (Good to Guarantee quality)",
        "Touch Glass Replacement": "₹250–₹300 (Non-curved)",
        "Battery Replacement": "₹700–₹1200",
        "Speaker / Mic": "₹100–₹300",
        "Charging Port / Jack": "₹100-200 (Only Jack) and ₹450-500 (Full Charging PCB)",
        "Motherboard issue": "Price generally high. Please contact us for accurate quote."
    }
};

const WHATSAPP_NUMBER = "9996609176";

function updateProblems() {
    const deviceSelect = document.getElementById('deviceType');
    const problemSelect = document.getElementById('problemType');
    const selectedDevice = deviceSelect.value;
    
    problemSelect.innerHTML = '<option value="">-- Select Problem --</option>';

    if (selectedDevice && REPAIR_DATA[selectedDevice]) {
        Object.keys(REPAIR_DATA[selectedDevice]).forEach(problem => {
            const option = document.createElement('option');
            option.value = problem;
            option.textContent = problem;
            problemSelect.appendChild(option);
        });
    }
    document.getElementById('result').innerHTML = '';
}

function getQuote() {
    const device = document.getElementById('deviceType').value;
    const problem = document.getElementById('problemType').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!device || !problem) {
        resultDiv.innerHTML = '<p class="warning">Please select both Device Type and Problem to get an estimate.</p>';
        return;
    }

    const quote = REPAIR_DATA[device][problem];
    let output = '';

    if (quote === "Complex Device Warning") {
        output = `
            <div class="complex-warning">
                <h3>⚠️ Complex Device Warning ⚠️</h3>
                <p>Your device category (**${device}**) requires an expert evaluation. Due to the high complexity and varying part costs, **I strongly recommend contacting us on WhatsApp for a final, accurate price quote.**</p>
                <p>WhatsApp Number: <strong>${WHATSAPP_NUMBER}</strong></p>
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20a%20quote%20for%20a%20${device}%20with%20a%20Motherboard%20issue." target="_blank" class="whatsapp-btn">Chat on WhatsApp</a>
            </div>
        `;
    } else {
        output = `
            <div class="quote-result">
                <h3>Estimated Price Range</h3>
                <p><strong>${problem}</strong> for your **${device}**:</p>
                <p class="price-range">${quote}</p>
                <p class="note">Please note that this is an estimate. Final price will be confirmed after physical inspection.</p>
                <a href="https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I%20need%20a%20quote%20for%20${problem}%20on%20a%20${device}." target="_blank" class="whatsapp-btn">Get Final Price on WhatsApp</a>
            </div>
        `;
    }

    resultDiv.innerHTML = output;
}

// Initialise problem list on load
window.onload = updateProblems;
