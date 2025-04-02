document.addEventListener('DOMContentLoaded', () => {
    const site1Input = document.getElementById('site1Input');
    const site2Input = document.getElementById('site2Input');
    const resultsList1 = document.getElementById('resultsList1');
    const resultsList2 = document.getElementById('resultsList2');
    const calculateBtn = document.getElementById('calculateBtn');
    const distanceSpan = document.getElementById('distance');
    const logContainer = document.getElementById('logContainer'); // Main container for log section
    const logEntriesContainer = document.getElementById('logEntries'); // Container for individual log <p> tags
    const clearLogBtn = document.getElementById('clearLogBtn');
    const totalMilesSpan = document.getElementById('totalMiles');
    const totalReimbursementSpan = document.getElementById('totalReimbursement');

    // Mileage data (remains the same)
    const mileageData = {
        "A.L. Conner": {"Alta": 8, "Citrus": 2, "District Op Ctr (DOC)": 12, "Dunlap/KCO Dunlap": 19, "ESC/SSC": 11, "Grant": 11, "Great Western": 10, "Jefferson": 11, "KCHS": 8, "KC Kids/ Lrng Ctr": 11, "Lincoln": 11, "McCord": 1, "Mtn View": 10, "Navelencia": 9, "OCHS": 2, "RHS/KCO/Adult": 11, "Riverview": 13, "RMCHS": 10, "Sheridan": 1, "Silas Bartsch": 10, "T.L. Reed": 11, "Transportation": 11, "Washington": 11},
        "Alta": {"A.L. Conner": 8, "Citrus": 6, "District Op Ctr (DOC)": 5, "Dunlap/KCO Dunlap": 27, "ESC/SSC": 4, "Grant": 4, "Great Western": 7, "Jefferson": 4, "KCHS": 3, "KC Kids/ Lrng Ctr": 4, "Lincoln": 3, "McCord": 7, "Mtn View": 3, "Navelencia": 6, "OCHS": 6, "RHS/KCO/Adult": 4, "Riverview": 6, "RMCHS": 4, "Sheridan": 6, "Silas Bartsch": 2, "T.L. Reed": 3, "Transportation": 4, "Washington": 4},
        "Citrus": {"A.L. Conner": 2, "Alta": 6, "District Op Ctr (DOC)": 9, "Dunlap/KCO Dunlap": 21, "ESC/SSC": 9, "Grant": 8, "Great Western": 10, "Jefferson": 8, "KCHS": 5, "KC Kids/ Lrng Ctr": 8, "Lincoln": 8, "McCord": 1.5, "Mtn View": 8, "Navelencia": 8, "OCHS": 0.5, "RHS/KCO/Adult": 9, "Riverview": 11, "RMCHS": 8, "Sheridan": 0.5, "Silas Bartsch": 8, "T.L. Reed": 9, "Transportation": 8, "Washington": 9},
        "District Op Ctr (DOC)": {"A.L. Conner": 12, "Alta": 5, "Citrus": 9, "Dunlap/KCO Dunlap": 31, "ESC/SSC": 1, "Grant": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 6, "KC Kids/ Lrng Ctr": 1, "Lincoln": 1, "McCord": 12, "Mtn View": 1, "Navelencia": 11, "OCHS": 9, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 2, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 2, "Transportation": 1, "Washington": 0.5},
        "Dunlap/KCO Dunlap": {"A.L. Conner": 19, "Alta": 27, "Citrus": 21, "District Op Ctr (DOC)": 31, "ESC/SSC": 30, "Grant": 30, "Great Western": 26, "Jefferson": 29, "KCHS": 26, "KC Kids/ Lrng Ctr": 29, "Lincoln": 30, "McCord": 20, "Mtn View": 29, "Navelencia": 20, "OCHS": 21, "RHS/KCO/Adult": 30, "Riverview": 31, "RMCHS": 29, "Sheridan": 21, "Silas Bartsch": 29, "T.L. Reed": 30, "Transportation": 29, "Washington": 30},
        "ESC/SSC": {"A.L. Conner": 11, "Alta": 4, "Citrus": 9, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "Grant": 1, "Great Western": 5, "Jefferson": 2, "KCHS": 6, "KC Kids/ Lrng Ctr": 1, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 10, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 2, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 3, "T.L. Reed": 1, "Transportation": 1, "Washington": 1},
        "Grant": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 5, "KC Kids/ Lrng Ctr": 1, "Lincoln": 1, "McCord": 9, "Mtn View": 0.5, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 1, "Transportation": 2, "Washington": 1},
        "Great Western": {"A.L. Conner": 10, "Alta": 7, "Citrus": 10, "District Op Ctr (DOC)": 6, "Dunlap/KCO Dunlap": 26, "ESC/SSC": 5, "Grant": 6, "Jefferson": 7, "KCHS": 10, "KC Kids/ Lrng Ctr": 7, "Lincoln": 6, "McCord": 10, "Mtn View": 6, "Navelencia": 5, "OCHS": 10, "RHS/KCO/Adult": 5, "Riverview": 7, "RMCHS": 4, "Sheridan": 10, "Silas Bartsch": 8, "T.L. Reed": 4, "Transportation": 7, "Washington": 6},
        "Jefferson": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 2, "Grant": 1, "Great Western": 7, "KCHS": 4, "KC Kids/ Lrng Ctr": 0.5, "Lincoln": 1, "McCord": 10, "Mtn View": 2, "Navelencia": 10, "OCHS": 8, "RHS/KCO/Adult": 2, "Riverview": 4, "RMCHS": 2, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 2, "Transportation": 1, "Washington": 1},
        "KCHS": {"A.L. Conner": 8, "Alta": 3, "Citrus": 5, "District Op Ctr (DOC)": 6, "Dunlap/KCO Dunlap": 26, "ESC/SSC": 6, "Grant": 5, "Great Western": 10, "Jefferson": 4, "KC Kids/ Lrng Ctr": 4, "Lincoln": 5, "McCord": 7, "Mtn View": 5, "Navelencia": 8, "OCHS": 5, "RHS/KCO/Adult": 6, "Riverview": 8, "RMCHS": 6, "Sheridan": 6, "Silas Bartsch": 3, "T.L. Reed": 6, "Transportation": 3, "Washington": 5},
        "KC Kids/ Lrng Ctr": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 1, "Great Western": 7, "Jefferson": 0.5, "KCHS": 4, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 12, "OCHS": 8, "RHS/KCO/Adult": 2, "Riverview": 4, "RMCHS": 2, "Sheridan": 9, "Silas Bartsch": 1, "T.L. Reed": 2, "Transportation": 1, "Washington": 1},
        "Lincoln": {"A.L. Conner": 11, "Alta": 3, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 5, "KC Kids/ Lrng Ctr": 1, "McCord": 9, "Mtn View": 1, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 1, "Transportation": 2, "Washington": 1},
        "McCord": {"A.L. Conner": 1, "Alta": 7, "Citrus": 1.5, "District Op Ctr (DOC)": 12, "Dunlap/KCO Dunlap": 20, "ESC/SSC": 10, "Grant": 9, "Great Western": 10, "Jefferson": 10, "KCHS": 7, "KC Kids/ Lrng Ctr": 10, "Lincoln": 9, "Mtn View": 9, "Navelencia": 8, "OCHS": 2, "RHS/KCO/Adult": 10, "Riverview": 12, "RMCHS": 10, "Sheridan": 1, "Silas Bartsch": 9, "T.L. Reed": 10, "Transportation": 9, "Washington": 10},
        "Mtn View": {"A.L. Conner": 10, "Alta": 3, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 0.5, "Great Western": 6, "Jefferson": 2, "KCHS": 5, "KC Kids/ Lrng Ctr": 1, "Lincoln": 1, "McCord": 9, "Navelencia": 11, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 2, "Sheridan": 8, "Silas Bartsch": 1, "T.L. Reed": 1, "Transportation": 2, "Washington": 1},
        "Navelencia": {"A.L. Conner": 9, "Alta": 6, "Citrus": 8, "District Op Ctr (DOC)": 11, "Dunlap/KCO Dunlap": 20, "ESC/SSC": 10, "Grant": 9, "Great Western": 5, "Jefferson": 10, "KCHS": 8, "KC Kids/ Lrng Ctr": 12, "Lincoln": 9, "McCord": 8, "Mtn View": 11, "OCHS": 9, "RHS/KCO/Adult": 10, "Riverview": 12, "RMCHS": 9, "Sheridan": 8, "Silas Bartsch": 8, "T.L. Reed": 10, "Transportation": 9, "Washington": 11},
        "OCHS": {"A.L. Conner": 2, "Alta": 6, "Citrus": 0.5, "District Op Ctr (DOC)": 9, "Dunlap/KCO Dunlap": 21, "ESC/SSC": 8, "Grant": 8, "Great Western": 10, "Jefferson": 8, "KCHS": 5, "KC Kids/ Lrng Ctr": 8, "Lincoln": 8, "McCord": 2, "Mtn View": 8, "Navelencia": 9, "RHS/KCO/Adult": 9, "Riverview": 10, "RMCHS": 8, "Sheridan": 1, "Silas Bartsch": 8, "T.L. Reed": 8, "Transportation": 8, "Washington": 9},
        "RHS/KCO/Adult": {"A.L. Conner": 11, "Alta": 4, "Citrus": 9, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 5, "Jefferson": 2, "KCHS": 6, "KC Kids/ Lrng Ctr": 2, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 10, "OCHS": 9, "Riverview": 2, "RMCHS": 1, "Sheridan": 10, "Silas Bartsch": 3, "T.L. Reed": 1, "Transportation": 3, "Washington": 1},
        "Riverview": {"A.L. Conner": 13, "Alta": 6, "Citrus": 11, "District Op Ctr (DOC)": 3, "Dunlap/KCO Dunlap": 31, "ESC/SSC": 2, "Grant": 3, "Great Western": 7, "Jefferson": 4, "KCHS": 8, "KC Kids/ Lrng Ctr": 4, "Lincoln": 3, "McCord": 12, "Mtn View": 3, "Navelencia": 12, "OCHS": 10, "RHS/KCO/Adult": 2, "RMCHS": 2, "Sheridan": 11, "Silas Bartsch": 6, "T.L. Reed": 3, "Transportation": 4, "Washington": 3},
        "RMCHS": {"A.L. Conner": 10, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 2, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 1, "Great Western": 4, "Jefferson": 2, "KCHS": 6, "KC Kids/ Lrng Ctr": 2, "Lincoln": 1, "McCord": 10, "Mtn View": 2, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 2, "Sheridan": 8, "Silas Bartsch": 2, "T.L. Reed": 1, "Transportation": 3, "Washington": 1},
        "Sheridan": {"A.L. Conner": 1, "Alta": 6, "Citrus": 0.5, "District Op Ctr (DOC)": 9, "Dunlap/KCO Dunlap": 21, "ESC/SSC": 9, "Grant": 9, "Great Western": 10, "Jefferson": 9, "KCHS": 6, "KC Kids/ Lrng Ctr": 9, "Lincoln": 9, "McCord": 1, "Mtn View": 8, "Navelencia": 8, "OCHS": 1, "RHS/KCO/Adult": 10, "Riverview": 11, "RMCHS": 8, "Silas Bartsch": 9, "T.L. Reed": 9, "Transportation": 9, "Washington": 9},
        "Silas Bartsch": {"A.L. Conner": 10, "Alta": 2, "Citrus": 8, "District Op Ctr (DOC)": 2, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 3, "Grant": 2, "Great Western": 8, "Jefferson": 2, "KCHS": 3, "KC Kids/ Lrng Ctr": 1, "Lincoln": 2, "McCord": 9, "Mtn View": 1, "Navelencia": 8, "OCHS": 8, "RHS/KCO/Adult": 3, "Riverview": 6, "RMCHS": 2, "Sheridan": 9, "T.L. Reed": 3, "Transportation": 1, "Washington": 3},
        "T.L. Reed": {"A.L. Conner": 11, "Alta": 3, "Citrus": 9, "District Op Ctr (DOC)": 2, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 4, "Jefferson": 2, "KCHS": 6, "KC Kids/ Lrng Ctr": 2, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 10, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 3, "Transportation": 2, "Washington": 2},
        "Transportation": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 2, "Great Western": 7, "Jefferson": 1, "KCHS": 3, "KC Kids/ Lrng Ctr": 1, "Lincoln": 2, "McCord": 9, "Mtn View": 2, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 3, "Riverview": 4, "RMCHS": 3, "Sheridan": 9, "Silas Bartsch": 1, "T.L. Reed": 2, "Washington": 2},
        "Washington": {"A.L. Conner": 11, "Alta": 4, "Citrus": 9, "District Op Ctr (DOC)": 0.5, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 5, "KC Kids/ Lrng Ctr": 1, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 11, "OCHS": 9, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 3, "T.L. Reed": 2, "Transportation": 2}
    };
