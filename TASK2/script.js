const inputbox = document.getElementById('input-box');
const listcontainer = document.getElementById('list-container');

// Function to add a new task
function addTask() {
    if (inputbox.value === '') {
        alert("You must write something");
    }
    else {
        let li = document.createElement("li");
        li.textContent = inputbox.value;
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        listcontainer.insertBefore(li, listcontainer.firstChild); // Insert new task at the top
    }
    inputbox.value = "";
    savedata();
}

// Event listener for clicking on tasks or delete icon
listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
            listcontainer.appendChild(e.target); // Move checked task to the bottom
        }
        savedata();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
}, false);

// Function to save tasks to localStorage
function savedata() {
    const tasks = [];
    const lis = listcontainer.querySelectorAll("li");
    lis.forEach(li => {
        tasks.push(li.outerHTML); // Store the HTML of each task
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}

// Function to show tasks from localStorage
function showlist() {
    let data = localStorage.getItem("data");
    if (data) {
        data = JSON.parse(data); // Parse stored data as array of HTML strings
        listcontainer.innerHTML = ""; // Clear existing list content
        data.forEach(html => {
            let li = document.createElement("li");
            li.innerHTML = html;
            listcontainer.appendChild(li); // Append each task to the list
        });
    } else {
        listcontainer.innerHTML = "";
    }
}

// Clear localStorage on page load to delete all tasks
function clearLocalStorage() {
    localStorage.removeItem("data");
    listcontainer.innerHTML = "";
}

// Call clearLocalStorage() to initially clear tasks from localStorage
clearLocalStorage();
