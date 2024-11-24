

document.getElementById("save_btn").addEventListener("click" , ()=>{
    const userData = {
        fname:document.getElementById("fname").value,
        lname:document.getElementById("lname").value,
        edu: document.querySelector('input[name="edu"]:checked')?.value || "", // Use optional chaining and default to empty string
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        portfolio: document.getElementById("portfolio").value,
        summary: document.getElementById("summary").value,
    
    
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    // alert("Data saved succesfully");
})
    document.addEventListener("DOMContentLoaded", ()=>{

        const savedData = localStorage.getItem("userData");

        if(savedData){

            const userData = JSON.parse(savedData);
            document.getElementById("fname").value = userData.fname || "";
            
            document.getElementById("lname").value = userData.lname || "";
            document.getElementById("experience").value = userData.experience || "";
            document.getElementById("skills").value = userData.skills || "";
            document.getElementById("portfolio").value = userData.portfolio || "";
            document.getElementById("summary").value = userData.summary || "";
    
            // Set the correct radio button for "edu"
            if (userData.edu) {
                const eduRadio = document.querySelector(`input[name="edu"][value="${userData.edu}"]`);
                if (eduRadio) eduRadio.checked = true;
            }
    // alert("Data restored succesfully");
        
        }


    });

    document.getElementById("reset").addEventListener("click" ,() =>{

        localStorage.clear();
    // alert("Data cleared succesfully");

    }

    )
    document.getElementById("save_btn").addEventListener("click", () => {
        const userData = {
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            experience: document.getElementById("experience").value,
            skills: document.getElementById("skills").value,
            portfolio: document.getElementById("portfolio").value,
            summary: document.getElementById("summary").value,
        };
    
        // Retrieve existing saved forms or initialize an empty array
        const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    
        // Add the current form data to the list of saved forms
        savedForms.push(userData);
    
        // Save the updated list back to localStorage
        localStorage.setItem("savedForms", JSON.stringify(savedForms));
    
        alert("Form saved successfully!");
        updateSavedFormsDropdown(); // Refresh the dropdown with updated saved forms
    });
    
    // Function to populate the dropdown with saved forms
    function updateSavedFormsDropdown() {
        const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
        const savedFormsDropdown = document.getElementById("saved-forms");
    
        // Clear existing options
        savedFormsDropdown.innerHTML = '<option value="">Select a saved form</option>';
    
        // Populate the dropdown with saved forms
        savedForms.forEach((form, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `Form ${index + 1}: ${form.fname || "Unnamed"}`;
            savedFormsDropdown.appendChild(option);
        });
    }
    
    // Function to load a selected form into the fields
    document.getElementById("load-form").addEventListener("click", () => {
        const selectedIndex = document.getElementById("saved-forms").value;
    
        if (selectedIndex === "") {
            alert("Please select a saved form.");
            return;
        }
    
        const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
        const selectedForm = savedForms[selectedIndex];
    
        if (selectedForm) {
            document.getElementById("fname").value = selectedForm.fname || "";
            document.getElementById("lname").value = selectedForm.lname || "";
            document.getElementById("experience").value = selectedForm.experience || "";
            document.getElementById("skills").value = selectedForm.skills || "";
            document.getElementById("portfolio").value = selectedForm.portfolio || "";
            document.getElementById("summary").value = selectedForm.summary || "";
            alert("Form loaded successfully!");
        }
    });
    
    // Function to delete a selected form from the list
    document.getElementById("delete-saved-form").addEventListener("click", () => {
        const selectedIndex = document.getElementById("saved-forms").value;
    
        if (selectedIndex === "") {
            alert("Please select a saved form.");
            return;
        }
    
        const confirmation = confirm("Are you sure you want to delete this saved form?");
        if (!confirmation) return;
    
        const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
        savedForms.splice(selectedIndex, 1); // Remove the selected form
    
        localStorage.setItem("savedForms", JSON.stringify(savedForms)); // Save the updated list
        alert("Saved form deleted successfully!");
        updateSavedFormsDropdown(); // Refresh the dropdown
    });
    
    // Initialize the dropdown on page load
    document.addEventListener("DOMContentLoaded", () => {
        updateSavedFormsDropdown();
    });
    
    

// Save the current form data to a named profile
function saveProfile(profileName) {
    if (!profileName) {
        alert("Please enter a profile name.");
        return;
    }

    const profileData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        portfolio: document.getElementById("portfolio").value,
        summary: document.getElementById("summary").value,
    };

    localStorage.setItem(profileName, JSON.stringify(profileData));
    alert(`Profile "${profileName}" saved successfully!`);
}

