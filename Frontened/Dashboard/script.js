// =====================================
// LOGIN CHECK
// =====================================

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.href = "../Authorization/index.html";
}


// =====================================
// API
// =====================================

const API_BASE_URL =
    "https://user-dashboard-backend-s374.vercel.app/api/v1";

const API_URL = `${API_BASE_URL}/users`;


// =====================================
// DOM ELEMENTS
// =====================================

const usersContainer =
    document.getElementById("usersContainer");

const searchInput =
    document.getElementById("searchInput");

const minAgeInput =
    document.getElementById("minAge");

const maxAgeInput =
    document.getElementById("maxAge");

const sortAge =
    document.getElementById("sortAge");

const resetBtn =
    document.getElementById("resetBtn");

const loading =
    document.getElementById("loading");

const error =
    document.getElementById("error");

const noUsers =
    document.getElementById("noUsers");

const totalUsers =
    document.getElementById("totalUsers");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const pageNumbers =
    document.getElementById("pageNumbers");


// =====================================
// VARIABLES
// =====================================

let allUsers = [];

let currentPage = 1;

const usersPerPage = 5;


// =====================================
// GET USERS
// =====================================

async function getUsers() {

    try {

        loading.classList.remove("hidden");
        error.classList.add("hidden");


        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        const result =
            await response.json();


        console.log("Users:", result);


        allUsers =
            Array.isArray(result.data)
                ? result.data
                : [];


        totalUsers.textContent =
            allUsers.length;


        currentPage = 1;


        renderUsers();

    } catch (err) {

        console.error(
            "Get Users Error:",
            err
        );


        error.textContent =
            "Unable to load users. Make sure your backend is running.";


        error.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");
    }
}


// =====================================
// FILTER USERS
// =====================================

function getFilteredUsers() {

    let users = [...allUsers];


    // SEARCH

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchValue) {

        users = users.filter(user => {

            const name =
                String(user.name || "")
                    .toLowerCase();


            const email =
                String(user.email || "")
                    .toLowerCase();


            return (
                name.includes(searchValue) ||
                email.includes(searchValue)
            );
        });
    }


    // MIN AGE

    if (minAgeInput.value !== "") {

        const minAge =
            Number(minAgeInput.value);


        users = users.filter(user =>
            Number(user.age) >= minAge
        );
    }


    // MAX AGE

    if (maxAgeInput.value !== "") {

        const maxAge =
            Number(maxAgeInput.value);


        users = users.filter(user =>
            Number(user.age) <= maxAge
        );
    }


    // SORT

    if (sortAge.value === "asc") {

        users.sort(
            (a, b) =>
                Number(a.age) -
                Number(b.age)
        );
    }


    if (sortAge.value === "desc") {

        users.sort(
            (a, b) =>
                Number(b.age) -
                Number(a.age)
        );
    }


    return users;
}


// =====================================
// RENDER USERS
// =====================================

function renderUsers() {

    const filteredUsers =
        getFilteredUsers();


    usersContainer.innerHTML = "";


    // NO USERS

    if (filteredUsers.length === 0) {

        noUsers.classList.remove("hidden");

        pageNumbers.innerHTML = "";

        prevBtn.disabled = true;
        nextBtn.disabled = true;

        return;
    }


    noUsers.classList.add("hidden");


    // TOTAL PAGES

    const totalPages =
        Math.ceil(
            filteredUsers.length /
            usersPerPage
        );


    if (currentPage > totalPages) {

        currentPage = totalPages;
    }


    // CURRENT PAGE USERS

    const startIndex =
        (currentPage - 1) *
        usersPerPage;


    const endIndex =
        startIndex +
        usersPerPage;


    const currentUsers =
        filteredUsers.slice(
            startIndex,
            endIndex
        );


    // CREATE CARDS

    currentUsers.forEach(user => {

        const card =
            document.createElement("div");


        card.className =
            "user-card";


        const firstLetter =
            user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
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
                        ${user.age ?? "N/A"}
                    </span>

                </div>

            </div>

        `;


        usersContainer.appendChild(card);

    });


    renderPagination(totalPages);
}


// =====================================
// PAGINATION
// =====================================

function renderPagination(totalPages) {

    pageNumbers.innerHTML = "";


    prevBtn.disabled =
        currentPage === 1;


    nextBtn.disabled =
        currentPage === totalPages;


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement("button");


        button.className =
            "page-number";


        button.textContent =
            i;


        if (i === currentPage) {

            button.classList.add("active");
        }


        button.addEventListener(
            "click",
            () => {

                currentPage = i;

                renderUsers();

            }
        );


        pageNumbers.appendChild(button);
    }
}


// =====================================
// PREVIOUS
// =====================================

prevBtn.addEventListener(
    "click",
    () => {

        if (currentPage > 1) {

            currentPage--;

            renderUsers();
        }

    }
);


// =====================================
// NEXT
// =====================================

nextBtn.addEventListener(
    "click",
    () => {

        const filteredUsers =
            getFilteredUsers();


        const totalPages =
            Math.ceil(
                filteredUsers.length /
                usersPerPage
            );


        if (currentPage < totalPages) {

            currentPage++;

            renderUsers();
        }

    }
);


// =====================================
// SEARCH
// =====================================

searchInput.addEventListener(
    "input",
    () => {

        currentPage = 1;

        renderUsers();

    }
);


// =====================================
// MIN AGE
// =====================================

minAgeInput.addEventListener(
    "input",
    () => {

        currentPage = 1;

        renderUsers();

    }
);


// =====================================
// MAX AGE
// =====================================

maxAgeInput.addEventListener(
    "input",
    () => {

        currentPage = 1;

        renderUsers();

    }
);


// =====================================
// SORT
// =====================================

sortAge.addEventListener(
    "change",
    () => {

        currentPage = 1;

        renderUsers();

    }
);


// =====================================
// RESET
// =====================================

resetBtn.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        minAgeInput.value = "";

        maxAgeInput.value = "";

        sortAge.value = "";

        currentPage = 1;

        renderUsers();

    }
);


// =====================================
// INITIAL LOAD
// =====================================

getUsers();