
const login_api = 'http://localhost:8000/api/v1/auth/login';
const signup_api = 'http://localhost:8000/api/v1/auth/signup'


const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const message = document.getElementById("message");

// Login tab
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");

  message.textContent = "";
});

// Signup tab
signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");

  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");

  message.textContent = "";
});



loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
const password = Number(
  document.getElementById("loginPassword").value
);
  try {
    const response = await fetch(login_api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (response.ok) {
       message.textContent = "Login successful!";

    localStorage.setItem("isLoggedIn", "true");

    loginForm.reset();

    window.location.href = "../Dashboard/index.html";
      // Agar backend token bhej raha hai:
      // localStorage.setItem("token", data.token);

    } else {
      message.textContent = data.message || "Login failed.";
    }

  } catch (error) {
    console.error("Login Error:", error);
    message.textContent = "Something went wrong.";
  }
});




signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

 try {
    const response = await fetch("http://localhost:8000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();

    
    if(response.ok)
        {
              message.textContent = "Signup successful! Please login.";

            console.log("Signup response:", data);  loginTab.click();

      signupForm.reset();
            
        }else {
      message.textContent = data.message || "Signup failed.";
    }

    console.log("Signup successful:", data);

  } catch (error) {
    console.error("Signup error:", error);
  }

 
});