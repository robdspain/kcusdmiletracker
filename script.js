document.addEventListener('DOMContentLoaded', () => {
    const MileageTracker = {
        // --- Constants ---
        IRS_RATE_2025: 0.685,
        AUTOCOMPLETE_DELAY: 150, // ms

        // --- DOM Elements ---
        elements: {
            site1Input: null,
            site2Input: null,
            resultsList1: null,
            resultsList2: null,
            distanceSpan: null,
            logEntriesContainer: null,
            clearLogBtn: null,
            totalMilesSpan: null,
            totalReimbursementSpan: null,
            swapBtn: null,
            dateInput: null,
            nextDayBtn: null,
            logTripBtn: null,
            copyLogBtn: null,
            instructionsLink: null,
        },

        // --- Data ---
        mileageData: {
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
        },
        siteCodes: {
            "A.L. Conner": "ALC", "Alta": "Alta", "Citrus": "Citrus", "District Op Ctr (DOC)": "DOC",
            "Dunlap/KCO Dunlap": "Dunlap/KCO Dunlap", "ESC/SSC": "ESC/SSC", "Grant": "Grant", "Great Western": "GW",
            "Jefferson": "Jefferson", "KCHS": "KCHS", "KC Kids/ Learning Center": "KC Kids/LC", "Lincoln": "Lincoln",
            "McCord": "McCord", "Mtn View": "Mtn View", "Navelencia": "Navel", "OCHS": "OCHS",
            "RHS/KCO/Adult": "RHS/KCO/Adult", "Riverview": "Riverview", "RMCHS": "RMCHS", "Sheridan": "Sheridan",
            "Silas Bartsch": "Silas Bartsch", "T.L. Reed": "TL Reed", "Transportation": "Transportation", "Washington": "Washington"
        },
        siteNames: [],
        codeToSiteName: {},

        // --- State ---
        currentTotalMiles: 0.0,
        currentLoggableTrip: null, // Holds details {date, code1, code2, distance} for the currently displayed valid trip

        // --- Initialization ---
        init() {
            this._selectElements();
            this._deriveData();
            this._setupEventListeners();
            this._setInitialDate();
            this.updateTotalsDisplay(); // Initial display
        },

        _selectElements() {
            this.elements.site1Input = document.getElementById('site1Input');
            this.elements.site2Input = document.getElementById('site2Input');
            this.elements.resultsList1 = document.getElementById('resultsList1');
            this.elements.resultsList2 = document.getElementById('resultsList2');
            this.elements.distanceSpan = document.getElementById('distance');
            this.elements.logEntriesContainer = document.getElementById('logEntries');
            this.elements.clearLogBtn = document.getElementById('clearLogBtn');
            this.elements.totalMilesSpan = document.getElementById('totalMiles');
            this.elements.totalReimbursementSpan = document.getElementById('totalReimbursement');
            this.elements.swapBtn = document.getElementById('swapBtn');
            this.elements.dateInput = document.getElementById('dateInput');
            this.elements.nextDayBtn = document.getElementById('nextDayBtn');
            this.elements.logTripBtn = document.getElementById('logTripBtn');
            this.elements.copyLogBtn = document.getElementById('copyLogBtn');
            this.elements.instructionsLink = document.getElementById('instructionsLink');
        },

        _deriveData() {
            this.siteNames = Object.keys(this.mileageData);
            this.codeToSiteName = Object.entries(this.siteCodes).reduce((acc, [name, code]) => {
                acc[code] = name;
                return acc;
            }, {});
        },

        _setInitialDate() {
            if (!this.elements.dateInput.value) {
                this.elements.dateInput.value = this.formatDateForInput(new Date());
            }
        },

        // --- Event Listener Setup ---
        _setupEventListeners() {
            // Autocomplete
            this.setupAutocomplete(this.elements.site1Input, this.elements.resultsList1);
            this.setupAutocomplete(this.elements.site2Input, this.elements.resultsList2);

            // Distance Update Triggers
            this.elements.site1Input.addEventListener('change', () => this.updateDistanceDisplay());
            this.elements.site2Input.addEventListener('change', () => this.updateDistanceDisplay());
            this.elements.dateInput.addEventListener('change', () => this.updateDistanceDisplay());

            // Button Actions
            this.elements.logTripBtn.addEventListener('click', () => this.logTrip());
            this.elements.clearLogBtn.addEventListener('click', () => this.clearLog());
            this.elements.swapBtn.addEventListener('click', () => this.swapSites());
            this.elements.nextDayBtn.addEventListener('click', () => this.goToNextWeekday());
            this.elements.copyLogBtn.addEventListener('click', () => this.copyLogAsMarkdown());
            this.elements.instructionsLink.addEventListener('click', (e) => this.showInstructions(e));

            // Global click listener for hiding autocomplete
            document.addEventListener('click', (event) => {
                if (!this.elements.site1Input.contains(event.target) && !this.elements.resultsList1.contains(event.target)) {
                    this.elements.resultsList1.style.display = 'none';
                }
                if (!this.elements.site2Input.contains(event.target) && !this.elements.resultsList2.contains(event.target)) {
                    this.elements.resultsList2.style.display = 'none';
                }
            });
        },

        // --- Date Helper Functions ---
        formatDate(date) {
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);
            return `${month}/${day}/${year}`;
        },

        formatDateForInput(date) {
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        },

        // --- Core Logic Methods ---
        updateTotalsDisplay() {
            this.elements.totalMilesSpan.textContent = this.currentTotalMiles.toFixed(1);
            const reimbursement = this.currentTotalMiles * this.IRS_RATE_2025;
            this.elements.totalReimbursementSpan.textContent = reimbursement.toFixed(2);
        },

        setupAutocomplete(inputEl, resultsEl) {
            inputEl.addEventListener('input', () => {
                const inputText = inputEl.value.toLowerCase();
                resultsEl.innerHTML = '';
                resultsEl.style.display = 'none';

                if (inputText.length === 0) return;

                const filteredSites = this.siteNames.filter(site =>
                    site.toLowerCase().includes(inputText)
                );

                if (filteredSites.length > 0) {
                    filteredSites.forEach(site => {
                        const div = document.createElement('div');
                        div.textContent = site;
                        div.addEventListener('click', () => {
                            inputEl.value = site;
                            resultsEl.innerHTML = '';
                            resultsEl.style.display = 'none';
                            inputEl.dispatchEvent(new Event('change', { bubbles: true }));
                        });
                        resultsEl.appendChild(div);
                    });
                    resultsEl.style.display = 'block';
                }
            });

            inputEl.addEventListener('blur', () => {
                setTimeout(() => {
                    if (!resultsEl.matches(':hover')) {
                        resultsEl.style.display = 'none';
                    }
                }, this.AUTOCOMPLETE_DELAY);
            });

            inputEl.addEventListener('focus', () => {
                if (inputEl.value.length > 0) {
                    inputEl.dispatchEvent(new Event('input'));
                }
            });
        },

        updateDistanceDisplay() {
            const site1 = this.elements.site1Input.value;
            const site2 = this.elements.site2Input.value;
            let distance = '--';
            this.currentLoggableTrip = null;

            if (this.siteNames.includes(site1) && this.siteNames.includes(site2)) {
                if (site1 === site2) {
                    distance = 0;
                } else if (this.mileageData[site1]?.[site2] !== undefined) {
                    distance = this.mileageData[site1][site2];
                } else if (this.mileageData[site2]?.[site1] !== undefined) {
                    distance = this.mileageData[site2][site1];
                } else {
                    console.error("Mileage data missing for valid sites:", site1, site2);
                    distance = 'Error';
                }

                if (typeof distance === 'number' && distance > 0) {
                    const code1 = this.siteCodes[site1] || site1;
                    const code2 = this.siteCodes[site2] || site2;
                    const currentDateValue = this.elements.dateInput.value;
                    let formattedDate = 'N/A';
                    if (currentDateValue) {
                        // Ensure date is parsed correctly, assuming local time
                        const dateParts = currentDateValue.split('-');
                        if (dateParts.length === 3) {
                            const year = parseInt(dateParts[0], 10);
                            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
                            const day = parseInt(dateParts[2], 10);
                            const currentDate = new Date(year, month, day);
                             if (!isNaN(currentDate)) {
                                formattedDate = this.formatDate(currentDate);
                            }
                        }
                    }
                    this.currentLoggableTrip = {
                        date: formattedDate, // MM/DD/YY for display in log message
                        code1: code1,
                        code2: code2,
                        distance: distance
                    };
                }
            } else {
                distance = '--';
            }
            this.elements.distanceSpan.textContent = distance;
        },

        logTrip() {
            if (this.currentLoggableTrip) {
                const { date, code1, code2, distance } = this.currentLoggableTrip;
                const logMessage = `${date} - ${code1}-${code2} - ${distance} miles`;

                // Check for duplicates based on message content (simplest approach)
                const existingMessages = Array.from(this.elements.logEntriesContainer.querySelectorAll('.log-entry-text'))
                                             .map(span => span.textContent);
                if (!existingMessages.includes(logMessage)) {
                    const logEntry = this._createLogEntryElement(date, code1, code2, distance, logMessage);
                    this._insertLogEntrySorted(logEntry);

                    this.currentTotalMiles += Number(distance);
                    this.updateTotalsDisplay();
                    this.currentLoggableTrip = null; // Prevent double logging
                } else {
                    console.log("Duplicate log entry prevented:", logMessage);
                }
            } else {
                console.log("Log Trip button clicked, but no valid trip data to log.");
            }
        },

        _createLogEntryElement(displayDate, code1, code2, distance, logMessage) {
            const logEntry = document.createElement('p');
            // Store YYYY-MM-DD from the input for reliable sorting and editing
            logEntry.dataset.date = this.elements.dateInput.value;
            logEntry.dataset.code1 = code1;
            logEntry.dataset.code2 = code2;
            logEntry.dataset.distance = distance;

            const textSpan = document.createElement('span');
            textSpan.textContent = logMessage; // Uses MM/DD/YY from currentLoggableTrip
            textSpan.classList.add('log-entry-text');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-log-btn');
            editButton.addEventListener('click', () => this.handleEditLogEntry(logEntry));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-log-btn');
            deleteButton.addEventListener('click', () => this.handleDeleteLogEntry(logEntry));

            logEntry.appendChild(textSpan);
            logEntry.appendChild(editButton);
            logEntry.appendChild(deleteButton);

            return logEntry;
        },

        _insertLogEntrySorted(logEntry) {
            const existingEntries = this.elements.logEntriesContainer.querySelectorAll('p');
            let inserted = false;
            for (const existingEntry of existingEntries) {
                // Compare dates using YYYY-MM-DD dataset attribute
                if (logEntry.dataset.date < existingEntry.dataset.date) {
                    this.elements.logEntriesContainer.insertBefore(logEntry, existingEntry);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                this.elements.logEntriesContainer.appendChild(logEntry);
            }
        },

        handleEditLogEntry(logEntryElement) {
            const { date: storedDateYYYYMMDD, code1, code2, distance: distanceStr } = logEntryElement.dataset;
            const distance = Number(distanceStr);

            if (isNaN(distance)) {
                console.error("Invalid distance found in log entry dataset:", distanceStr);
                return;
            }

            // 1. Subtract from totals
            this.currentTotalMiles -= distance;
            this.updateTotalsDisplay();

            // 2. Remove the entry from the display
            logEntryElement.remove();

            // 3. Repopulate the form
            if (storedDateYYYYMMDD && /^\d{4}-\d{2}-\d{2}$/.test(storedDateYYYYMMDD)) {
                 this.elements.dateInput.value = storedDateYYYYMMDD;
            } else {
                 console.warn("Invalid or missing date in dataset for editing:", storedDateYYYYMMDD);
                 this.elements.dateInput.value = this.formatDateForInput(new Date());
            }

            const site1Name = this.codeToSiteName[code1] || code1;
            const site2Name = this.codeToSiteName[code2] || code2;
            this.elements.site1Input.value = site1Name;
            this.elements.site2Input.value = site2Name;

            // 4. Trigger distance update
            this.updateDistanceDisplay();

            // Optional: Focus and scroll
            this.elements.site1Input.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        handleDeleteLogEntry(logEntryElement) {
            const { distance: distanceStr } = logEntryElement.dataset;
            const distance = Number(distanceStr);

            if (isNaN(distance)) {
                console.error("Invalid distance found for deletion:", distanceStr);
                return;
            }

            this.currentTotalMiles -= distance;
            this.updateTotalsDisplay();
            logEntryElement.remove();
        },

        clearLog() {
            this.elements.logEntriesContainer.innerHTML = '';
            this.currentTotalMiles = 0.0;
            this.updateTotalsDisplay();
        },

        swapSites() {
            const tempValue = this.elements.site1Input.value;
            this.elements.site1Input.value = this.elements.site2Input.value;
            this.elements.site2Input.value = tempValue;

            this.elements.resultsList1.innerHTML = '';
            this.elements.resultsList1.style.display = 'none';
            this.elements.resultsList2.innerHTML = '';
            this.elements.resultsList2.style.display = 'none';

            this.updateDistanceDisplay();
        },

        goToNextWeekday() {
            const currentDateValue = this.elements.dateInput.value;
            if (!currentDateValue) {
                console.warn("Date input is empty.");
                return;
            }

            // Parse YYYY-MM-DD correctly
            const dateParts = currentDateValue.split('-');
            if (dateParts.length !== 3) {
                 console.error("Invalid date format in input field:", currentDateValue);
                 return;
            }
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
            const day = parseInt(dateParts[2], 10);
            let nextDate = new Date(year, month, day);


            if (isNaN(nextDate)) {
                console.error("Invalid date parsed from input field:", currentDateValue);
                return;
            }

            do {
                nextDate.setDate(nextDate.getDate() + 1);
            } while (nextDate.getDay() === 0 || nextDate.getDay() === 6); // Skip Sunday (0) and Saturday (6)

            this.elements.dateInput.value = this.formatDateForInput(nextDate);
            this.updateDistanceDisplay(); // Update potential loggable trip
        },

        copyLogAsMarkdown() {
            const logEntries = this.elements.logEntriesContainer.querySelectorAll('p');
            if (logEntries.length === 0) {
                alert("Log is empty. Nothing to copy.");
                return;
            }

            let markdownString = "| Date     | Route       | Miles |\n";
            markdownString +=    "|----------|-------------|-------|\n";

            logEntries.forEach(entry => {
                const textSpan = entry.querySelector('.log-entry-text');
                const text = textSpan ? textSpan.textContent : '';
                const dateYYYYMMDD = entry.dataset.date; // YYYY-MM-DD
                const parts = text.split(' - '); // MM/DD/YY - Route - X miles

                if (parts.length === 3 && dateYYYYMMDD) {
                     // Reformat YYYY-MM-DD to MM/DD/YY for the table display
                     const dateParts = dateYYYYMMDD.split('-');
                     const formattedDateMMDDYY = `${dateParts[1]}/${dateParts[2]}/${dateParts[0].slice(-2)}`;
                     const route = parts[1].trim();
                     const miles = parts[2].replace(' miles', '').trim();
                     markdownString += `| ${formattedDateMMDDYY} | ${route} | ${miles} |\n`;
                } else {
                    console.warn("Could not parse log entry for markdown:", text);
                }
            });

            const totalMiles = this.elements.totalMilesSpan.textContent;
            const totalReimbursement = this.elements.totalReimbursementSpan.textContent;
            markdownString += `| **Total** |             | **${totalMiles}** |\n`;
            markdownString += `| **Est. Reimbursement ($${this.IRS_RATE_2025}/mile)** | | **$${totalReimbursement}** |\n`;

            navigator.clipboard.writeText(markdownString)
                .then(() => {
                    const originalText = this.elements.copyLogBtn.textContent;
                    this.elements.copyLogBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        this.elements.copyLogBtn.textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy log to clipboard: ', err);
                    alert('Failed to copy log. See console for details.');
                });
        },

        showInstructions(event) {
            event.preventDefault();
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
            alert(instructions);
        }
    };

    // Initialize the tracker
    MileageTracker.init();
});