const siteNames = Object.keys(mileageData);

const IRS_RATE_2025 = 0.685;
let currentTotalMiles = 0.0;

// Function to update the totals display
function updateTotalsDisplay() {
    totalMilesSpan.textContent = currentTotalMiles.toFixed(1); // Keep one decimal place for miles
    const reimbursement = currentTotalMiles * IRS_RATE_2025;
    totalReimbursementSpan.textContent = reimbursement.toFixed(2); // Two decimal places for currency
}

const IRS_RATE_2025 = 0.685;
let currentTotalMiles = 0.0;

// Function to update the totals display
function updateTotalsDisplay() {
    totalMilesSpan.textContent = currentTotalMiles.toFixed(1); // Keep one decimal place for miles
    const reimbursement = currentTotalMiles * IRS_RATE_2025;
    totalReimbursementSpan.textContent = reimbursement.toFixed(2); // Two decimal places for currency
}

const siteCodes = {
    "A.L. Conner": "ALC",
    "Alta": "Alta",
    "Citrus": "Citrus",
    "District Op Ctr (DOC)": "DOC",
    "Dunlap/KCO Dunlap": "Dunlap/KCO Dunlap",
    "ESC/SSC": "ESC/SSC",
    "Grant": "Grant",
    "Great Western": "GW",
    "Jefferson": "Jefferson",
    "KCHS": "KCHS",
    "KC Kids/ Lrng Ctr": "KC Kids/Lrng Ctr",
    "Lincoln": "Lincoln",
    "McCord": "McCord",
    "Mtn View": "Mtn View",
    "Navelencia": "Navel",
    "OCHS": "OCHS",
    "RHS/KCO/Adult": "RHS/KCO/Adult",
    "Riverview": "Riverview",
    "RMCHS": "RMCHS",
    "Sheridan": "Sheridan",
    "Silas Bartsch": "Silas Bartsch",
    "T.L. Reed": "TL Reed",
    "Transportation": "Transportation",
    "Washington": "Washington"
};


    // --- Autocomplete Logic ---
    function setupAutocomplete(inputEl, resultsEl) {
        inputEl.addEventListener('input', () => {
            const inputText = inputEl.value.toLowerCase();
            resultsEl.innerHTML = ''; // Clear previous results
            resultsEl.style.display = 'none'; // Hide by default

            if (inputText.length === 0) {
                return; // Don't show list if input is empty
            }

            const filteredSites = siteNames.filter(site =>
                site.toLowerCase().includes(inputText)
            );

            if (filteredSites.length > 0) {
                filteredSites.forEach(site => {
                    const div = document.createElement('div');
                    div.textContent = site;
                    div.addEventListener('click', () => {
                        inputEl.value = site; // Set input value on click
                        resultsEl.innerHTML = ''; // Clear results
                        resultsEl.style.display = 'none'; // Hide list
                    });
                    resultsEl.appendChild(div);
                });
                resultsEl.style.display = 'block'; // Show results list
            }
        });

        // Hide results when clicking outside
        document.addEventListener('click', (event) => {
            if (!inputEl.contains(event.target) && !resultsEl.contains(event.target)) {
                resultsEl.style.display = 'none';
            }
        });

         // Optional: Hide results on blur, but with a delay to allow clicks
         inputEl.addEventListener('blur', () => {
            setTimeout(() => {
                 if (!resultsEl.matches(':hover')) { // Hide only if mouse isn't over the results
                     resultsEl.style.display = 'none';
                 }
            }, 150); // Delay in ms
         });

         // Show list on focus if there's already text
         inputEl.addEventListener('focus', () => {
             if (inputEl.value.length > 0) {
                 // Trigger input event handler to potentially show list
                 inputEl.dispatchEvent(new Event('input'));
             }
         });
    }

    setupAutocomplete(site1Input, resultsList1);
    setupAutocomplete(site2Input, resultsList2);
    // --- End Autocomplete Logic ---


    // Add event listener to calculate button
    calculateBtn.addEventListener('click', () => {
        const site1 = site1Input.value; // Use input value
        const site2 = site2Input.value; // Use input value
        let distance = '--';

        // Validate that the entered values are actual site names
        if (siteNames.includes(site1) && siteNames.includes(site2)) {
            if (site1 === site2) {
                distance = 0;
            } else if (mileageData[site1] && mileageData[site1][site2] !== undefined) {
                distance = mileageData[site1][site2];
            } else if (mileageData[site2] && mileageData[site2][site1] !== undefined) {
                distance = mileageData[site2][site1];
            }

            // Log the calculation if a valid distance was found
            if (distance !== '--') {
                // Use predefined codes instead of initials
                const code1 = siteCodes[site1] || site1; // Fallback to full name if code not found
                const code2 = siteCodes[site2] || site2; // Fallback to full name if code not found
                const logMessage = `${code1}-${code2} - ${distance} miles`;

                const logEntry = document.createElement('p');
                logEntry.textContent = logMessage;
                logEntriesContainer.insertBefore(logEntry, logEntriesContainer.firstChild); // Prepend to logEntries div

                // Add distance to total and update display
                currentTotalMiles += Number(distance); // Ensure distance is treated as a number
                updateTotalsDisplay();
            }
        } else {
            console.warn("Invalid site name entered for calculation.");
            distance = 'Invalid Input';
        }

        distanceSpan.textContent = distance;
    });

    // Add event listener to clear log button
    clearLogBtn.addEventListener('click', () => {
        // Clear the visual log entries
        logEntriesContainer.innerHTML = '';

        // Reset the total miles and update the display
        currentTotalMiles = 0.0;
        updateTotalsDisplay();
    });
});

// Initial call to set totals display to 0
updateTotalsDisplay();