// Load a named profile into the form
function loadProfile(profileName) {
    if (!profileName) {
        alert("Please enter a profile name.");
        return;
    }

    const profileData = localStorage.getItem(profileName);
    if (!profileData) {
        alert(`Profile "${profileName}" does not exist.`);
        return;
    }

    const data = JSON.parse(profileData);

    // Populate the form fields
    document.getElementById("fname").value = data.fname || "";
    document.getElementById("lname").value = data.lname || "";
    document.getElementById("experience").value = data.experience || "";
    document.getElementById("skills").value = data.skills || "";
    document.getElementById("portfolio").value = data.portfolio || "";
    document.getElementById("summary").value = data.summary || "";

    alert(`Profile "${profileName}" loaded successfully!`);
}

// Delete a named profile
function deleteProfile(profileName) {
    if (!profileName) {
        alert("Please enter a profile name.");
        return;
    }

    const confirmation = confirm(`Are you sure you want to delete the profile "${profileName}"?`);
    if (!confirmation) return;

    localStorage.removeItem(profileName);
    alert(`Profile "${profileName}" deleted successfully!`);

    // Clear the form after deletion
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("portfolio").value = "";
    document.getElementById("summary").value = "";
}

// Add event listeners
document.getElementById("save_btn").addEventListener("click", () => {
    const profileName = document.getElementById("profile-name").value;
    saveProfile(profileName);
});

document.getElementById("load-profile").addEventListener("click", () => {
    const profileName = document.getElementById("profile-name").value;
    loadProfile(profileName);
});

document.getElementById("delete-profile").addEventListener("click", () => {
    const profileName = document.getElementById("profile-name").value;
    deleteProfile(profileName);
});


// last changes
// Load job applications from localStorage and render the dashboard
function loadDashboard() {
    const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
    const tableBody = document.querySelector("#dashboard-table tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Populate the table
    jobApplications.forEach((job, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${job.company}</td>
            <td>${job.title}</td>
            <td>${job.date}</td>
            <td>${job.status}</td>
            <td>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Call loadDashboard on page load
document.addEventListener("DOMContentLoaded", loadDashboard);
// Add a new job application
document.getElementById("add-job-btn").addEventListener("click", () => {
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    if (!company || !title || !date || !status) {
        alert("Please fill out all fields!");
        return;
    }

    const newJob = { company, title, date, status };

    // Retrieve existing job applications or initialize
    const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
    jobApplications.push(newJob);
    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

    // Clear form fields
    document.getElementById("company").value = "";
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("status").value = "Applied";

    alert("Job application added successfully!");
    loadDashboard(); // Refresh the dashboard
});
// Handle delete button clicks
document.querySelector("#dashboard-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.dataset.index;
        const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
        jobApplications.splice(index, 1); // Remove the selected job application
        localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
        alert("Job application deleted successfully!");
        loadDashboard(); // Refresh the dashboard
    }
});
// Handle edit button clicks
document.querySelector("#dashboard-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const index = event.target.dataset.index;
        const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
        const job = jobApplications[index];

        // Populate form fields with the selected job's data
        document.getElementById("company").value = job.company;
        document.getElementById("title").value = job.title;
        document.getElementById("date").value = job.date;
        document.getElementById("status").value = job.status;

        // Remove the existing job application from the list
        jobApplications.splice(index, 1);
        localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
        loadDashboard(); // Refresh the dashboard
    }
});


document.getElementById("fetch_linkedin").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("Active tab details:", tabs[0]); // Log active tab details

        // Check if the active tab is a LinkedIn profile page
        if (!tabs[0].url.includes("linkedin.com/in/")) {
            alert("Please ensure you're on a LinkedIn profile page.");
            return;
        }

        // Send message to content script
        console.log("Sending scrape message to content script...");
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message);
                alert("Error: Unable to send message to content script.");
                return;
            }
            console.log("Response from content script:", response);
            if (response && response.data) {
                // Populate form fields with scraped data
                document.getElementById("fname").value = response.data.fullName || "";
                document.getElementById("experience").value = response.data.currentPosition || "";
                document.getElementById("skills").value = (response.data.skills || []).join(", ");
                alert("Data fetched and populated successfully!");
            } else {
                alert("Failed to scrape data. Ensure you're on a LinkedIn profile page.");
            }
        });
    });
});
