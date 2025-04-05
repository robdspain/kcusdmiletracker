document.addEventListener('DOMContentLoaded', () => {
    const site1Input = document.getElementById('site1Input');
    const site2Input = document.getElementById('site2Input');
    const resultsList1 = document.getElementById('resultsList1');
    const resultsList2 = document.getElementById('resultsList2');
    const distanceSpan = document.getElementById('distance');
    const logContainer = document.getElementById('logContainer'); // Main container for log section
    const logEntriesContainer = document.getElementById('logEntries'); // Container for individual log <p> tags
    const clearLogBtn = document.getElementById('clearLogBtn');
    const totalMilesSpan = document.getElementById('totalMiles');
    const totalReimbursementSpan = document.getElementById('totalReimbursement');
    const swapBtn = document.getElementById('swapBtn'); // Get the swap button
    const dateInput = document.getElementById('dateInput'); // Get the date input
    const nextDayBtn = document.getElementById('nextDayBtn'); // Get the next day button
    const logTripBtn = document.getElementById('logTripBtn'); // Get the log trip button
    const copyLogBtn = document.getElementById('copyLogBtn'); // Get the copy log button
    const instructionsLink = document.getElementById('instructionsLink'); // Get the instructions link
    // Mileage data with "KC Kids/ Learning Center" updated
    const mileageData = {
        "A.L. Conner": {"Alta": 8, "Citrus": 2, "District Op Ctr (DOC)": 12, "Dunlap/KCO Dunlap": 19, "ESC/SSC": 11, "Grant": 11, "Great Western": 10, "Jefferson": 11, "KCHS": 8, "KC Kids/ Learning Center": 11, "Lincoln": 11, "McCord": 1, "Mtn View": 10, "Navelencia": 9, "OCHS": 2, "RHS/KCO/Adult": 11, "Riverview": 13, "RMCHS": 10, "Sheridan": 1, "Silas Bartsch": 10, "T.L. Reed": 11, "Transportation": 11, "Washington": 11},
        "Alta": {"A.L. Conner": 8, "Citrus": 6, "District Op Ctr (DOC)": 5, "Dunlap/KCO Dunlap": 27, "ESC/SSC": 4, "Grant": 4, "Great Western": 7, "Jefferson": 4, "KCHS": 3, "KC Kids/ Learning Center": 4, "Lincoln": 3, "McCord": 7, "Mtn View": 3, "Navelencia": 6, "OCHS": 6, "RHS/KCO/Adult": 4, "Riverview": 6, "RMCHS": 4, "Sheridan": 6, "Silas Bartsch": 2, "T.L. Reed": 3, "Transportation": 4, "Washington": 4},
        "Citrus": {"A.L. Conner": 2, "Alta": 6, "District Op Ctr (DOC)": 9, "Dunlap/KCO Dunlap": 21, "ESC/SSC": 9, "Grant": 8, "Great Western": 10, "Jefferson": 8, "KCHS": 5, "KC Kids/ Learning Center": 8, "Lincoln": 8, "McCord": 1.5, "Mtn View": 8, "Navelencia": 8, "OCHS": 0.5, "RHS/KCO/Adult": 9, "Riverview": 11, "RMCHS": 8, "Sheridan": 0.5, "Silas Bartsch": 8, "T.L. Reed": 9, "Transportation": 8, "Washington": 9},
        "District Op Ctr (DOC)": {"A.L. Conner": 12, "Alta": 5, "Citrus": 9, "Dunlap/KCO Dunlap": 31, "ESC/SSC": 1, "Grant": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 6, "KC Kids/ Learning Center": 1, "Lincoln": 1, "McCord": 12, "Mtn View": 1, "Navelencia": 11, "OCHS": 9, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 2, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 2, "Transportation": 1, "Washington": 0.5},
        "Dunlap/KCO Dunlap": {"A.L. Conner": 19, "Alta": 27, "Citrus": 21, "District Op Ctr (DOC)": 31, "ESC/SSC": 30, "Grant": 30, "Great Western": 26, "Jefferson": 29, "KCHS": 26, "KC Kids/ Learning Center": 29, "Lincoln": 30, "McCord": 20, "Mtn View": 29, "Navelencia": 20, "OCHS": 21, "RHS/KCO/Adult": 30, "Riverview": 31, "RMCHS": 29, "Sheridan": 21, "Silas Bartsch": 29, "T.L. Reed": 30, "Transportation": 29, "Washington": 30},
        "ESC/SSC": {"A.L. Conner": 11, "Alta": 4, "Citrus": 9, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "Grant": 1, "Great Western": 5, "Jefferson": 2, "KCHS": 6, "KC Kids/ Learning Center": 1, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 10, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 2, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 3, "T.L. Reed": 1, "Transportation": 1, "Washington": 1},
        "Grant": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 5, "KC Kids/ Learning Center": 1, "Lincoln": 1, "McCord": 9, "Mtn View": 0.5, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 1, "Transportation": 2, "Washington": 1},
        "Great Western": {"A.L. Conner": 10, "Alta": 7, "Citrus": 10, "District Op Ctr (DOC)": 6, "Dunlap/KCO Dunlap": 26, "ESC/SSC": 5, "Grant": 6, "Jefferson": 7, "KCHS": 10, "KC Kids/ Learning Center": 7, "Lincoln": 6, "McCord": 10, "Mtn View": 6, "Navelencia": 5, "OCHS": 10, "RHS/KCO/Adult": 5, "Riverview": 7, "RMCHS": 4, "Sheridan": 10, "Silas Bartsch": 8, "T.L. Reed": 4, "Transportation": 7, "Washington": 6},
        "Jefferson": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 2, "Grant": 1, "Great Western": 7, "KCHS": 4, "KC Kids/ Learning Center": 0.5, "Lincoln": 1, "McCord": 10, "Mtn View": 2, "Navelencia": 10, "OCHS": 8, "RHS/KCO/Adult": 2, "Riverview": 4, "RMCHS": 2, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 2, "Transportation": 1, "Washington": 1},
        "KCHS": {"A.L. Conner": 8, "Alta": 3, "Citrus": 5, "District Op Ctr (DOC)": 6, "Dunlap/KCO Dunlap": 26, "ESC/SSC": 6, "Grant": 5, "Great Western": 10, "Jefferson": 4, "KC Kids/ Learning Center": 4, "Lincoln": 5, "McCord": 7, "Mtn View": 5, "Navelencia": 8, "OCHS": 5, "RHS/KCO/Adult": 6, "Riverview": 8, "RMCHS": 6, "Sheridan": 6, "Silas Bartsch": 3, "T.L. Reed": 6, "Transportation": 3, "Washington": 5},
        "KC Kids/ Learning Center": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 1, "Great Western": 7, "Jefferson": 0.5, "KCHS": 4, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 12, "OCHS": 8, "RHS/KCO/Adult": 2, "Riverview": 4, "RMCHS": 2, "Sheridan": 9, "Silas Bartsch": 1, "T.L. Reed": 2, "Transportation": 1, "Washington": 1},
        "Lincoln": {"A.L. Conner": 11, "Alta": 3, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 5, "KC Kids/ Learning Center": 1, "McCord": 9, "Mtn View": 1, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 2, "T.L. Reed": 1, "Transportation": 2, "Washington": 1},
        "McCord": {"A.L. Conner": 1, "Alta": 7, "Citrus": 1.5, "District Op Ctr (DOC)": 12, "Dunlap/KCO Dunlap": 20, "ESC/SSC": 10, "Grant": 9, "Great Western": 10, "Jefferson": 10, "KCHS": 7, "KC Kids/ Learning Center": 10, "Lincoln": 9, "Mtn View": 9, "Navelencia": 8, "OCHS": 2, "RHS/KCO/Adult": 10, "Riverview": 12, "RMCHS": 10, "Sheridan": 1, "Silas Bartsch": 9, "T.L. Reed": 10, "Transportation": 9, "Washington": 10},
        "Mtn View": {"A.L. Conner": 10, "Alta": 3, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 0.5, "Great Western": 6, "Jefferson": 2, "KCHS": 5, "KC Kids/ Learning Center": 1, "Lincoln": 1, "McCord": 9, "Navelencia": 11, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 2, "Sheridan": 8, "Silas Bartsch": 1, "T.L. Reed": 1, "Transportation": 2, "Washington": 1},
        "Navelencia": {"A.L. Conner": 9, "Alta": 6, "Citrus": 8, "District Op Ctr (DOC)": 11, "Dunlap/KCO Dunlap": 20, "ESC/SSC": 10, "Grant": 9, "Great Western": 5, "Jefferson": 10, "KCHS": 8, "KC Kids/ Learning Center": 12, "Lincoln": 9, "McCord": 8, "Mtn View": 11, "OCHS": 9, "RHS/KCO/Adult": 10, "Riverview": 12, "RMCHS": 9, "Sheridan": 8, "Silas Bartsch": 8, "T.L. Reed": 10, "Transportation": 9, "Washington": 11},
        "OCHS": {"A.L. Conner": 2, "Alta": 6, "Citrus": 0.5, "District Op Ctr (DOC)": 9, "Dunlap/KCO Dunlap": 21, "ESC/SSC": 8, "Grant": 8, "Great Western": 10, "Jefferson": 8, "KCHS": 5, "KC Kids/ Learning Center": 8, "Lincoln": 8, "McCord": 2, "Mtn View": 8, "Navelencia": 9, "RHS/KCO/Adult": 9, "Riverview": 10, "RMCHS": 8, "Sheridan": 1, "Silas Bartsch": 8, "T.L. Reed": 8, "Transportation": 8, "Washington": 9},
        "RHS/KCO/Adult": {"A.L. Conner": 11, "Alta": 4, "Citrus": 9, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 5, "Jefferson": 2, "KCHS": 6, "KC Kids/ Learning Center": 2, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 10, "OCHS": 9, "Riverview": 2, "RMCHS": 1, "Sheridan": 10, "Silas Bartsch": 3, "T.L. Reed": 1, "Transportation": 3, "Washington": 1},
        "Riverview": {"A.L. Conner": 13, "Alta": 6, "Citrus": 11, "District Op Ctr (DOC)": 3, "Dunlap/KCO Dunlap": 31, "ESC/SSC": 2, "Grant": 3, "Great Western": 7, "Jefferson": 4, "KCHS": 8, "KC Kids/ Learning Center": 4, "Lincoln": 3, "McCord": 12, "Mtn View": 3, "Navelencia": 12, "OCHS": 10, "RHS/KCO/Adult": 2, "RMCHS": 2, "Sheridan": 11, "Silas Bartsch": 6, "T.L. Reed": 3, "Transportation": 4, "Washington": 3},
        "RMCHS": {"A.L. Conner": 10, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 2, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 1, "Great Western": 4, "Jefferson": 2, "KCHS": 6, "KC Kids/ Learning Center": 2, "Lincoln": 1, "McCord": 10, "Mtn View": 2, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 2, "Sheridan": 8, "Silas Bartsch": 2, "T.L. Reed": 1, "Transportation": 3, "Washington": 1},
        "Sheridan": {"A.L. Conner": 1, "Alta": 6, "Citrus": 0.5, "District Op Ctr (DOC)": 9, "Dunlap/KCO Dunlap": 21, "ESC/SSC": 9, "Grant": 9, "Great Western": 10, "Jefferson": 9, "KCHS": 6, "KC Kids/ Learning Center": 9, "Lincoln": 9, "McCord": 1, "Mtn View": 8, "Navelencia": 8, "OCHS": 1, "RHS/KCO/Adult": 10, "Riverview": 11, "RMCHS": 8, "Silas Bartsch": 9, "T.L. Reed": 9, "Transportation": 9, "Washington": 9},
        "Silas Bartsch": {"A.L. Conner": 10, "Alta": 2, "Citrus": 8, "District Op Ctr (DOC)": 2, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 3, "Grant": 2, "Great Western": 8, "Jefferson": 2, "KCHS": 3, "KC Kids/ Learning Center": 1, "Lincoln": 2, "McCord": 9, "Mtn View": 1, "Navelencia": 8, "OCHS": 8, "RHS/KCO/Adult": 3, "Riverview": 6, "RMCHS": 2, "Sheridan": 9, "T.L. Reed": 3, "Transportation": 1, "Washington": 3},
        "T.L. Reed": {"A.L. Conner": 11, "Alta": 3, "Citrus": 9, "District Op Ctr (DOC)": 2, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 4, "Jefferson": 2, "KCHS": 6, "KC Kids/ Learning Center": 2, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 10, "OCHS": 8, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 3, "Transportation": 2, "Washington": 2},
        "Transportation": {"A.L. Conner": 11, "Alta": 4, "Citrus": 8, "District Op Ctr (DOC)": 1, "Dunlap/KCO Dunlap": 29, "ESC/SSC": 1, "Grant": 2, "Great Western": 7, "Jefferson": 1, "KCHS": 3, "KC Kids/ Learning Center": 1, "Lincoln": 2, "McCord": 9, "Mtn View": 2, "Navelencia": 9, "OCHS": 8, "RHS/KCO/Adult": 3, "Riverview": 4, "RMCHS": 3, "Sheridan": 9, "Silas Bartsch": 1, "T.L. Reed": 2, "Washington": 2},
        "Washington": {"A.L. Conner": 11, "Alta": 4, "Citrus": 9, "District Op Ctr (DOC)": 0.5, "Dunlap/KCO Dunlap": 30, "ESC/SSC": 1, "Grant": 1, "Great Western": 6, "Jefferson": 1, "KCHS": 5, "KC Kids/ Learning Center": 1, "Lincoln": 1, "McCord": 10, "Mtn View": 1, "Navelencia": 11, "OCHS": 9, "RHS/KCO/Adult": 1, "Riverview": 3, "RMCHS": 1, "Sheridan": 9, "Silas Bartsch": 3, "T.L. Reed": 2, "Transportation": 2}
    };
    // Recalculate siteNames after updating mileageData
    const siteNames = Object.keys(mileageData);

    const IRS_RATE_2025 = 0.685;
    let currentTotalMiles = 0.0;
    let currentLoggableTrip = null; // Holds details {date, code1, code2, distance} for the currently displayed valid trip

    // --- Date Helper Functions ---
    // Formats a Date object as MM/DD/YY
    function formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of year
        return `${month}/${day}/${year}`;
    }

    // Formats a Date object as YYYY-MM-DD for the date input value
    function formatDateForInput(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    // --- End Date Helper Functions ---

    // Function to update the totals display
    function updateTotalsDisplay() {
        totalMilesSpan.textContent = currentTotalMiles.toFixed(1); // Keep one decimal place for miles
        const reimbursement = currentTotalMiles * IRS_RATE_2025;
        totalReimbursementSpan.textContent = reimbursement.toFixed(2); // Two decimal places for currency
    }

    // Updated siteCodes mapping
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
        "KC Kids/ Learning Center": "KC Kids/LC", // Updated Key and Code
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

    // Create a reverse mapping from code to full site name for editing
    const codeToSiteName = Object.entries(siteCodes).reduce((acc, [name, code]) => {
        acc[code] = name;
        return acc;
    }, {});


    // --- Autocomplete Logic ---
    function setupAutocomplete(inputEl, resultsEl) {
        inputEl.addEventListener('input', () => {
            const inputText = inputEl.value.toLowerCase();
            resultsEl.innerHTML = ''; // Clear previous results
            resultsEl.style.display = 'none'; // Hide by default

            if (inputText.length === 0) {
                return; // Don't show list if input is empty
            }

            // Use the updated siteNames for filtering
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
                        // Trigger change event AFTER setting value to ensure calculation uses the new value
                        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
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

    // --- Automatic Distance Display Update ---
    function updateDistanceDisplay() {
        const site1 = site1Input.value;
        const site2 = site2Input.value;
        let distance = '--'; // Default display value
        currentLoggableTrip = null; // Reset loggable trip info by default

        // Only proceed if both inputs contain valid site names recognized by the system
        if (siteNames.includes(site1) && siteNames.includes(site2)) {
            if (site1 === site2) {
                distance = 0;
            } else if (mileageData[site1] && mileageData[site1][site2] !== undefined) {
                distance = mileageData[site1][site2];
            } else if (mileageData[site2] && mileageData[site2][site1] !== undefined) {
                distance = mileageData[site2][site1]; // Check reverse
            } else {
                 // This case should ideally not be reached if siteNames.includes check is robust
                 console.error("Mileage data missing for valid sites:", site1, site2);
                 distance = 'Error';
            }

            // If a valid numerical distance > 0 was found, store details for potential logging
            if (typeof distance === 'number' && distance > 0) {
                const code1 = siteCodes[site1] || site1;
                const code2 = siteCodes[site2] || site2;
                const currentDateValue = dateInput.value;
                let formattedDate = 'N/A';
                if (currentDateValue) {
                    const currentDate = new Date(currentDateValue + 'T00:00:00');
                    if (!isNaN(currentDate)) {
                        formattedDate = formatDate(currentDate);
                    }
                }
                // Store the details needed for logging
                currentLoggableTrip = {
                    date: formattedDate,
                    code1: code1,
                    code2: code2,
                    distance: distance
                };
            }
        } else {
            // If one or both inputs are not valid site names, reset distance display
            distance = '--';
        }

        // Update the distance display regardless of logging success
        // Show '0' if sites are the same, '--' if invalid/incomplete, or the calculated distance/Error
        distanceSpan.textContent = distance;
    }

    // Add event listeners to trigger display update when input values change
    site1Input.addEventListener('change', updateDistanceDisplay);
    site2Input.addEventListener('change', updateDistanceDisplay);
    dateInput.addEventListener('change', updateDistanceDisplay); // Add listener for date changes
    // --- End Automatic Distance Display Update ---

    // --- Manual Trip Logging ---
    logTripBtn.addEventListener('click', () => {
        if (currentLoggableTrip) {
            const { date, code1, code2, distance } = currentLoggableTrip;
            const logMessage = `${date} - ${code1}-${code2} - ${distance} miles`;

            // Check if this exact log entry already exists as the most recent one
            const firstLogEntry = logEntriesContainer.firstChild;
            if (!firstLogEntry || firstLogEntry.textContent !== logMessage) {
                const logEntry = document.createElement('p');
                // Store raw data for editing - Use YYYY-MM-DD for sorting
                const dateYYYYMMDD = formatDateForInput(new Date(dateInput.value + 'T00:00:00')); // Get YYYY-MM-DD
                logEntry.dataset.date = dateYYYYMMDD; // Store YYYY-MM-DD
                logEntry.dataset.code1 = code1;
                logEntry.dataset.code2 = code2;
                logEntry.dataset.distance = distance;

                // Create span for text
                const textSpan = document.createElement('span');
                textSpan.textContent = logMessage;
                textSpan.classList.add('log-entry-text'); // Add class for styling/selection

                // Create Edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit-log-btn'); // Add class for styling/selection
                editButton.addEventListener('click', () => handleEditLogEntry(logEntry));

                // Create Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-log-btn'); // Add class for styling/selection
                deleteButton.addEventListener('click', () => handleDeleteLogEntry(logEntry));

                logEntry.appendChild(textSpan);
                logEntry.appendChild(editButton);
                logEntry.appendChild(deleteButton); // Add the delete button

                // Find the correct insertion point based on date
                const existingEntries = logEntriesContainer.querySelectorAll('p');
                let inserted = false;
                for (const existingEntry of existingEntries) {
                    // Compare dates (YYYY-MM-DD format allows string comparison)
                    if (logEntry.dataset.date < existingEntry.dataset.date) {
                        logEntriesContainer.insertBefore(logEntry, existingEntry);
                        inserted = true;
                        break;
                    }
                }
                // If not inserted (meaning it's the latest date or log is empty), append it
                if (!inserted) {
                    logEntriesContainer.appendChild(logEntry);
                }

                currentTotalMiles += Number(distance);
                updateTotalsDisplay();

                // Clear the stored trip after logging to prevent accidental double-logging
                currentLoggableTrip = null;
            } else {
                console.log("Duplicate log entry prevented (manual log):", logMessage);
                // Optionally provide user feedback here (e.g., flash the button red)
            }
        } else {
            console.log("Log Trip button clicked, but no valid trip data to log.");
            // Optionally provide user feedback (e.g., shake the button)
        }
    });
    // --- End Manual Trip Logging ---

    // --- Edit Log Entry Logic ---
    function handleEditLogEntry(logEntryElement) {
        const { date: storedDateMMDDYY, code1, code2, distance: distanceStr } = logEntryElement.dataset;
        const distance = Number(distanceStr);

        if (isNaN(distance)) {
            console.error("Invalid distance found in log entry dataset:", distanceStr);
            return;
        }

        // 1. Subtract from totals
        currentTotalMiles -= distance;
        updateTotalsDisplay();

        // 2. Remove the entry from the display
        logEntryElement.remove();

        // 3. Repopulate the form
        // The stored date (originally named storedDateMMDDYY, but actually YYYY-MM-DD)
        // can be directly used for the input field's value.
        const storedDateYYYYMMDD = logEntryElement.dataset.date; // Correctly identify the format
        if (storedDateYYYYMMDD && /^\d{4}-\d{2}-\d{2}$/.test(storedDateYYYYMMDD)) {
             dateInput.value = storedDateYYYYMMDD; // Directly use the YYYY-MM-DD value
        } else {
             console.warn("Invalid or missing date in dataset for editing:", storedDateYYYYMMDD);
             // Optionally set to today or leave as is
             dateInput.value = formatDateForInput(new Date());
        }

        // Find full names from codes
        const site1Name = codeToSiteName[code1] || code1; // Fallback to code if name not found
        const site2Name = codeToSiteName[code2] || code2; // Fallback to code if name not found

        site1Input.value = site1Name;
        site2Input.value = site2Name;

        // 4. Trigger distance update for the repopulated fields
        updateDistanceDisplay();

        // Optional: Scroll to top or focus first input
        site1Input.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // --- End Edit Log Entry Logic ---

    // --- Delete Log Entry Logic ---
    function handleDeleteLogEntry(logEntryElement) {
        const { distance: distanceStr } = logEntryElement.dataset;
        const distance = Number(distanceStr);

        if (isNaN(distance)) {
            console.error("Invalid distance found in log entry dataset for deletion:", distanceStr);
            return;
        }

        // 1. Subtract from totals
        currentTotalMiles -= distance;
        updateTotalsDisplay();

        // 2. Remove the entry from the display
        logEntryElement.remove();
    }
    // --- End Delete Log Entry Logic ---

    // Add event listener to clear log button
    clearLogBtn.addEventListener('click', () => {
        // Clear the visual log entries
        logEntriesContainer.innerHTML = '';

        // Reset the total miles and update the display
        currentTotalMiles = 0.0;
        updateTotalsDisplay();
    });

    // Add event listener for the swap button
    swapBtn.addEventListener('click', () => {
        const tempValue = site1Input.value;
        site1Input.value = site2Input.value;
        site2Input.value = tempValue;

        // Optional: Clear any autocomplete suggestions after swapping
        resultsList1.innerHTML = '';
        resultsList1.style.display = 'none';
        resultsList2.innerHTML = '';
        resultsList2.style.display = 'none';

        // Trigger display update after swapping
        updateDistanceDisplay();
    });

    // Add event listener for the next day button
    nextDayBtn.addEventListener('click', () => {
        const currentDateValue = dateInput.value;
        if (!currentDateValue) {
            console.warn("Date input is empty.");
            // Optionally set to today if empty
            // setDateValue(new Date());
            return;
        }

        // Add T00:00:00 to ensure parsing happens in local time zone consistently
        let nextDate = new Date(currentDateValue + 'T00:00:00');
        if (isNaN(nextDate)) {
            console.error("Invalid date in input field.");
            // Optionally reset to today
            // setDateValue(new Date());
            return;
        }

        do {
            nextDate.setDate(nextDate.getDate() + 1); // Increment the day
            // getDay() returns 0 for Sunday, 6 for Saturday
        } while (nextDate.getDay() === 0 || nextDate.getDay() === 6);

        dateInput.value = formatDateForInput(nextDate); // Update the input field
        // Also update the display in case the date change affects loggable trip details (though it shouldn't directly)
        updateDistanceDisplay();
    });

    // --- Copy Log as Markdown ---
    copyLogBtn.addEventListener('click', () => {
        const logEntries = logEntriesContainer.querySelectorAll('p');
        if (logEntries.length === 0) {
            alert("Log is empty. Nothing to copy.");
            return;
        }

        let markdownString = "| Date     | Route       | Miles |\n";
        markdownString +=    "|----------|-------------|-------|\n";

        // Iterate directly as entries in the DOM are now sorted chronologically (YYYY-MM-DD)

        logEntries.forEach(entry => {
            const textSpan = entry.querySelector('.log-entry-text'); // Find the span within the paragraph
            const text = textSpan ? textSpan.textContent : ''; // Get text only from the span
            // Example format: "04/03/25 - ALC-Alta - 8 miles"
            const dateYYYYMMDD = entry.dataset.date; // Get YYYY-MM-DD from dataset
            const parts = text.split(' - '); // Still need route and miles from text
            if (parts.length === 3 && dateYYYYMMDD) {
                 // Reformat YYYY-MM-DD to MM/DD/YY for the table
                 const dateParts = dateYYYYMMDD.split('-');
                 const formattedDateMMDDYY = `${dateParts[1]}/${dateParts[2]}/${dateParts[0].slice(-2)}`;
                 const route = parts[1].trim();
                 const miles = parts[2].replace(' miles', '').trim();
                 markdownString += `| ${formattedDateMMDDYY} | ${route} | ${miles} |\n`;
            } else {
                console.warn("Could not parse log entry:", text);
            }
        });

        // Add totals row
        const totalMiles = totalMilesSpan.textContent;
        const totalReimbursement = totalReimbursementSpan.textContent;
        markdownString += `| **Total** |             | **${totalMiles}** |\n`;
        markdownString += `| **Est. Reimbursement ($${IRS_RATE_2025}/mile)** | | **$${totalReimbursement}** |\n`;


        navigator.clipboard.writeText(markdownString)
            .then(() => {
                // Optional: Provide feedback to the user
                const originalText = copyLogBtn.textContent;
                copyLogBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyLogBtn.textContent = originalText;
                }, 1500); // Reset text after 1.5 seconds
            })
            .catch(err => {
                console.error('Failed to copy log to clipboard: ', err);
                alert('Failed to copy log. See console for details.');
            });
    });
    // --- End Copy Log as Markdown ---

    // --- Instructions Link Logic ---
    instructionsLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the link from navigating

        const instructions = `
How to Paste Mileage Log into Google Docs:

1. Click the "Copy Log (MD)" button. This copies your mileage log to the clipboard in Markdown format.

2. Open your Google Doc.

3. Enable Markdown detection (you only need to do this once):
   - Go to the "Tools" menu.
   - Select "Preferences".
   - Check the box next to "Automatically detect Markdown".
   - Click "OK".

4. Paste the log:
   - Place your cursor where you want the table in your Google Doc.
   - Press Ctrl+V (or Cmd+V on Mac) to paste.

Google Docs should automatically convert the pasted Markdown text into a formatted table.
        `;

        alert(instructions); // Display instructions in a simple popup
    });
    // --- End Instructions Link Logic ---

    // --- Instructions Link Logic ---
    instructionsLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the link from navigating

        const instructions = `
How to Paste Mileage Log into Google Docs:

1. Click the "Copy Log (MD)" button. This copies your mileage log to the clipboard in Markdown format.

2. Open your Google Doc.

3. Enable Markdown detection (you only need to do this once):
   - Go to the "Tools" menu.
   - Select "Preferences".
   - Check the box next to "Automatically detect Markdown".
   - Click "OK".

4. Paste the log:
   - Place your cursor where you want the table in your Google Doc.
   - Press Ctrl+V (or Cmd+V on Mac) to paste.

Google Docs should automatically convert the pasted Markdown text into a formatted table.
        `;

        alert(instructions); // Display instructions in a simple popup
    });
    // --- End Instructions Link Logic ---



    // --- Initialization ---
    // Set initial date to today
    dateInput.value = formatDateForInput(new Date());

    // Initial call to set totals display to 0
    updateTotalsDisplay();
    distanceSpan.textContent = '--'; // Ensure distance display starts as '--'
    // --- End Initialization ---

});