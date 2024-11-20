

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
    
    document.getElementById("fetch_linkedin").addEventListener("click", async () => {
        // Prompt the user to enter a LinkedIn profile URL
        const profileUrl = prompt("Enter the LinkedIn Profile URL:");
    
        // Validate the LinkedIn Profile URL
        if (!profileUrl || !profileUrl.startsWith("https://www.linkedin.com/in/")) {
            alert("Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/...).");
            return;
        }
    
        const apiKey = 'vhxSkEOOcjj7ck3RFsbTGg'; // Replace with your ProxyCurl API Key
        const apiEndpoint = 'https://nubela.co/proxycurl/api/v2/linkedin';
    
        // Set up headers
        const headers = {
            'Authorization': `Bearer ${apiKey}`,
        };
    
        // Prepare query parameters
        const params = new URLSearchParams({
            url: profileUrl,
            use_cache: 'if-present',
        });
    
        try {
            // Fetch LinkedIn data from ProxyCurl
            const response = await fetch(`${apiEndpoint}?${params}`, {
                method: 'GET',
                headers: headers,
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error Response Text:", errorText);
                throw new Error(`Error fetching LinkedIn data: ${response.statusText}`);
            }
    
            const data = await response.json(); // Parse the JSON response
            console.log("Fetched LinkedIn Data:", data); // Debugging output
    
            // Automatically populate the form fields with the fetched data
            document.getElementById("fname").value = data.full_name || "";
            document.getElementById("lname").value = data.last_name || "";
            document.getElementById("summary").value = data.headline || "";
            document.getElementById("portfolio").value = data.profile_pic_url || "";
            document.getElementById("skills").value = (data.skills || []).join(", ");
    
            // Save the fetched data to localStorage
            const userData = {
                fname: data.full_name || "",
                lname: data.last_name || "",
                edu: "", // Education info can be added if available in API response
                experience: data.occupation || "",
                skills: (data.skills || []).join(", "),
                portfolio: data.profile_pic_url || "",
                summary: data.headline || "",
            };
            localStorage.setItem("userData", JSON.stringify(userData));
    
            alert("Form populated with LinkedIn data successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to fetch LinkedIn data. Please check the profile URL or try again.");
        }
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
