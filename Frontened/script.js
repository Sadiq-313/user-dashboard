const API_URL = "http://localhost:8000/api/v1/users";


const usersContainer = document.getElementById("usersContainer");

const searchInput = document.getElementById("searchInput");
const minAgeInput = document.getElementById("minAge");
const maxAgeInput = document.getElementById("maxAge");
const sortAge = document.getElementById("sortAge");

const resetBtn = document.getElementById("resetBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const noUsers = document.getElementById("noUsers");

const totalUsers = document.getElementById("totalUsers");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumbers = document.getElementById("pageNumbers");


let allUsers = [];

let currentPage = 1;

const usersPerPage = 5;


// ===============================
// GET USERS FROM API
// ===============================

async function getUsers() {

    try {

        loading.classList.remove("hidden");
        error.classList.add("hidden");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const result = await response.json();

        /*
            Your backend response:

            {
                status: true,
                message: "...",
                data: [...]
            }
        */

        allUsers = result.data || [];

        totalUsers.textContent = allUsers.length;

        currentPage = 1;

        applyFilters();

    } catch (err) {

        console.error(err);

        error.textContent =
            "Unable to load users. Make sure your backend is running.";

        error.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");
    }
}


// ===============================
// FILTER + SEARCH + SORT
// ===============================

function applyFilters() {

    let filteredUsers = [...allUsers];

    const searchValue =
        searchInput.value.trim().toLowerCase();

    const minAge =
        Number(minAgeInput.value);

    const maxAge =
        Number(maxAgeInput.value);

    const sortValue =
        sortAge.value;


    // SEARCH

    if (searchValue) {

        filteredUsers = filteredUsers.filter(user => {

            const name =
                user.name?.toLowerCase() || "";

            const email =
                user.email?.toLowerCase() || "";

            return (
                name.includes(searchValue) ||
                email.includes(searchValue)
            );
        });
    }


    // MINIMUM AGE

    if (minAgeInput.value) {

        filteredUsers = filteredUsers.filter(user =>
            Number(user.age) >= minAge
        );
    }


    // MAXIMUM AGE

    if (maxAgeInput.value) {

        filteredUsers = filteredUsers.filter(user =>
            Number(user.age) <= maxAge
        );
    }


    // SORT BY AGE

    if (sortValue === "asc") {

        filteredUsers.sort(
            (a, b) => Number(a.age) - Number(b.age)
        );

    } else if (sortValue === "desc") {

        filteredUsers.sort(
            (a, b) => Number(b.age) - Number(a.age)
        );
    }


    currentPage = 1;

    renderUsers(filteredUsers);
}


// ===============================
// DISPLAY USERS
// ===============================

function renderUsers(users) {

    usersContainer.innerHTML = "";

    if (users.length === 0) {

        noUsers.classList.remove("hidden");

        pageNumbers.innerHTML = "";

        prevBtn.disabled = true;
        nextBtn.disabled = true;

        return;
    }

    noUsers.classList.add("hidden");


    // PAGINATION

    const totalPages =
        Math.ceil(users.length / usersPerPage);

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }


    const startIndex =
        (currentPage - 1) * usersPerPage;

    const endIndex =
        startIndex + usersPerPage;

    const currentUsers =
        users.slice(startIndex, endIndex);


    // CREATE CARDS

    currentUsers.forEach(user => {

        const card = document.createElement("div");

        card.className = "user-card";

        const firstLetter =
            user.name
                ? user.name.charAt(0).toUpperCase()
                : "U";


        card.innerHTML = `

            <div class="user-top">

                <div class="avatar">
                    ${firstLetter}
                </div>

                <div class="user-info">

                    <h3>
                        ${user.name || "Unknown User"}
                    </h3>

                    <p>
                        ${user.email || "No email"}
                    </p>

                </div>

            </div>


            <div class="user-details">

                <div class="detail">

                    <span>User ID</span>

                    <span>
                        ${user._id || "N/A"}
                    </span>

                </div>


                <div class="detail">

                    <span>Age</span>

                    <span class="age">
                        ${user.age || "N/A"}
                    </span>

                </div>

            </div>

        `;

        usersContainer.appendChild(card);
    });


    renderPagination(totalPages);
}


// ===============================
// PAGINATION
// ===============================

function renderPagination(totalPages) {

    pageNumbers.innerHTML = "";

    prevBtn.disabled =
        currentPage === 1;

    nextBtn.disabled =
        currentPage === totalPages;


    for (let i = 1; i <= totalPages; i++) {

        const button =
            document.createElement("button");

        button.className = "page-number";

        button.textContent = i;


        if (i === currentPage) {
            button.classList.add("active");
        }


        button.addEventListener("click", () => {

            currentPage = i;

            renderUsers(getFilteredUsers());

        });


        pageNumbers.appendChild(button);
    }
}


// ===============================
// GET FILTERED USERS
// ===============================

function getFilteredUsers() {

    let users = [...allUsers];

    const searchValue =
        searchInput.value.trim().toLowerCase();

    const minAge =
        Number(minAgeInput.value);

    const maxAge =
        Number(maxAgeInput.value);

    const sortValue =
        sortAge.value;


    if (searchValue) {

        users = users.filter(user => {

            const name =
                user.name?.toLowerCase() || "";

            const email =
                user.email?.toLowerCase() || "";

            return (
                name.includes(searchValue) ||
                email.includes(searchValue)
            );
        });
    }


    if (minAgeInput.value) {

        users = users.filter(user =>
            Number(user.age) >= minAge
        );
    }


    if (maxAgeInput.value) {

        users = users.filter(user =>
            Number(user.age) <= maxAge
        );
    }


    if (sortValue === "asc") {

        users.sort(
            (a, b) => Number(a.age) - Number(b.age)
        );

    } else if (sortValue === "desc") {

        users.sort(
            (a, b) => Number(b.age) - Number(a.age)
        );
    }


    return users;
}


// ===============================
// PREVIOUS
// ===============================

prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderUsers(getFilteredUsers());
    }

});


// ===============================
// NEXT
// ===============================

nextBtn.addEventListener("click", () => {

    const users =
        getFilteredUsers();

    const totalPages =
        Math.ceil(users.length / usersPerPage);


    if (currentPage < totalPages) {

        currentPage++;

        renderUsers(users);
    }

});


// ===============================
// SEARCH
// ===============================

searchInput.addEventListener(
    "input",
    applyFilters
);


// ===============================
// AGE FILTER
// ===============================

minAgeInput.addEventListener(
    "input",
    applyFilters
);

maxAgeInput.addEventListener(
    "input",
    applyFilters
);


// ===============================
// SORT
// ===============================

sortAge.addEventListener(
    "change",
    applyFilters
);


// ===============================
// RESET
// ===============================

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    minAgeInput.value = "";

    maxAgeInput.value = "";

    sortAge.value = "";

    currentPage = 1;

    applyFilters();
});


// ===============================
// INITIAL LOAD
// ===============================

getUsers();